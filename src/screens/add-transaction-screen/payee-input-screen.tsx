import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { contentPadding } from "@/common/screen-util";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";
import { NavigationScreenProp } from "react-navigation";
import { analytics } from "@/common/analytics";

type Props = {
  navigation: NavigationScreenProp<string>;
};

const styles = () =>
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

export function PayeeInputScreen(props: Props): JSX.Element {
  useEffect(() => {
    async function init() {
      await analytics.track("page_view_payee_input", {});
    }
    init();
  }, []);

  const [payee, setPayee] = useState<string>(
    props.navigation.getParam("payee") || ""
  );

  const onRightClick = async () => {
    const onSaved = props.navigation.getParam("onSaved");
    if (onSaved) {
      onSaved(payee);
    }
    await analytics.track("tap_payee_input_save", { payee });
    props.navigation.pop();
  };

  return (
    <View style={styles().container}>
      <NavigationBar
        title={i18n.t("payee")}
        showBack
        navigation={props.navigation}
        rightText={i18n.t("save")}
        onRightClick={onRightClick}
      />

      <View style={styles().inputContainer}>
        <TextInput
          style={styles().input}
          value={payee}
          autoFocus
          placeholder={i18n.t("pleaseInput")}
          underlineColorAndroid="transparent"
          clearButtonMode="while-editing"
          onChangeText={(txt) => {
            setPayee(txt);
          }}
        />
      </View>
    </View>
  );
}
