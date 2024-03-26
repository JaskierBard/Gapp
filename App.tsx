import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import TabNavigator from "./components/Navigation";
import * as NavigationBar from "expo-navigation-bar";
import { background } from "./components/Styles";
import { Console } from "./components/common/Console/Console";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [flashConsole, setFlashConsole] = useState(false);

  const [logs, setLogs] = useState([""]);

  const addLog = (newLog: string) => {
    setLogs((prevLogs) => {
      const updatedLogs = [newLog, ...prevLogs.slice(0, 4)];
      return updatedLogs;
    });
  };

  useEffect(() => {
    if (showConsole === false) {
      (async () => {
        setFlashConsole(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFlashConsole(false);
      })();
    }
  }, [logs]);

  const makeF2Visible = () => {
    setShowConsole(!showConsole);
  };

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
        NavigationBar.setVisibilityAsync("hidden");
        await NavigationBar.setBehaviorAsync("inset-swipe");

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
      style={background.image}
    >
      <TabNavigator addLog={addLog} consoleVisible={makeF2Visible} />
      {flashConsole && <Console text={logs} consoleVisible={makeF2Visible}  flashConsole={flashConsole}/>}
      {showConsole && <Console text={logs} consoleVisible={makeF2Visible}  flashConsole={flashConsole}/>}
    </ImageBackground>
  );
}
