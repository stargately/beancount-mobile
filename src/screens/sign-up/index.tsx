import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { i18n } from "@/translations";
import { ColorTheme } from "@/types/theme-props";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { api } from "@/common/api";
import { sessionVar } from "@/common/vars";
import { createSession } from "@/common/session-utils";
import { Button } from "@/components";

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
      marginTop: 24,
      marginBottom: 16,
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

const schema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string({ message: "Confirm password is required" })
      .min(6, { message: "Confirm password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const styles = useThemeStyle(getStyles);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    try {
      const res = await api.signUp(data.email, data.password);
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <Text style={styles.title}>{i18n.t("signUp")}</Text>
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
        <Text style={styles.label}>Confirm Password</Text>
        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                style={[styles.input, error ? styles.inputError : {}]}
                placeholder="Confirm Password"
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
          type="primary"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        >
          {i18n.t("signUp")}
        </Button>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Link href="/auth/sign-in" asChild>
          <TouchableOpacity>
            <Text style={styles.bottomLink}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </Link>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
