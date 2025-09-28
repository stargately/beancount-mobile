import { createSession } from "../session-utils";

const createTokenWithPayload = (payload: Record<string, unknown>) => {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.signature`;
};

describe("createSession", () => {
  it("extracts the user id from the JWT subject", () => {
    const token = createTokenWithPayload({ sub: "user-123" });
    expect(createSession(token)).toEqual({ userId: "user-123", authToken: token });
  });

  it("works with tokens that include additional claims", () => {
    const token = createTokenWithPayload({ sub: "user-456", role: "admin" });
    expect(createSession(token)).toEqual({ userId: "user-456", authToken: token });
  });
});
