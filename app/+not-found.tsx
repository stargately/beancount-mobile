import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { Flex } from "@/components/Flex";

import React from "react";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Flex>
        <Link href="/" style={styles.link}>
          <Text>Not Found</Text>
        </Link>
      </Flex>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
