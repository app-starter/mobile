import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Button,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../data";
import AuthStore from "../../stores/AuthStore";
import { Eye, EyeOff } from "lucide-react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  webClientId:
    "421983055851-97e6924v4g0m41e2dqlt3cn175iuk4g7.apps.googleusercontent.com",
});

export function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    mutate: loginUser,
    isLoading,
    error,
  } = useMutation({
    mutationKey: "login",
    mutationFn: (data) => login(data),
    onSuccess: (response) => {
      AuthStore.setUser(response.data.token);
      navigation.navigate("App", { screen: "Home" });
    },
  });

  const onSubmit = (data) => {
    loginUser(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>App Starter</Text>
        </View>
        <Text style={styles.title}>Hoş Geldiniz</Text>
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

          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              rules={{
                required: "Şifre gereklidir",
                minLength: {
                  value: 6,
                  message: "Şifre en az 6 karakter olmalıdır",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifreniz"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                />
              )}
              name="password"
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon}
            >
              {showPassword ? (
                <EyeOff size={24} color="#6B7280" />
              ) : (
                <Eye size={24} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          {error && <Text style={styles.errorText}>{error.message}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.registerButtonText}>Şifremi unuttum</Text>
          </TouchableOpacity>

          <Button
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress()}
          />
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerButtonText}>Hesap Oluştur</Text>
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
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
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
  registerButton: {
    marginTop: 15,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#3B82F6",
    fontSize: 16,
  },
});
