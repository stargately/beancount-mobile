import { config } from "../../config";

type ApiModule = typeof import("../api");

describe("api client", () => {
  let api: ApiModule["api"];
  let restoreResolveFilename: (() => void) | undefined;
  let originalFetch: typeof fetch | undefined;

  const Module = require("module");

  beforeAll(() => {
    const originalResolveFilename = Module._resolveFilename;
    const configPath = require.resolve("../../config");
    const requestPath = require.resolve("../request");

    Module._resolveFilename = function resolve(
      request: string,
      parent: any,
      isMain: boolean,
      options: any,
    ) {
      if (request === "@/config") {
        return configPath;
      }
      if (request === "@/common/request") {
        return requestPath;
      }
      return originalResolveFilename.call(
        this,
        request,
        parent,
        isMain,
        options,
      );
    };

    restoreResolveFilename = () => {
      Module._resolveFilename = originalResolveFilename;
    };

    const constantsPath = require.resolve("expo-constants");
    require.cache[constantsPath] = {
      exports: { nativeAppVersion: "42.0.0" },
    } as any;

    const modulePath = require.resolve("../api");
    delete require.cache[modulePath];
    ({ api } = require("../api"));
  });

  afterAll(() => {
    const constantsPath = require.resolve("expo-constants");
    delete require.cache[constantsPath];

    const modulePath = require.resolve("../api");
    delete require.cache[modulePath];

    restoreResolveFilename?.();
  });

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch!;
  });

  it("posts credentials to the sign-in endpoint", async () => {
    const responsePayload = { ok: true, authToken: "token" };
    const calls: Array<{ url: string; options: RequestInit | undefined }> = [];

    global.fetch = (async (url: RequestInfo, options?: RequestInit) => {
      calls.push({ url: url as string, options });
      return {
        json: async () => responsePayload,
      } as any;
    }) as typeof fetch;

    const result = await api.signIn("user@example.com", "secret");

    expect(result).toEqual(responsePayload);
    expect(calls.length).toBe(1);
    const [{ url, options }] = calls;
    expect(url).toBe(`${config.serverUrl}api/sign-in/`);
    expect(options?.method).toBe("POST");
    const headers = options?.headers as Record<string, string> | undefined;
    expect(headers?.["Content-Type"]).toBe("application/json");
    expect(headers?.["x-app-id"]).toBe(config.project);
    expect(headers?.["x-app-version"]).toBe("42.0.0");
    expect(options?.body).toBe(
      JSON.stringify({ email: "user@example.com", password: "secret" }),
    );
  });

  it("sends sign-up requests with the supplied credentials", async () => {
    const responsePayload = { ok: true, authToken: "signup" };
    let capturedUrl = "";
    let capturedBody: string | undefined;

    global.fetch = (async (url: RequestInfo, options?: RequestInit) => {
      capturedUrl = url as string;
      capturedBody = options?.body as string | undefined;
      return {
        json: async () => responsePayload,
      } as any;
    }) as typeof fetch;

    const result = await api.signUp("new@example.com", "hunter2");

    expect(result).toEqual(responsePayload);
    expect(capturedUrl).toBe(`${config.serverUrl}api/sign-up/`);
    expect(capturedBody).toBe(
      JSON.stringify({ email: "new@example.com", password: "hunter2" }),
    );
  });

  it("requests password resets with the provided email", async () => {
    const responsePayload = { ok: true };
    const recordedBodies: string[] = [];

    global.fetch = (async (_url: RequestInfo, options?: RequestInit) => {
      recordedBodies.push(options?.body as string);
      return {
        json: async () => responsePayload,
      } as any;
    }) as typeof fetch;

    const result = await api.forgotPassword("reset@example.com");

    expect(result).toEqual(responsePayload);
    expect(recordedBodies).toEqual([
      JSON.stringify({ email: "reset@example.com" }),
    ]);
  });
});
