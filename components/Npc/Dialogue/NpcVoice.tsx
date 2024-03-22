import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Speech from "expo-speech";

export interface Props {
  text: string;
  selectedNpc: string;
  // speak: boolean;
  endSpeak: () => void;
}
const MAX_FRAGMENT_LENGTH = 200;

export const NpcVoice = (props: Props) => {
  const [fragments, setFragments] = useState<string[]>([]);
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState<number>(0);

  useEffect(() => {
    if ( fragments[currentFragmentIndex] !== undefined) {
      startSpeech();
    }
  }, [currentFragmentIndex, fragments]);

  useEffect(() => {
    if (props.text) {
      const textFragments: string[] = [];
      let start = 0;
      while (start < props.text.length) {
        let end = start + MAX_FRAGMENT_LENGTH;
        let lastDotIndex = -1;
        for (let i = start; i < end && i < props.text.length; i++) {
          if (props.text[i] === ".") {
            lastDotIndex = i;
          }
        }
        if (lastDotIndex !== -1) {
          end = lastDotIndex + 1;
        }
        textFragments.push(props.text.substring(start, end).trim());
        start = end;
      }
      setFragments(textFragments);
    }
  }, [props.text]);

  const startSpeech = async () => {
    try {
      // console.log(fragments[currentFragmentIndex])

      Speech.speak((fragments[currentFragmentIndex]), { voice: "pl-pl-x-bmg-network", onDone: nextDialog, rate: 1.4 });
    } catch (error) {
      console.error("Wystąpił błąd podczas odczytywania tekstu:", error);
    }
  };

  const nextDialog = () => {
    Speech.stop()

    if (fragments.length <= currentFragmentIndex + 1) {
      props.endSpeak();
      // setCurrentFragmentIndex(0)
    } else {
      setCurrentFragmentIndex(
        (prevIndex) => (prevIndex + 1) % fragments.length
      );
    }
  };
  return (
    <View style={styles.npcTalkWindow}>
      <Text style={styles.npcName}>{props.selectedNpc}</Text>
      <TouchableOpacity onPress={nextDialog}>
        <Text style={styles.npcTalkText}>
          {fragments[currentFragmentIndex]}
        </Text>
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
    paddingTop: 5,
    fontFamily: "gothic-font",
    color: "white",
    textAlign: "center",
  },
  npcTalkText: {
    fontFamily: "gothic-font",
    color: "rgb(255, 255, 102)",
    fontSize: 11,
    top: 5,
    textAlign: "center",
  },
});
