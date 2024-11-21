import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../data';
import { Eye, EyeOff } from 'lucide-react-native';

export function RegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');

  const {
    mutate: registerUser,
    isLoading,
    error,
  } = useMutation({
    mutationKey: 'register',
    mutationFn: (data) => register(data),
    onSuccess: (response) => {
      // Başarılı kayıt sonrası işlemler
      navigation.navigate('Login', { message: 'Hesap başarıyla oluşturuldu. Lütfen giriş yapın.' });
    },
  });

  const onSubmit = (data) => {
    registerUser(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hesap Oluştur</Text>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: 'Ad gereklidir',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Ad Soyad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

          <Controller
            control={control}
            rules={{
              required: 'E-posta gereklidir',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Geçerli bir e-posta adresi giriniz',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="E-posta"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              rules={{
                required: 'Şifre gereklidir',
                minLength: {
                  value: 8,
                  message: 'Şifre en az 8 karakter olmalıdır',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifre"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                />
              )}
              name="password"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              {showPassword ? (
                <EyeOff size={24} color="#6B7280" />
              ) : (
                <Eye size={24} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              rules={{
                validate: value =>
                  value === password || 'Şifreler eşleşmiyor',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Şifre Tekrar"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showConfirmPassword}
                />
              )}
              name="confirmPassword"
            />
            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
              {showConfirmPassword ? (
                <EyeOff size={24} color="#6B7280" />
              ) : (
                <Eye size={24} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.switchContainer}>
                <Switch
                  onValueChange={onChange}
                  value={value}
                />
                <Text style={styles.switchLabel}>Kullanım koşullarını kabul ediyorum</Text>
              </View>
            )}
            name="acceptTerms"
            rules={{ required: 'Kullanım koşullarını kabul etmelisiniz' }}
          />
          {errors.acceptTerms && <Text style={styles.errorText}>{errors.acceptTerms.message}</Text>}

          {error && <Text style={styles.errorText}>{error.message}</Text>}

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Zaten hesabınız var mı? Giriş yapın</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
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
    borderColor: '#D1D5DB',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#93C5FD',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#3B82F6',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#4B5563',
  },
});
