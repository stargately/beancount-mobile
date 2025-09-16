import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { useThemeStyle } from "@/common/hooks/use-theme-style";
import { useTranslations } from "@/common/hooks/use-translations";
import { ColorTheme } from "@/types/theme-props";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { api } from "@/common/api";

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
    description: {
      fontSize: 16,
      color: theme.text01,
      marginBottom: 24,
    },
    label: {
      fontSize: 18,
      color: theme.text01,
      marginBottom: 6,
      marginTop: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.primaryLight,
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
      alignItems: "center",
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
    sentContainer: {
      paddingHorizontal: 16,
      backgroundColor: "#f0fdf4",
      padding: 16,
      marginBottom: 16,
      borderRadius: 8,
    },
    sentTitle: {
      fontSize: 16,
      color: theme.success,
    },
  });

const schema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

const ResetPasswordSent = () => {
  const styles = useThemeStyle(getStyles);
  const { t } = useTranslations();
  return (
    <View style={styles.sentContainer}>
      <Text style={styles.sentTitle}>{t("resetPasswordEmailSent")}</Text>
    </View>
  );
};

const ResetPasswordScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const styles = useThemeStyle(getStyles);
  const { t } = useTranslations();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const res = await api.forgotPassword(data.email);
    if (!res.ok) {
      setError(res.error.message || "An unknown error occurred");
      return;
    }
    setSent(true);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <Text style={styles.title}>{t("resetPassword")}</Text>
      <Text style={styles.description}>{t("resetPasswordDescription")}</Text>
      {sent ? (
        <ResetPasswordSent />
      ) : (
        <>
          <Text style={styles.label}>{t("email")}</Text>
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
          <Button
            type="primary"
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            {t("sendResetPasswordEmail")}
          </Button>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </>
      )}
      <Link href="/auth/sign-in" asChild>
        <TouchableOpacity>
          <Text style={styles.bottomLink}>{t("backToSignIn")}</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
