import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EquipmentScreen from '../screens/EquipmentScreen';
import { MainScreen } from '../screens/MainScreen';

export type RootStackParamList = {
  Home: undefined;
  Equipment: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator  screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' }, // Ustawienie tła przezroczystego dla kart
      }}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Equipment" component={EquipmentScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;