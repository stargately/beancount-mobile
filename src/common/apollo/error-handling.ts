import { onError } from "@apollo/client/link/error";
import { store } from "@/common/store";

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
    console.log(`[Network error]: ${networkError}`);
  }
});
