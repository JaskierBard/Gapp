import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { getImage, getNpc } from "../../utils/firebase/firebaseNpc";
import { DialogueOptions } from "./Dialogue/DialogueOptions";
import { getNpcMissions } from "../../utils/firebase/firebaseMission";
import {Trade} from "./Trade/Trade";

interface Props {
  selectedNpc: string;
  endConversation: () => void;
  addLog: (arg: string) => void;
}

export const SelectedNpc = (props: Props) => {
  const [npcDetails, setNpcDetails] = useState<Object>();

  const [missionsText, setMissionsText] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string>();
  const [currentAction, setCurrentAction] = useState<string | null>();

  const targetImageName = `${props.selectedNpc}.jpg`;

  const actions = (action: string | null) => {
    setCurrentAction(action);
  };

  useEffect(() => {
    (async () => {
      setImageURL(await getImage("npc", targetImageName));
      setNpcDetails(await getNpc(props.selectedNpc));
      setMissionsText(
        await getNpcMissions("g4tPE1itk3vJTDAj19PO", props.selectedNpc)
      );
    })();
  }, [props.selectedNpc]);

  return (
    <>
      {imageURL && <Image source={{ uri: imageURL }} style={styles.npcImage} />}
      {missionsText && (
        <View style={styles.npcContainer}>
          {currentAction ? (
            <Trade end={actions}/>
          ) : (
            <DialogueOptions
              addLog={props.addLog}
              endConversation={props.endConversation}
              addAction={actions}
              missionsText={missionsText}
              selectedNpc={props.selectedNpc}
              npcDetails={npcDetails}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  npcContainer: {
    position: "absolute",
    width: "100%",
    height: '100%',
  },
  npcImage: {
    // position: "absolute",

    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
