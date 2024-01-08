import { useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking(id) {
  const { mutate, isLoading, error } = useMutation({
    mutationKey: ["bookings"],
    mutationFn: () => deleteBooking(id),
  });
  return { mutate, isLoading, error };
}
