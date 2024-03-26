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
import { TrackDialogue, acceptMission, doneMission } from "./TrackData";

export interface Props {
  missionsText: any;
  selectedNpc: string;
  endConversation: () => void;
  addLog: (arg: string) => void;

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
  const [bezi, setBezi] = useState<string | null>(null);

  useEffect(() => {
    if (text) {
      setIsSpeaking(true);
    }
  }, [text]);

  useEffect(() => {
    setDialogLines(TrackDialogue(props.missionsText, conversationTrack));
  }, [isSpeaking, conversationTrack]);

  const fillText = async (
    beziTalk: string,
    text: string,
    conversationTrack?: string
  ) => {
    setBezi(beziTalk);
    if (conversationTrack || conversationTrack === null) {
      setConversationTrack(conversationTrack);
    }
    setText(text);
  };

  const endSpeak = () => {
    setBezi(null)
    setText(null);
    setIsSpeaking(false);
  };

  return (
    <View style={styles.container}>
      {isSpeaking ? (
        <NpcVoice
          bezi={bezi ? bezi : "Nie mam ci nic do powiedzenia"}
          text={text ? text : "Nie mam ci nic do powiedzenia"}
          selectedNpc={props.selectedNpc}
          endSpeak={endSpeak}
          addLog={props.addLog}
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
                setText(null);
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