import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from "../screens/app/home";
import { ProfileScreen } from "../screens/app/profile";
import { SettingsScreen } from "../screens/app/settings";


import { Home, User ,Settings} from "lucide-react-native"; // Assuming you have these icons defined somewhere
import { ChangePasswordScreen } from "../screens";

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();

const SettingsStackScreen = () => (
  <SettingsStack.Navigator >
    <SettingsStack.Screen name="SettingsMain" component={SettingsScreen}   />
    <SettingsStack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Şifre Değiştir' }} />
    {/* Diğer ayarlar ekranları buraya eklenebilir */}
  </SettingsStack.Navigator>
);

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
       
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        // Diğer genel options...
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsStackScreen}
        options={{
          title: 'Ayarlar',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
