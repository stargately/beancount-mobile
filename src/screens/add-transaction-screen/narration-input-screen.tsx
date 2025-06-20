import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable, Text } from "react-native";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";
import { SelectedNarration } from "@/common/globalFnFactory";
import { router, Stack, useLocalSearchParams } from "expo-router";
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
      paddingVertical: 8,
    },
    doneButton: {
      fontWeight: "bold",
      color: theme.primary,
      fontSize: 16,
    },
  });

export function NarrationInputScreen(): JSX.Element {
  useEffect(() => {
    async function init() {
      await analytics.track("page_view_narration_input", {});
    }
    init();
  }, []);

  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const { narration } = useLocalSearchParams<{
    narration: string;
  }>();
  const [newNarration, setNarration] = useState<string>(narration || "");
  const onSaved = SelectedNarration.getFn();

  const onRightClick = async () => {
    onSaved?.(newNarration);
    analytics.track("tap_narration_input_save", {
      narration: newNarration,
    });
    router.back();
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: i18n.t("narration"),
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
          value={newNarration}
          placeholder={i18n.t("pleaseInput")}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          autoFocus
          onChangeText={(txt) => {
            setNarration(txt);
          }}
          multiline
        />
      </View>
    </SafeAreaView>
  );
}
