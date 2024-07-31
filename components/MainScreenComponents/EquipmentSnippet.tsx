import { BlurView } from 'expo-blur';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { eqStyles } from '../../screens/MainScreen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/Navigation';

export const EquipmentSnippet = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('Equipment')}
      >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={eqStyles.eqContainer}>
          <View style={eqStyles.itemContainer}></View>
          <View style={eqStyles.itemContainer}></View>
          <View style={eqStyles.itemContainer}></View>
          <View style={eqStyles.itemContainer}></View>
        </View>
      </BlurView>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  blurContainer: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'transparent', // Upewnij się, że tło jest przezroczyste

    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Dodaj inne style
});

