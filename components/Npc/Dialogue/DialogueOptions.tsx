import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { NpcVoice } from "./NpcVoice";
import { DialogueLines } from "./DialogueLines";

import { manageMissionStatus } from "../../common/FirebaseService";
import { fastResponse, shortTalkDown } from "../../common/AiMissions/MissionAi";
import { acceptMission, doneMission } from "./TrackData";
const lines = [
  "W czym mogę ci pomóc?",
  "W czym mogę ci pomóc?",
  "W czym mogę ci pomóc?",
  "W czym mogę ci pomóc?",
  "W czym mogę ci pomóc?",
  ,
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

  const [conversationTrack, setConversationTrack] = useState<string | null>(
    null
  );

  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    if (text) {
      setIsSpeaking(true);
    }
  }, [text]);

  useEffect(() => {
    const dialogLines: { text: any; action: any }[] = [];
    if (conversationTrack === null) {
      props.missionsText.forEach((element: any, index: number) => {
        if (props.missionsText[index].isAccepted) {
          dialogLines.push({
            text: props.missionsText[index].talkDown,
            action: async () => {
              setConversationTrack("doneMission");
              return "Jak ci idzie?";
              // await fastResponse(props.missionsText[index].mission, "status")
            },
          });
        } else {
          dialogLines.push({
            text: lines[index],
            action: () => {
              setConversationTrack("acceptMission");
              return props.missionsText[index].mission;
            },
          });
        }
      });

      setDialogLines(dialogLines);
    } else {
      switch (conversationTrack) {
        case "doneMission":
          return setDialogLines(doneMission);
        case "acceptMission":
          return setDialogLines(acceptMission);
        default:
          null;
      }
    }
  }, [isSpeaking, conversationTrack]);

  const fillText = (data: string) => {
    console.log(data);
    setText(data);
  };

  const endSpeak = () => {
    // setText(null)
    setIsSpeaking(false);
  };

  return (
    <View style={styles.container}>
      {isSpeaking ? (
        <NpcVoice
          text={text ? text : "Nie mam ci nic do powiedzenia"}
          selectedNpc={props.selectedNpc}
          // speak={isSpeaking}
          endSpeak={endSpeak}
        />
      ) : (
        <View style={styles.talkingArea}>
          <FlatList
            data={dialogLines}
            renderItem={({ item, index }) => (
              <DialogueLines line={item} fillText={fillText} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {!text ? (
            <TouchableOpacity onPress={props.endConversation}>
              <Text style={styles.text}>Koniec</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setConversationTrack(null);
                setText(null)
              }}
            >
              <Text style={styles.text}>Wróć</Text>
            </TouchableOpacity>
          )}
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
