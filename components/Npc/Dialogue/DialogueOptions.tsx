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

import { getOpression } from "../../../utils/firebase/firebaseNpc";
import {
  aiDialogLinesCreator,
  fastResponse,
} from "../../common/AiMissions/MissionAi";

export interface Props {
  npcDetails: any;
  missionsText: any;
  selectedNpc: string;
  addAction: (action:string) => void;
  endConversation: () => void;
  addLog: (arg: string) => void;
}

export const DialogueOptions = (props: Props) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  // const [opression, setOpression] = useState<any>();
  const [basicDialogLines, setBasicDialogLines] = useState<any>();

  const [dialogLines, setDialogLines] = useState<any>([]);

  const [conversationTrack, setConversationTrack] = useState<string | null>(
    null
  );

  const [text, setText] = useState<string | null>(null);
  const [bezi, setBezi] = useState<string | null>(null);

  useEffect(() => {
    if (basicDialogLines) {
      setDialogLines(basicDialogLines)
    }

    if (conversationTrack === null && !basicDialogLines) {

    (async () => {
      console.log('Rozmowa inicjująca')

      if (props.selectedNpc && props.npcDetails) {
        setText(await fastResponse("", "hey", "", 0, props.selectedNpc, props.npcDetails.charakter, props.npcDetails.opis));
      }
    })();
  }
  }, [conversationTrack]);

  useEffect(() => {
    if (text) {
      setIsSpeaking(true);
    }
  }, [text]);

  useEffect(() => {
    (async () => {
      if (isSpeaking == true && text) {
        const data = await aiDialogLinesCreator(text, props.selectedNpc, props.npcDetails, props.missionsText, conversationTrack)
        setDialogLines(
          data
        );
        if (conversationTrack===null) {
          setBasicDialogLines(data);
        }
      }
     
    })();
  }, [isSpeaking]);

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
    setBezi(null);
    setText(null);
    setIsSpeaking(false);
  };

  return (
    <View style={styles.container}>
      {isSpeaking ? (
        <NpcVoice
          bezi={bezi ? bezi : "Witaj!"}
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
              <DialogueLines line={item} fillText={fillText} addAction={props.addAction}/>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          {!conversationTrack ? (
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
