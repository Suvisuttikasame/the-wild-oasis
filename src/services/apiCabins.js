import supabase from "./superBaseClient";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("could not get cabins data");
  }

  return data;
}
