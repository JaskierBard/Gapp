import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EquipmentScreen from '../screens/EquipmentScreen';
import { MainScreen } from '../screens/MainScreen';
import { NpcList } from '../screens/NpcListScreen';
import TradeScreen from '../screens/TradeScreen';

export type RootStackParamList = {
  Home: undefined;
  Equipment: { equipment: any; equipped: any };
  NpcList:{ equipment: any; equipped: any};
  Trade: { equipment: any; equipped: any, item: any };
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator  screenOptions={{
        headerShown: false,
        // cardStyle: { backgroundColor: 'transparent' }, 
      }}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Equipment" component={EquipmentScreen} />
      <Stack.Screen name="NpcList" component={NpcList} />
      <Stack.Screen name="Trade" component={TradeScreen} />


    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;