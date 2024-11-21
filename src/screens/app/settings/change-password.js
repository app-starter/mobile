import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../../data/requests/account-requests';
import { useTheme } from '../../../hooks/useTheme';

export function ChangePasswordScreen({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const { control, handleSubmit, formState: { errors } } = useForm();

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      // Şifre değiştirme başarılı olduğunda yapılacak işlemler
      navigation.goBack();
    },
  });

  const onSubmit = (data) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>Şifre Değiştir</Text>
      
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.card : theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Mevcut Şifre"
            placeholderTextColor={theme.colors.text}
            secureTextEntry
          />
        )}
        name="currentPassword"
        rules={{ required: 'Mevcut şifre gereklidir' }}
      />
      {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.card : theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Yeni Şifre"
            placeholderTextColor={theme.colors.text}
            secureTextEntry
          />
        )}
        name="newPassword"
        rules={{ required: 'Yeni şifre gereklidir', minLength: { value: 6, message: 'Şifre en az 6 karakter olmalıdır' } }}
      />
      {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? theme.colors.card : theme.colors.background,
                color: theme.colors.text,
                borderColor: theme.colors.border,
              }
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Yeni Şifre (Tekrar)"
            placeholderTextColor={theme.colors.text}
            secureTextEntry
          />
        )}
        name="confirmPassword"
        rules={{ 
          required: 'Şifre tekrarı gereklidir',
          validate: (value) => value === control._formValues.newPassword || 'Şifreler eşleşmiyor'
        }}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit(onSubmit)}
        disabled={changePasswordMutation.isLoading}
      >
        <Text style={[styles.buttonText, { color: theme.colors.background }]}>
          {changePasswordMutation.isLoading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});