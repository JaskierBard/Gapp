import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Speech from "expo-speech";

export interface Props {
  name: string;
  text: string;
  speak: boolean;
}

export const Speak = (props: Props) => {
  useEffect(() => {
    if (props.speak === true) {
      startSpeech();
    }
  }, [props.speak]);

  

  const startSpeech = async () => {
    try {
      Speech.speak(props.text, { voice: "pl-pl-x-bmg-network" });
      console.log('elo')

    } catch (error) {
      console.error("Wystąpił błąd podczas odczytywania tekstu:", error);
    }
  };

  return (
    <View style={styles.npcTalkWindow}>
      <TouchableOpacity onPress={startSpeech}>
        <Text style={styles.npcName}>{props.name}</Text>

        <Text style={styles.npcTalkText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  npcTalkWindow: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    top: 20,
    left: "5%",
    zIndex: 3,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "90%",
    height: "20%",
  },
  npcName: {
    // position: "absolute",
    fontFamily: "gothic-font",
    color: "white",
    textAlign: "center",
  },
  npcTalkText: {
    fontFamily: "gothic-font",
    color: "rgb(255, 255, 102)",
    fontSize: 11,
    top: 20,
    textAlign: "center",
  },
});
