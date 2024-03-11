import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import EqGenerator from "../components/Equipment/Equipment";
import Map from "../components/Map/Map";
import Statistics from "../components/Statistics/Statistics";
import Settings from "./Settings";
import { StyleSheet } from "react-native";
import Tasks from "../components/Tasks/Tasks";
import { Npc } from "./Npc/Npc";
import { NpcList } from "./Npc/NpcList";

export interface Props {
  addLog: (arg: string) => void;
}

const NavigateToSettings = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Settings" as never);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 16 }}>
      <Image
        source={require("../assets/images/settings.jpg")}
        style={{ width: 40, height: 40 }}
      />
    </TouchableOpacity>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = (props: Props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleStyle: { fontFamily: "gothic-font", color: "white" },
          tabBarLabelStyle: { fontFamily: "gothic-font" },
          tabBarHideOnKeyboard: true,
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerTransparent: true,
          tabBarStyle: {
            borderTopWidth: 0.5,
            borderTopColor: "yellow",
            backgroundColor: "black",
          },
        }}
      >
        <Tab.Screen
          name="missions"
          options={{
            title: "Misje",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/paper.jpg")}
                style={styles.backgroundImage}
              />
            ),
          }}
        >
          {() => <Tasks addLog={props.addLog} />}
        </Tab.Screen>
        <Tab.Screen
          name="npc"
          options={{
            title: "NPC",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/paper.jpg")}
                style={styles.backgroundImage}
              />
            ),
          }}
        >
          {() => <NpcList/>}
        </Tab.Screen>
        <Tab.Screen
          name="map"
          component={Map}
          options={{
            title: "Mapa",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/compass.jpg")}
                style={styles.backgroundImage}
              />
            ),
            headerRight: () => <NavigateToSettings />,
          }}
        />
        <Tab.Screen
          name="statistics"
          component={Statistics}
          options={{
            title: "Statystyki",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/statistics.jpg")}
                style={styles.eqImage}
              />
            ),
          }}
        />
        <Tab.Screen
          name="equipment"
          component={EqGenerator}
          options={{
            title: "Ekwipunek",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/equipment.jpg")}
                style={styles.eqImage}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Ustawienia",
            tabBarButton: () => null,
            tabBarLabel: "",
            tabBarItemStyle: { height: 0, width: 0 },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: 55,
  },
  eqImage: {
    flex: 1,
    width: 25,
  },
});
