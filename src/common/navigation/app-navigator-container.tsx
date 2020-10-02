import { Scope, TranslateOptions } from "i18n-js";
import React, { useState } from "react";
import { connect } from "react-redux";
import { i18n } from "@/translations";
import { AppState } from "@/common/store";
import { AppNavigator } from "@/common/navigation/app-navigator";

type Props = {
  locale: string;
  currentTheme?: "dark" | "light";
};

export const AppNavigatorContainer = connect((state: AppState) => {
  return { locale: state.base.locale, currentTheme: state.base.currentTheme };
})(function AppNavigatorContainerInner(props: Props): JSX.Element {
  const [locale, setLocale] = useState(props.locale);
  const t = (scope: Scope, options: TranslateOptions) => {
    return i18n.t(scope, { locale, ...options });
  };
  const { currentTheme } = props;
  return (
    <AppNavigator
      screenProps={{
        t,
        locale: props.locale,
        currentTheme,
        setLocale,
      }}
    />
  );
});
