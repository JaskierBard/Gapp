import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export const Spinner = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={'wheat'}/>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      
    },
  });

