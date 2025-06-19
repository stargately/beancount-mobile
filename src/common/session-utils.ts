import jwtDecode from "jwt-decode";

export const createSession = (token: string) => {
  const { sub } = jwtDecode(token) as { sub: string };
  return {
    userId: sub,
    authToken: token,
  };
};
