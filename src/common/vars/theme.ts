import { createPersistentVar } from "@/common/apollo/persistent-var";

export type Theme = "light" | "dark";

export const [themeVar, loadTheme] = createPersistentVar<Theme>(
  "theme",
  "light",
);
