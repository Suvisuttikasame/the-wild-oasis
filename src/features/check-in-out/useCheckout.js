import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout(id, obj) {
  const { mutate, isLoading, error } = useMutation({
    mutationKey: [""],
    mutationFn: () => updateBooking(id, obj),
  });
  return { mutate, isLoading, error };
}
