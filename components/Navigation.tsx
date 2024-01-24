import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";

import List from "../components/Tasks/Tasks";
import EqGenerator from "../components/Equipment/Equipment";
import Map from "../components/Map/Map";
import Statistics from "../components/Statistics/Statistics";

import Settings from "./Settings";

import { StyleSheet } from "react-native";

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

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerTitleStyle: { fontFamily: "gothic-font" },
          tabBarLabelStyle: { fontFamily: "gothic-font" },
          headerStyle: {
            borderBottomWidth: 0,
          },
          headerTransparent: true,
        }}
      >

        <Tab.Screen
          name="missions"
          component={List}
          options={{
            title: "Misje",
            tabBarIcon: () => (
              <Image
                source={require("../assets/images/paper.jpg")}
                style={styles.backgroundImage}
              />
            ),
          }}
        />
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
