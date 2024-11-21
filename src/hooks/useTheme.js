import { useCallback } from 'react';
import { useObserver } from 'mobx-react';
import themeStore from '../stores/ThemeStore';

export const useTheme = () => useObserver(() => {
  const setIsDarkMode = useCallback((value) => {
    themeStore.setDarkMode(value);
  }, []);

  return {
    isDarkMode: themeStore.isDarkMode,
    setIsDarkMode,
    theme: themeStore.currentTheme,
  };
});