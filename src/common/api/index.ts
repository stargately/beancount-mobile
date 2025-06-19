import { headers, getEndpoint } from "@/common/request";

const commonHeaders = {
  "Content-Type": "application/json",
  ...headers,
};

type ApiErrorResponse = {
  error: {
    code: string;
    message: string;
  };
  ok: false;
};

type ApiSuccessResponse<T> = {
  ok: true;
} & T;

type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>;

const signIn = async (
  email: string,
  password: string,
): Promise<ApiResponse<{ authToken: string }>> => {
  const url = getEndpoint("api/sign-in/");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: commonHeaders,
  });
  return response.json();
};

const signUp = async (
  email: string,
  password: string,
): Promise<ApiResponse<{ authToken: string }>> => {
  const url = getEndpoint("api/sign-up/");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: commonHeaders,
  });
  return response.json();
};

const resetPassword = async (
  email: string,
): Promise<ApiResponse<undefined>> => {
  const url = getEndpoint("api/reset-password/");
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: commonHeaders,
  });
  return response.json();
};

export const api = {
  signIn,
  signUp,
  resetPassword,
};
