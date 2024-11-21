import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';
import {Settings} from 'lucide-react-native'; // Eğer yüklü değilse: npm install react-native-vector-icons

export function ProfileScreen() {
  const navigation = useNavigation();
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Profil</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Settings
            
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.infoText, { color: theme.colors.text }]}>Ad: John Doe</Text>
        <Text style={[styles.infoText, { color: theme.colors.text }]}>E-posta: john@example.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 10,
  },
  content: {
    flex: 1,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
