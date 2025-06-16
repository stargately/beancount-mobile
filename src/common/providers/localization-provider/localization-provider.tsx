import { i18n, LocalizationContext } from "@/translations";
import { Scope, TranslateOptions } from "i18n-js";
import React from "react";

export const LocalizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = React.useState(i18n.locale);
  const localizationContext = React.useMemo(
    () => ({
      t: (scope: Scope, options: TranslateOptions) =>
        i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale],
  );
  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  );
};
