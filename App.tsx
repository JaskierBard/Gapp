import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation/Navigation";
import { MainScreen } from "./screens/MainScreen";

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
        await loadFonts();
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
    <ImageBackground
      source={require("./assets/images/background.jpg")}
      style={styles.backgroundImage}
    >
      <Navigation />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent", // Przezroczystość tła
  },
});
