import React, { useEffect, useState } from "react";

import { loadLocale } from "@/common/vars/locale";
import { loadTheme } from "@/common/vars/theme";
import { loadSession } from "@/common/vars/session";
import { i18n } from "@/translations";

const loadVariables = () =>
  Promise.all([loadLocale(), loadTheme(), loadSession()]);

export const VariablesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  async function initVariables() {
    try {
      const [locale] = await loadVariables();
      if (locale) {
        i18n.locale = locale;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    initVariables();
  }, []);
  return <>{loading ? null : children}</>;
};
