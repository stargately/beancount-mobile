import jwtDecode from "jwt-decode";

export const createSession = (token: string) => {
  const decoded = jwtDecode(token) as { sub?: string };
  if (!decoded.sub) {
    throw new Error("JWT token missing required 'sub' claim");
  }
  return {
    userId: decoded.sub,
    authToken: token,
  };
};
