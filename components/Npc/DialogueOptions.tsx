import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { NpcVoice } from "./NpcVoice";
import { manageMissionStatus } from "../common/FirebaseService";
import { fastResponse, shortTalkDown } from "../common/AiMissions/MissionAi";
const lines = [
  "W czym mogę ci pomóc?",
  "Co mogę dla ciebie zrobić?",
  "Masz dla mnie jakieś zadanie?",
  "Słyszałem że masz jakiś problem.",
  "W czym mogę ci pomóc?",
  "Co mogę dla ciebie zrobić?",
  "Masz dla mnie jakieś zadanie?",
  "Słyszałem że masz jakiś problem.",
];
// const better = [
//   { text: "Zgoda", action: () => setText("zgoda") },
//   { text: "Odrzucam", action: () => console.log("odrzucam") },

//   // {"Zgoda": () => manageMissionStatus(ID ,false)}
// ];
const zagajenie = [
  "co do tej misji",
  "co do tej misji",
  "co do tej misji",
  "co do tej misji",
  
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
  const [dialogLines, setDialogLines] = useState<any>([
    { text: "Test", action: () => console.log("test") },
  ]);

  const [text, setText] = useState<string | null>();
  const [ID, setID] = useState<string | null>();

  const fill = async () => {
    if (ID) {
      const better = [
        { text: "Zgoda", action: async () => {setText( await fastResponse('zgadzam się', 'thanks')), manageMissionStatus(ID ,true) }},
        { text: "Odrzucam", action: async () => {setText( await fastResponse('nie zgadzam się', 'thanks'))  }},
      ]; 
      setDialogLines(better);
    }
  };

  useEffect(() => {
    if (text) {
      setIsSpeaking(true);
    }
  }, [text]);

  

  useEffect(() => {
    const dialogLines: { text: any; action: any }[] = [];
    props.missionsText.forEach((element: any, index:number) => {
  if (props.missionsText[index].isAccepted) {
        dialogLines.push({
          text: props.missionsText[index].talkDown,
          action: async () => setText( await fastResponse( props.missionsText[index].mission, 'status',)),
        });
      }else {
        dialogLines.push({
          text: lines[index],
          action: () => setText(props.missionsText[index].mission),
        });
      }});

    setDialogLines(dialogLines);
  }, []);

  const endSpeak = () => {
    fill()
    setIsSpeaking(false);
  };

  const executeAction = (action: any, index?: string) => {
    action();
  };

  const renderDialogueLines =  (line: any, index: number) => {
    const dialogLine = Object.values(line)[0] ? Object.values(line)[0] : 'bład';
    return (
      <TouchableOpacity
        onPress={() => {
          executeAction(Object.values(line)[1]);
          setID(props.missionsText[index].id);
        }}
      >
        <Text style={styles.text}>{dialogLine as string}</Text>
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
            data={dialogLines}
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
    minHeight: 100,
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
