import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import TabNavigator from "./components/Navigation";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "gothic-font": require("./assets/fonts/gothic_font.ttf"),
    });
  };

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        // Dodaj inne operacje inicjalizacyjne, jeśli są potrzebne

        setIsAppReady(true);
      } catch (error) {
        console.warn("Error while preparing the app:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!isAppReady) {
    return <Text>Loading...</Text>;
  }
  return (
    <TabNavigator/>
  );
}


