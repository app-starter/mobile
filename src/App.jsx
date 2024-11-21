import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./navigation/app-navigator";
import AuthNavigator from "./navigation/auth-navigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthStore from "./stores/AuthStore";
import { observer } from "mobx-react";
import ThemeStore from "./stores/ThemeStore";
import { CustomDarkTheme, CustomLightTheme } from "./theme/theme";

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        return (
          error?.response?.status !== 403 && error?.response?.status !== 401
        );
      },
    },
  },
});

const App = observer(() => {
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    // Uygulama başladığında sistem temasını kontrol et
    if (ThemeStore.isDarkMode === null) {
      ThemeStore.setDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme]);

  const theme = ThemeStore.isDarkMode ? CustomDarkTheme : CustomLightTheme;

  useEffect(() => {
    const checkLoginStatus = async () => {
      await AuthStore.init(); // AuthStore'daki init metodunu çağırıyoruz
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    // Burada bir loading ekranı gösterebilirsiniz
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {AuthStore.isLogin ? (
            <Stack.Screen name="App" component={AppNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
});

export default App;
