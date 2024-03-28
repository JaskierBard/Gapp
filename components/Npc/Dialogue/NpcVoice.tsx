import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { getAudio } from "../../common/FirebaseService";

export interface Props {
  bezi: string;
  text: string;
  selectedNpc: string;
  endSpeak: () => void;
  addLog: (arg: string) => void;
}
const MAX_FRAGMENT_LENGTH = 200;

export const NpcVoice = (props: Props) => {
  const [fragments, setFragments] = useState<string[]>([]);
  const [currentFragmentIndex, setCurrentFragmentIndex] = useState<number>(0);

  async function chooseAudio(bezi: string) {
    switch (bezi) {
      case "Czy moglibyśmy porozmawiać o zadaniu, które mi zleciłeś?":
        return "co_do_tego_zadania.WAV";
        case "Witaj!":
        return "witaj.WAV";
      case "W czym mogę ci pomóc?":
        return "masz_dla_mnie_jakies_zadanie.WAV";
      case "Co słychać?":
        return "co_slychac.WAV";
      case "Zgoda":
        return "dobrze_zrobie_to.WAV";
      case "Odrzucam":
        return "nie_nie_zrobie_tego.WAV";
      case "Co dokładnie miałem dla ciebie zrobić?":
        return "na_czym_polega_twoje_zadanie.WAV";
      default:
        return "hmm.WAV";
    }
  }

  async function playSound() {
    const audioName = await chooseAudio(props.bezi);
    const url = await getAudio("sounds", audioName);
    const soundObject = new Audio.Sound();
    let audioStarted = false;
    try {
      if (url) {
        await soundObject.loadAsync({ uri: url });
        await soundObject.playAsync();
        soundObject.setOnPlaybackStatusUpdate((finish) => {
          Object.keys(finish).map(async (key, index) => {
            if (key === "isPlaying") { // do zmiany chyba
              if (Object.values(finish)[index] === true) {
                // console.log(Object.values(finish)[index]);
                audioStarted = true;
              }
              await new Promise((resolve) => setTimeout(resolve, 3000));
              if (audioStarted === false) {
                console.log(
                  "zbyt długie oczekianie na plik audio - sprawdź połaczenie z internetem"
                );
                nextDialog();
                soundObject.unloadAsync(); 
              }
            }
            if (key === "didJustFinish") {
              if (Object.values(finish)[index] === true) {
                props.addLog('kolejny tekst')
                nextDialog();
                soundObject.unloadAsync();
              }
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (fragments[currentFragmentIndex] !== undefined) {
      startSpeech();
    }
  }, [currentFragmentIndex, fragments]);

  useEffect(() => {
    if (props.text && props.bezi) {
      const textFragments: string[] = [];
      textFragments.push(props.bezi);
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
      if (currentFragmentIndex === 0) {
        playSound();
      } else {
        Speech.speak(fragments[currentFragmentIndex], {
          voice: "pl-pl-x-bmg-network",
          onDone: nextDialog,
          rate: 1.3,
        });
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas odczytywania tekstu:", error);
    }
  };

  const nextDialog = () => {
    Speech.stop();
    if (fragments.length <= currentFragmentIndex + 1) {
      props.endSpeak();
    } else {
      setCurrentFragmentIndex(
        (prevIndex) => (prevIndex + 1) % fragments.length
      );
    }
  };
  return (
    <View style={styles.npcTalkWindow}>
      {currentFragmentIndex === 0 ? (
        <>
          <TouchableOpacity onPress={nextDialog}>
            <Text style={styles.heroTalkText}>
              {fragments[currentFragmentIndex]}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.npcName}>{props.selectedNpc}</Text>
          <TouchableOpacity onPress={nextDialog}>
            <Text style={styles.npcTalkText}>
              {fragments[currentFragmentIndex]}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  npcTalkWindow: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 12,
    top: 5,
    textAlign: "center",
  },
  heroTalkText: {
    fontFamily: "gothic-font",
    color: "white",
    fontSize: 12,
    top: 5,
    textAlign: "center",
  },
});
