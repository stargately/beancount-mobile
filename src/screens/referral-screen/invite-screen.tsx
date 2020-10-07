import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { composeAsync } from "expo-mail-composer";
import { NavigationBar } from "@/common/navigation-bar";
import { isAvailableAsync, sendSMSAsync } from "expo-sms";
import { NavigationScreenProp, SafeAreaView } from "react-navigation";
import { Button, Toast, SearchBar } from "@ant-design/react-native";
import { contentPadding } from "@/common/screen-util";
import { theme } from "@/common/theme";
import { CommonMargin } from "@/common/common-margin";
import { groupBy } from "lodash";
import { useContacts } from "@/screens/referral-screen/hooks/use-contacts";
import { ContactRow } from "@/screens/referral-screen/components/contact-row";
import { i18n } from "@/translations";

type RowItem = {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
};

type SectionItem = {
  key: string;
  data: RowItem[];
};

type Props = {
  navigation: NavigationScreenProp<string>;
};

const styles = () =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.white },
    bodyContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
    loadingOrErrText: { color: theme.text01, fontSize: 16 },
    flex1: { flex: 1 },
    contentContainerStyle: { paddingBottom: 104 },
    bottomButtonContainer: {
      padding: contentPadding,
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      height: 44 + contentPadding * 2,
    },
    button: { height: 44, backgroundColor: theme.primary },
    buttonText: { fontWeight: "500", fontSize: 16, color: "white" },
    sectionHeaderContainer: {
      backgroundColor: theme.white,
      paddingHorizontal: contentPadding,
      paddingVertical: 4,
      borderBottomColor: theme.black60,
      borderBottomWidth: 1,
      borderTopColor: theme.black60,
      borderTopWidth: 1,
    },
    sectionHeaderText: {
      color: theme.text01,
    },
    searchInput: {
      fontSize: 16,
      color: theme.text01,
      backgroundColor: theme.white,
    },
  });

export function InviteScreen(props: Props) {
  const contacts = useContacts();

  const [selectedContacts, setSelectedContacts] = React.useState<RowItem[]>([]);
  const [keyword, setKeyword] = React.useState("");

  const sections = React.useMemo(() => {
    // @ts-ignore
    return Object.entries(
      groupBy(
        // Create one contact per phone number and email.
        contacts.data.reduce((res, cur) => {
          if (cur.phoneNumbers != null) {
            for (const p of cur.phoneNumbers) {
              res.push({
                id: cur.id + p.number,
                name: cur.name || "",
                phoneNumber: p.number,
              });
            }
          }
          if (cur.emails != null) {
            for (const e of cur.emails) {
              res.push({
                id: cur.id + e.email,
                name: cur.name || "",
                email: e.email,
              });
            }
          }
          return res;
        }, [] as Array<RowItem>),
        (c: RowItem) => {
          const firstChar = (c.name.charAt(0) || "#").toLowerCase();
          return firstChar.match(/[a-z]/) ? firstChar : "#";
        }
      )
    )
      .map(([key, value]: [string, RowItem[]]) => ({
        key,
        data: value.sort((a, b) =>
          (a.name || a.name || "") < (b.name || b.name || "") ? -1 : 1
        ),
      }))
      .sort((a: { key: string }, b: { key: string }) =>
        a.key < b.key ? -1 : 1
      );
  }, [contacts.data]);

  const filteredSection = React.useMemo(() => {
    if (keyword.length > 0) {
      const filteredSections = new Array<SectionItem>();
      for (const s of sections) {
        const filteredData = s.data.filter(
          (d) =>
            d.name.indexOf(keyword) >= 0 ||
            (d.email && d.email.indexOf(keyword) >= 0) ||
            (d.phoneNumber && d.phoneNumber.indexOf(keyword) >= 0)
        );
        if (filteredData.length > 0) {
          filteredSections.push({ key: s.key, data: filteredData });
        }
      }
      return filteredSections;
    }
    return sections;
  }, [sections, keyword]);

  const onInvitePress = async () => {
    const shareLink = String(props.navigation.getParam("shareLink") || "");
    let didShare = false;
    const message = `${i18n.t("recommend")}【beancount.io】${shareLink}`;
    const emails = selectedContacts
      .filter((c) => c.email != null)
      .map((c) => c.email) as string[];
    const phoneNumbers = selectedContacts
      .filter((c) => c.phoneNumber != null)
      .map((c) => c.phoneNumber) as string[];
    if (emails.length > 0) {
      try {
        const result = await composeAsync({
          recipients: emails,
          subject: "beancount.io",
          body: message,
          isHtml: false,
        });
        didShare = didShare || result.status === "sent";
      } catch (ex) {
        Toast.fail(ex.message);
      }
    }
    if (phoneNumbers.length > 0 && (await isAvailableAsync())) {
      try {
        const result = await sendSMSAsync(phoneNumbers, message);
        didShare = didShare || result.result === "sent";
      } catch (ex) {
        Toast.fail(ex.message);
      }
    }

    if (didShare) {
      Toast.show(i18n.t("thanksShare"));
    }
  };

  const renderBody = () => {
    if (contacts.loading) {
      return (
        <View style={styles().bodyContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <CommonMargin />
          <Text style={styles().loadingOrErrText}>{i18n.t("loading")}</Text>
        </View>
      );
    }
    if (contacts.error != null) {
      const errMsg =
        String(contacts.error.message).indexOf("permission") >= 0
          ? i18n.t("noContactPermission")
          : String(contacts.error.message);
      return (
        <View style={styles().bodyContainer}>
          <MaterialIcons name="error" size={48} color={theme.primary} />
          <CommonMargin />
          <Text style={styles().loadingOrErrText}>{errMsg}</Text>
        </View>
      );
    }

    return (
      <View style={styles().flex1}>
        <SearchBar
          styles={{
            wrapper: {
              backgroundColor: theme.white,
            },
          }}
          style={styles().searchInput}
          placeholder={i18n.t("inputKeyword")}
          value={keyword}
          onCancel={() => {
            setKeyword("");
          }}
          onChange={(val) => {
            setKeyword(val);
          }}
        />
        <SectionList
          showsVerticalScrollIndicator={false}
          bounces={false}
          sections={filteredSection}
          renderSectionHeader={({ section }) => (
            <View style={styles().sectionHeaderContainer}>
              <Text style={styles().sectionHeaderText}>
                {section.key!.toUpperCase()}
              </Text>
            </View>
          )}
          renderItem={({ item }: { item: RowItem }) => {
            const selectedIndex = selectedContacts.findIndex(
              (i) => i.id === item.id
            );
            const onPress = () => {
              const newContacts = [...selectedContacts];
              if (selectedIndex >= 0) {
                newContacts.splice(selectedIndex, 1);
              } else {
                newContacts.push(item);
              }
              setSelectedContacts(newContacts);
            };
            return (
              <ContactRow
                name={item.name}
                emailOrNumber={(item.email || item.phoneNumber)!}
                selected={selectedIndex >= 0}
                onPress={onPress}
              />
            );
          }}
          extraData={selectedContacts}
          contentContainerStyle={styles().contentContainerStyle}
        />
        <SafeAreaView style={styles().bottomButtonContainer}>
          <Button
            style={styles().button}
            onPress={onInvitePress}
            disabled={selectedContacts.length === 0}
          >
            <Text style={styles().buttonText}>{`${i18n.t("invite")} (${
              selectedContacts.length
            })`}</Text>
          </Button>
        </SafeAreaView>
      </View>
    );
  };

  return (
    <View style={styles().container}>
      <NavigationBar
        title={i18n.t("inviteFriends")}
        showBack
        navigation={props.navigation}
      />

      {renderBody()}
    </View>
  );
}
