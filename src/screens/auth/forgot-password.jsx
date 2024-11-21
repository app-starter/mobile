import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../data";

export function ForgotPasswordScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    mutate: resetPassword,
    isLoading,
    error,
  } = useMutation({
    mutationKey: "forgotPassword",
    mutationFn: (data) => forgotPassword(data),
    onSuccess: () => {
      navigation.navigate("Login");
    },
    onError: (error) => {
      console.log(JSON.stringify(error));
    },
  });

  const onSubmit = (data) => {
    resetPassword(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>App Starter</Text>
        </View>
        <Text style={styles.title}>Şifremi Unuttum</Text>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: "E-posta gereklidir",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Geçerli bir e-posta adresi giriniz",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="E-posta adresiniz"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          {error && <Text style={styles.errorText}>{error.message}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading
                ? "Gönderiliyor..."
                : "Şifre Sıfırlama Bağlantısı Gönder"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  errorText: {
    color: "#EF4444",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3B82F6",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#93C5FD",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
