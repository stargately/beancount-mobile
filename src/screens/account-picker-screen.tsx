import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { Button, List } from "@ant-design/react-native";
import { NavigationBar } from "@/common/navigation-bar";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";
import { ScreenWidth } from "@/common/screen-util";
import { analytics } from "@/common/analytics";

const buttonWidth = (ScreenWidth - 20 * 3) / 2;

type Props = {
  navigation: NavigationScreenProp<string>;
};

const styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    buttonContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 80,
      height: 44,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    button: {
      height: 44,
      width: buttonWidth,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      borderColor: theme.black60,
      borderWidth: 1,
      backgroundColor: theme.white,
    },
    btnTitle: {
      fontSize: 20,
      color: theme.text01,
    },
  });

export function AccountPickerScreen(props: Props): JSX.Element {
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    async function init() {
      await analytics.track("page_view_account_picker", {});
    }
    init();
    const sItem = props.navigation.getParam("selectedItem") as string;
    setSelectedItem(sItem);
  }, []);

  const { navigation } = props;
  const options: Array<string> = navigation.getParam("options");
  const onSelected: (item: string) => void = navigation.getParam("onSelected");

  return (
    <View style={styles().container}>
      <NavigationBar
        title={i18n.t("accountPicker")}
        showBack
        navigation={navigation}
      />
      <View style={styles().container}>
        <ScrollView style={{ marginBottom: 144 }}>
          <List>
            {options.map((op, index) => {
              return (
                <List.Item
                  key={index}
                  arrow="horizontal"
                  style={{
                    backgroundColor:
                      op === selectedItem ? theme.primary : theme.white,
                  }}
                  onPress={() => {
                    setSelectedItem(op);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: op === selectedItem ? theme.white : theme.black,
                    }}
                  >
                    {op}
                  </Text>
                </List.Item>
              );
            })}
          </List>
        </ScrollView>

        <View style={styles().buttonContainer}>
          <Button
            style={styles().button}
            onPress={async () => {
              await analytics.track("tap_account_picker_cancel", {});
              navigation.pop();
            }}
          >
            <Text style={styles().btnTitle}>{i18n.t("cancel")}</Text>
          </Button>
          <Button
            style={[
              styles().button,
              { backgroundColor: theme.primary, borderColor: theme.primary },
            ]}
            onPress={async () => {
              await analytics.track("tap_account_picker_confirm", {
                selectedAccount: selectedItem,
              });
              onSelected(selectedItem);
              navigation.pop();
            }}
          >
            <Text style={[styles().btnTitle, { color: theme.white }]}>
              {i18n.t("confirm")}
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
