import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { ScreenWidth, contentPadding } from "@/common/screen-util";
import { useTheme } from "@/common/theme";
import { i18n } from "@/translations";
import { analytics } from "@/common/analytics";
import { ColorTheme } from "@/types/theme-props";

type Props = {
  navigation: any;
  route: any;
};

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      flex: 1,
    },
    inputContainer: {
      marginHorizontal: contentPadding,
      marginTop: contentPadding * 2,
    },
    input: {
      color: theme.text01,
      width: ScreenWidth - contentPadding * 2,
      fontSize: 18,
    },
  });

export function NarrationInputScreen(props: Props): JSX.Element {
  useEffect(() => {
    async function init() {
      await analytics.track("page_view_narration_input", {});
    }
    init();
  }, []);

  const theme = useTheme().colorTheme;
  const styles = getStyles(theme);
  const { narration, onSaved } = props.route.params;
  const [newNarration, setNarration] = useState<string>(narration || "");

  const onRightClick = async () => {
    if (onSaved) {
      onSaved(newNarration);
    }
    await analytics.track("tap_narration_input_save", {
      narration: newNarration,
    });
    props.navigation.pop();
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={i18n.t("narration")}
        showBack
        rightText={i18n.t("save")}
        onRightClick={onRightClick}
        navigation={props.navigation}
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
    </View>
  );
}
