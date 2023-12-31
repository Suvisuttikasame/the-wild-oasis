import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

// We use react-hook-form to make working with complex and REAL-WORLD forms a lot easier. It handles stuff like user validation and errors. manages the form state for us, etc
// Validating the user’s data passed through the form is a crucial responsibility for a developer.
// React Hook Form takes a slightly different approach than other form libraries in the React ecosystem by adopting the use of uncontrolled inputs using ref instead of depending on the state to control the inputs. This approach makes the forms more performant and reduces the number of re-renders.

// Receives closeModal directly from Modal
function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const editSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: editSession ? editValues : {},
  });
  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (editSession) editCabin({ newCabin: { ...data, image }, id: editId });
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => reset(),
        }
      );
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues("regularPrice") ||
              "Discount should be less than or equal regular price",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="text"
          id="description"
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin Picture">
        <FileInput
          accept="image/*"
          id="image"
          {...register("image", {
            required: editSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {editSession ? "Edit Cabin" : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    maxCapacity: PropTypes.number,
    regularPrice: PropTypes.number,
    discount: PropTypes.number,
    image: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default CreateCabinForm;
