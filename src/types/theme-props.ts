/* eslint-disable camelcase */
export interface ThemeProps {
  name: string;
  antdTheme: AntdTheme;
  theme: ColorTheme;
}

export interface AntdTheme {
  brand_primary: string;
  color_link: string;
  primary_button_fill: string;
  primary_button_fill_tap: string;
}

export interface ColorTheme {
  black: string;
  black10: string;
  black20: string;
  black40: string;
  black60: string;
  black80: string;
  black90: string;
  error: string;
  information: string;
  nav01: string;
  nav02: string;
  primary: string;
  secondary: string;
  success: string;
  tabIconDefault: string;
  tabIconSelected: string;
  text01: string;
  warning: string;
  white: string;
  activeTintColor: string;
  inactiveTintColor: string;
  activeBackgroundColor: string;
  inactiveBackgroundColor: string;
  navBg: string;
  navText: string;
}
