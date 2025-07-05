import React from "react";
import { ScrollView, View, Text } from "react-native";
import { ListDivider } from "@/components";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { AccountHeader } from "./account-header";
import { InviteSection } from "@/screens/referral-screen/components/invite-section";

import { MainContent } from "./main-content";

export const About = () => {
  const theme = useTheme().colorTheme;

  return (
    <ScrollView style={{ backgroundColor: theme.white }}>
      <AccountHeader />
      <InviteSection />
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: theme.black90, lineHeight: 40 }}>
          {i18n.t("about")}
        </Text>
        <ListDivider />
        <MainContent />
      </View>
    </ScrollView>
  );
};
