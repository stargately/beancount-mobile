import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import {
  navigationBarHeight,
  onePx,
  statusBarHeight,
} from "@/common/screen-util";
import { AppState } from "@/common/store";
import { theme } from "@/common/theme";

type Props = {
  currentTheme?: "light" | "dark";
  title: string;
  showBack?: boolean;
  navigation?: NavigationScreenProp<string>;
  rightText?: string;
  onRightClick?: () => void;
};

export const NavigationBar = connect((state: AppState) => ({
  currentTheme: state.base.currentTheme,
}))(function NavigationBarInner(props: Props): JSX.Element {
  const { title, showBack, navigation, rightText, onRightClick } = props;
  return (
    <View
      style={{
        height: navigationBarHeight,
        backgroundColor: theme.navBg,
      }}
    >
      <View
        style={{
          marginTop: statusBarHeight,
          justifyContent: "center",
          alignItems: "center",
          height: navigationBarHeight - statusBarHeight,
          borderBottomWidth: onePx,
          borderBottomColor: theme.black80,
        }}
      >
        {showBack && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              position: "absolute",
              paddingHorizontal: 10,
              paddingVertical: 6,
              left: 0,
            }}
            onPress={() => navigation && navigation.pop()}
          >
            <Ionicons
              name="ios-arrow-back"
              size={29}
              color={theme.navText}
              style={{ paddingHorizontal: 10 }}
            />
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: theme.navText,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>

        {rightText && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              position: "absolute",
              paddingHorizontal: 10,
              paddingVertical: 6,
              right: 0,
            }}
            onPress={() => onRightClick && onRightClick()}
          >
            <Text
              style={{
                color: theme.primary,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {rightText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
