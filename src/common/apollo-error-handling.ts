import { onError } from "@apollo/client/link/error";
import { store } from "@/common/store";
import { Toast } from "@ant-design/react-native";
import { i18n } from "@/translations";

export const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions && err.extensions.code === "UNAUTHENTICATED") {
        store.dispatch({
          type: "UPDATE_REDUX_STATE",
          payload: {
            base: {
              userId: "",
              authToken: "",
            },
          },
        });
      }
    }
  }
  if (networkError) {
    if (networkError.message.indexOf("Network request failed") >= 0) {
      Toast.info(i18n.t("netError"));
    } else if (networkError.message.indexOf("Timeout") >= 0) {
      Toast.info(i18n.t("netTimeout"));
    } else {
      Toast.info(i18n.t("serverError"));
    }
  }
});
