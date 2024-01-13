import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: signup,
    onSuccess: () =>
      toast.success(
        "Account successfully created. Please verify the new account from user's email address."
      ),
  });
  return { mutate, isLoading };
}
