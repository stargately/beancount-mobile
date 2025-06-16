import { Link, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { Flex } from "@/components/Flex";

import React from "react";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Flex style={styles.container}>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </Flex>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
