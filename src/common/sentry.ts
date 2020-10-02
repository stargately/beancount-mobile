import Constants from "expo-constants";
import * as Sentry from "sentry-expo";
import { config } from "@/config";

if (config.sentryDsn) {
  Sentry.init({
    dsn: config.sentryDsn,
    enableInExpoDevelopment: true,
    debug: __DEV__,
  });
  Sentry.setRelease(
    Constants.manifest.revisionId ? Constants.manifest.revisionId : ""
  );
}
