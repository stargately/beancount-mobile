// @flow
import * as React from "react";
import { connect } from "react-redux";
import { ThemeProps } from "@/types/theme-props";

type Props = {
  forwardedRef: React.Ref<Props>;
  theme: ThemeProps;
};

// tslint:disable-next-line:no-any
export const withTheme = (InnerComponent: any): any => {
  return connect((state: { base: { currentTheme: ThemeProps } }) => ({
    theme: state.base.currentTheme,
  }))(function HOC(innerProps: Props): JSX.Element {
    const displayName = `WithTheme(${
      InnerComponent.displayName || InnerComponent.name || "Component"
    })`;
    const { forwardedRef, theme, ...props } = innerProps;
    return (
      <InnerComponent
        displayName={displayName}
        theme={theme}
        ref={forwardedRef}
        {...props}
      />
    );
  });
};
