import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { contentPadding } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SelectedPayee } from "@/common/globalFnFactory";
import { SafeAreaView } from "react-native-safe-area-context";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      flex: 1,
    },
    inputContainer: {
      marginHorizontal: contentPadding,
      marginTop: contentPadding * 2,
      borderBottomColor: theme.black40,
      borderBottomWidth: 1,
    },
    input: {
      color: theme.text01,
      fontSize: 18,
      marginBottom: contentPadding * 0.5,
    },
  });

export function PayeeInputScreen(): JSX.Element {
  useEffect(() => {
    async function init() {
      await analytics.track("page_view_payee_input", {});
    }
    init();
  }, []);
  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const router = useRouter();
  const { payee } = useLocalSearchParams<{
    payee: string;
  }>();
  const [newPayee, setPayee] = useState<string>(payee || "");
  const onSaved = SelectedPayee.getFn();

  const onRightClick = async () => {
    onSaved?.(newPayee);
    await analytics.track("tap_payee_input_save", { payee: newPayee });
    router.back();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <NavigationBar
        title={i18n.t("payee")}
        showBack
        rightText={i18n.t("save")}
        onRightClick={onRightClick}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newPayee}
          autoFocus
          placeholder={i18n.t("pleaseInput")}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          onChangeText={(txt) => {
            setPayee(txt);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
