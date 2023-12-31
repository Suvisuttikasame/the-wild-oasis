import supabase, { supabaseUrl } from "./superBaseClient";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("could not get cabins data");
  }

  return data;
}

export async function CreateEditCabin(newCabin, id) {
  //check when editing is same image
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //create image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = supabase.from("cabins");

  //create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("new cabin could not be created");
  }
  //uplod image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("could not upload image and cabin was not created");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabin could not be deleted");
  }

  return data;
}
