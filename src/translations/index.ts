import * as Locatization from "expo-localization";
import * as React from "react";
import i18n from "i18n-js";
import { en } from "@/translations/en";
import { zh } from "@/translations/zh";

if (i18n) {
  i18n.fallbacks = true;
  i18n.translations = { zh, en };
  i18n.locale = Locatization.locale;
}

const defaultValue: any = {};
const LocalizationContext = React.createContext(defaultValue);
export { i18n, LocalizationContext };
