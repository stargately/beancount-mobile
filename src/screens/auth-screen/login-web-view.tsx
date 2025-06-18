import jwtDecode from "jwt-decode";
import * as React from "react";
import { Dimensions, View } from "react-native";
import { WebView } from "react-native-webview";
import { useState } from "react";
import { analytics } from "@/common/analytics";
import { getEndpoint, headers } from "@/common/request";
import { ProgressBar } from "@/common/progress-bar";
import { statusBarHeight } from "@/common/screen-util";
import { router } from "expo-router";
import { sessionVar } from "@/common/vars";

const { height } = Dimensions.get("window");

type Props = {
  isSignUp: boolean;
  onClose: () => void;
};

export const LoginWebView = ({ isSignUp, onClose }: Props) => {
  const [progress, setProgress] = useState(0);

  const injectedJavascript = `(function() {
            window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data);
        };
      })()`;

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <ProgressBar progress={progress} />
      <WebView
        injectedJavaScript={injectedJavascript}
        source={{
          uri: isSignUp ? getEndpoint("sign-up") : getEndpoint("login"),
          headers,
        }}
        style={{
          alignSelf: "stretch",
          marginTop: 0,
          height: height - statusBarHeight,
        }}
        onLoadProgress={({ nativeEvent }) => {
          // console.log("nativeEvent", nativeEvent.progress);
          setProgress(nativeEvent.progress);
        }}
        onMessage={async (event) => {
          try {
            const msg = decodeURIComponent(
              decodeURIComponent(event.nativeEvent.data),
            );
            const msgObj = JSON.parse(msg);
            if (msgObj.authToken) {
              const { sub } = jwtDecode(msgObj.authToken) as { sub: string };
              analytics.identify(sub);
              analytics.track(isSignUp ? "signed_up" : "logged_in", {});
              sessionVar({
                userId: sub,
                authToken: msgObj.authToken,
              });
              onClose();
              router.push("/(app)/(tabs)");
            }
          } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(`failed to decode jwt: ${e}`);
          }
        }}
      />
    </View>
  );
};
