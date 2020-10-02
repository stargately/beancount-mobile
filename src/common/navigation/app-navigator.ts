import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from "react-navigation";

import { MainTabNavigator } from "@/common/navigation/main-tab-navigator";
import { AddTransactionScreen } from "@/screens/add-transaction-screen";
import { AddTransactionNextScreen } from "@/screens/add-transaction-screen/add-transaction-next-screen";
import { PayeeInputScreen } from "@/screens/add-transaction-screen/payee-input-screen";
import { NarrationInputScreen } from "@/screens/add-transaction-screen/narration-input-screen";
import { AccountPickerScreen } from "@/screens/account-picker-screen";

const RootScreen = createSwitchNavigator({
  Main: MainTabNavigator,
});

const AppRoot = createStackNavigator(
  {
    Root: {
      screen: RootScreen,
      navigationOptions: {
        header: null,
      },
    },
    AddTransaction: AddTransactionScreen,
    AddTransactionNext: AddTransactionNextScreen,
    AccountPicker: AccountPickerScreen,
    PayeeInput: PayeeInputScreen,
    NarrationInput: NarrationInputScreen,
  },
  {
    headerMode: "none",
  }
);

export const AppNavigator = createAppContainer(AppRoot);
