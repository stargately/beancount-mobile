import React, { useEffect, useState } from "react";

import { loadLocale } from "@/common/vars/locale";
import { loadTheme } from "@/common/vars/theme";
import { loadSession } from "@/common/vars/session";

const loadVariables = () =>
  Promise.all([loadLocale(), loadTheme(), loadSession()]);

export const VariablesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadVariables().finally(() => {
      setLoading(false);
    });
  }, []);
  return <>{loading ? null : children}</>;
};
