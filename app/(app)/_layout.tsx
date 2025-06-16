import { Redirect, Stack, router } from "expo-router";
import { useSession } from "@/common/hooks/use-session";
import { useCallback } from "react";

import { HeaderBackButton } from "@react-navigation/elements";

export const DefaultHeaderLeftBack = () => {
  const handlePress = useCallback(() => {
    router.back();
  }, []);
  return <HeaderBackButton onPress={handlePress} tintColor="#000" />;
};

export default function AppLayout() {
  const session = useSession();

  if (!session) {
    return <Redirect href="/auth/auth" />;
  }

  return (
    <Stack
      initialRouteName="(tabs)"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
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
