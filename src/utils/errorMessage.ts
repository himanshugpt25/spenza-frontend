import { AxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong"
) => {
  if (error instanceof AxiosError) {
    const responseMessage =
      error.response?.data?.message ?? error.response?.data?.error;
    if (typeof responseMessage === "string") {
      return responseMessage;
    }
    return fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
