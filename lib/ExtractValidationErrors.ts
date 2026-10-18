import { ApiResponse } from "./types";

export interface ExtractedErrors {
  messageError?: string;
  errorList?: string[];
}

export function ExtractValidationErrors(error: unknown): ExtractedErrors {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  ) {
    const { data } = error as { status: unknown; data: unknown };

    if (data && typeof data === "object") {
      const api = data as ApiResponse<unknown>;
      return {
        messageError: api.message ?? "Something went wrong.",
        errorList: api.errors ?? [],
      };
    }
  }

  const fallback = typeof error === "string" ? error : "Network error";
  return { messageError: fallback };
}
