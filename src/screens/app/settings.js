import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthStore from '../../stores/AuthStore';
import { useTheme } from '../../hooks/useTheme';




export function SettingsScreen() {
  
  const navigation = useNavigation();
  const { isDarkMode, setIsDarkMode } = useTheme();

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Çıkış Yap",
      "Çıkış yapmak istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Çıkış Yap",
          onPress: async () => {
            await AuthStore.logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          }
        }
      ]
    );
  };

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Hesap</Text>
        <TouchableOpacity 
          className={`p-4 mb-2 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          onPress={() => navigateTo('Profile')}
        >
          <Text className={isDarkMode ? 'text-white' : 'text-black'}>Profil Bilgileri</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`p-4 mb-2 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          onPress={() => navigateTo('ChangePassword')}
        >
          <Text className={isDarkMode ? 'text-white' : 'text-black'}>Şifre Değiştir</Text>
        </TouchableOpacity>

        <Text className={`text-xl font-bold mt-6 mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Görünüm</Text>
        <View className={`flex-row justify-between items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Text className={isDarkMode ? 'text-white' : 'text-black'}>Karanlık Mod</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        <Text className={`text-xl font-bold mt-6 mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Yardım ve Destek</Text>
        <TouchableOpacity 
          className={`p-4 mb-2 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          onPress={() => navigateTo('FAQ')}
        >
          <Text className={isDarkMode ? 'text-white' : 'text-black'}>Sıkça Sorulan Sorular</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`p-4 mb-2 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          onPress={() => navigateTo('ContactSupport')}
        >
          <Text className={isDarkMode ? 'text-white' : 'text-black'}>Destek Talebi Oluştur</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-red-500 p-4 rounded-md mt-8"
          onPress={handleLogout}
        >
          <Text className="text-white text-center font-bold">Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
