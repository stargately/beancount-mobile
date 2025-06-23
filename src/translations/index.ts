import * as Locatization from "expo-localization";
import { I18n } from "i18n-js";
import { en } from "@/translations/en";
import { zh } from "@/translations/zh";
import { es } from "@/translations/es";
import { fr } from "@/translations/fr";

const SUPPORTED_LOCALES = ["en", "zh", "es", "fr"];

const getLocale = () => {
  const locales = Locatization.getLocales();
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    if (
      locale.languageCode &&
      SUPPORTED_LOCALES.includes(locale.languageCode)
    ) {
      return locale.languageCode;
    }
  }
  return "en";
};

export const i18n = new I18n({
  en,
  zh,
  es,
  fr,
});
i18n.enableFallback = true;

export const setLocale = (locale: string) => {
  i18n.locale = locale;
};

i18n.locale = getLocale();
