import * as Locatization from "expo-localization";
import { applyMiddleware, createStore, DeepPartial } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { persistedReducer } from "@/common/root-reducer";
import { colorMode } from "@/common/theme";

export interface AppState {
  base: {
    userId?: string;
    authToken?: string;
    mixpanelId?: string;
    locale?: string;
    currentTheme?: "dark" | "light";
  };
}

type Mode = "dark" | "light";

const preloadedState: DeepPartial<AppState> = {
  base: {
    locale: Locatization.locale,
    currentTheme: colorMode as Mode,
  },
};

const middleware = [thunk];

export const store = createStore(
  persistedReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);
