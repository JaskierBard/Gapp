import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { NpcVoice } from "./NpcVoice";
import { manageMissionStatus } from "../common/FirebaseService";
const lines = [
  "W czym mogę ci pomóc?",
  "Co mogę dla ciebie zrobić?",
  "Masz dla mnie jakieś zadanie?",
  "Słyszałem że masz jakiś problem.",
];
const better = [
    {"Zgoda": () => console.log('zgoda')}

    // {"Zgoda": () => manageMissionStatus(ID ,false)}
  ];

const answers = [
  "Przyjmuję to zadanie",
  "Muszę się zastanowić",
  "Chciałbym przekazać to zadanie komuś innemu",
  "Nie zrobię tej misji, znajdź kogoś innego",
];
export interface Props {
  missionsText: any;
  selectedNpc: string;
  endConversation: () => void;
}

export const DialogueOptions = (props: Props) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [dialogLines, setDialogLines] = useState<string[]>(lines);

  const [text, setText] = useState<string | null>();
  const [ID, setID] = useState<string | null>();


  const endSpeak = () => {
    setDialogLines(answers);
    setIsSpeaking(false);
  };

  const renderDialogueLines = (line: string, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsSpeaking(!isSpeaking);
          setID(props.missionsText[index].id);
          setText(props.missionsText[index].mission);
        }}
      >
        <Text style={styles.text}>{line}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isSpeaking ? (
        <NpcVoice
          text={text ? text : "Nie mam ci nic do powiedzenia"}
          selectedNpc={props.selectedNpc}
          speak={isSpeaking}
          endSpeak={endSpeak}
        />
      ) : (
        <View style={styles.talkingArea}>
          <FlatList
            data={dialogLines.slice(0, props.missionsText.length)}
            renderItem={({ item, index }) => renderDialogueLines(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity onPress={props.endConversation}>
            <Text style={styles.text}>Koniec</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  talkingArea: {
    position: "absolute",
    width: "100%",
    minHeight: 110,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 5,
  },
  text: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 12,
  },
});
