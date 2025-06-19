import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { i18n } from "@/translations";
import { ColorTheme } from "@/types/theme-props";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@ant-design/react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { api } from "@/common/api";
import { sessionVar } from "@/common/vars";
import { createSession } from "@/common/session-utils";
import { getEndpoint } from "@/common/request";

const getStyles = (theme: ColorTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      paddingHorizontal: 16,
      paddingTop: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.text01,
      marginBottom: 24,
      marginTop: 8,
    },
    label: {
      fontSize: 18,
      color: theme.text01,
      marginBottom: 6,
      marginTop: 16,
    },
    input: {
      borderWidth: 2,
      borderColor: theme.primary,
      borderRadius: 8,
      paddingHorizontal: 12,
      fontSize: 18,
      color: theme.text01,
      backgroundColor: theme.white,
      height: 44,
    },
    inputError: {
      borderColor: theme.error,
    },
    button: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 24,
      marginBottom: 16,
      height: 44,
      justifyContent: "center",
    },
    buttonText: {
      color: theme.white,
      fontSize: 16,
      fontWeight: "500",
    },
    link: {
      color: theme.primary,
      fontSize: 14,
      textAlign: "center",
      marginVertical: 6,
    },
    bottomLink: {
      color: theme.primary,
      fontSize: 14,
      textAlign: "center",
      marginTop: 16,
    },
    error: {
      color: theme.error,
      fontSize: 12,
      marginTop: 4,
    },
    errorText: {
      color: theme.error,
      fontSize: 12,
      marginBottom: 16,
    },
  });

const schema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const SignInScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const styles = useThemeStyle(getStyles);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      const res = await api.signIn(data.email, data.password);
      if (!res.ok) {
        setError(res.error.message || "An unknown error occurred");
        return;
      }
      const session = createSession(res.authToken);
      sessionVar(session);
      router.replace("/(app)/(tabs)");
    } finally {
      setLoading(false);
    }
  };

  const onResetPassword = () => {
    Linking.openURL(getEndpoint("forgot-password"));
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <Text style={styles.title}>{i18n.t("signIn")}</Text>
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={[styles.input, error ? styles.inputError : {}]}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={[styles.input, error ? styles.inputError : {}]}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
      <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      >
        <Text style={styles.buttonText}>{i18n.t("signIn")}</Text>
      </Button>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={onResetPassword}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <Link href="/auth/sign-up" asChild>
        <TouchableOpacity>
          <Text style={styles.bottomLink}>
            Don&apos;t have an account? Sign up
          </Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default SignInScreen;
