import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomLightTheme, CustomDarkTheme } from '../theme/theme';

// MobX store
class ThemeStore {
    isDarkMode = false;
  
    constructor() {
      makeAutoObservable(this);
      this.loadTheme();
    }
  
    setDarkMode(value) {
      this.isDarkMode = value;
      AsyncStorage.setItem('isDarkMode', JSON.stringify(value));
    }
  
    async loadTheme() {
      try {
        const value = await AsyncStorage.getItem('isDarkMode');
        if (value !== null) {
          this.isDarkMode = JSON.parse(value);
        }
        // Sistem temasını kontrol etmek için ayrı bir fonksiyon kullanacağız
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    }
  
    get currentTheme() {
      return this.isDarkMode ? CustomDarkTheme : CustomLightTheme;
    }
}

export default new ThemeStore();