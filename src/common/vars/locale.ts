import { createPersistentVar } from "@/common/apollo/persistent-var";

export const [locale, loadLocale] = createPersistentVar<string>("locale", "en");
