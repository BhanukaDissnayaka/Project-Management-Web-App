// src/lib/toastHandler.ts
import toast from "react-hot-toast";

export const showSuccessToast = (msg: string) =>
  toast.success(msg || "successfull");

export const showErrorToast = (msg: string) =>
  toast.error(msg || "Something went wrong");
