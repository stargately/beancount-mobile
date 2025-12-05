import { i18n } from "@/translations";

/**
 * Appends the current application language as a query parameter to a URL
 * @param url - The URL to append the lang parameter to
 * @returns New URL with lang parameter appended based on current i18n locale
 */
export function appendLangParam(url: string): string {
  try {
    const currentLocale = i18n.locale;

    if (!currentLocale) {
      return url;
    }

    const targetUrl = new URL(url);
    targetUrl.searchParams.set("lang", currentLocale);
    return targetUrl.toString();
  } catch {
    // If URL parsing fails, return original URL
    return url;
  }
}
