import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

export interface Props {
    text: string;
  }

export const Speak = (props:Props) => {
  const startSpeech = async () => {
    try {
        
      Speech.speak(props.text, {voice:"pl-pl-x-bmg-network"});
      
      console.log( await Speech.getAvailableVoicesAsync())
    } catch (error) {
      console.error("Wystąpił błąd podczas odczytywania tekstu:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={startSpeech}>
        <Text style={styles.npcTalkText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  npcTalkText: {
    fontFamily: "gothic-font",
    color: "rgb(255, 255, 102)",
    fontSize: 11,
    top: 20,
    textAlign: "center",

    
  },
})