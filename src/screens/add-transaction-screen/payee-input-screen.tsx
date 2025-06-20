import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable, Text } from "react-native";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SelectedPayee } from "@/common/globalFnFactory";
import { SafeAreaView } from "react-native-safe-area-context";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      flex: 1,
    },
    inputContainer: {
      marginHorizontal: 16,
      marginTop: 16,
      borderBottomColor: theme.black40,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input: {
      color: theme.text01,
      fontSize: 18,
    },
    doneButton: {
      fontWeight: "bold",
      color: theme.primary,
      fontSize: 16,
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
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: i18n.t("payee"),
          headerRight: () => (
            <Pressable onPress={onRightClick} hitSlop={10}>
              <Text style={styles.doneButton}>{i18n.t("save")}</Text>
            </Pressable>
          ),
        }}
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
