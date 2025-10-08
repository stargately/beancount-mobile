import { config } from "../../config";

type HeadersType = typeof import("../request").headers;
type GetEndpointType = typeof import("../request").getEndpoint;

describe("request utilities", () => {
  let headers: HeadersType;
  let getEndpoint: GetEndpointType;
  let restoreResolveFilename: (() => void) | undefined;

  beforeAll(() => {
    const Module = require("module");
    const originalResolveFilename = Module._resolveFilename;
    const configPath = require.resolve("../../config");
    Module._resolveFilename = function patch(
      request: string,
      parent: any,
      isMain: boolean,
      options: any,
    ) {
      if (request === "@/config") {
        return configPath;
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
      exports: { nativeAppVersion: "9.9.9" },
    } as any;

    const modulePath = require.resolve("../request");
    delete require.cache[modulePath];
    ({ headers, getEndpoint } = require("../request"));
  });

  afterAll(() => {
    const constantsPath = require.resolve("expo-constants");
    delete require.cache[constantsPath];

    const modulePath = require.resolve("../request");
    delete require.cache[modulePath];

    restoreResolveFilename?.();
  });

  it("includes the app id and version headers", () => {
    expect(headers["x-app-id"]).toBe(config.project);
    expect(headers["x-app-version"]).toBe("9.9.9");
  });

  it("combines the server URL with the provided path", () => {
    expect(getEndpoint("api/data")).toBe(`${config.serverUrl}api/data`);
    expect(getEndpoint("/users")).toBe(`${config.serverUrl}/users`);
  });
});
