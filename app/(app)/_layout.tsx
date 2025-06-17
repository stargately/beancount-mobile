import { Redirect, Stack, router } from "expo-router";
import { useSession } from "@/common/hooks/use-session";
import { useCallback } from "react";

import { HeaderBackButton } from "@react-navigation/elements";
import { useTheme } from "@/common/theme";

export const DefaultHeaderLeftBack = () => {
  const theme = useTheme().colorTheme;
  const handlePress = useCallback(() => {
    router.back();
  }, []);
  return <HeaderBackButton onPress={handlePress} tintColor={theme.black} />;
};

export default function AppLayout() {
  const session = useSession();
  const theme = useTheme().colorTheme;
  if (!session) {
    return <Redirect href="/auth" />;
  }

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          color: theme.black,
        },
        headerStyle: {
          backgroundColor: theme.white,
        },
        headerLeft: DefaultHeaderLeftBack,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
