import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { getImage, getNpcMissions } from "../common/FirebaseService";
import { DialogueOptions } from "./DialogueOptions";

interface Props {
  selectedNpc: string;
  endConversation: () => void;
}

export const SelectedNpc = (props: Props) => {
  const [missionsText, setMissionsText] = useState<any>(null);
  const [imageURL, setImageURL] = useState<string>();

  const targetImageName = `${props.selectedNpc}.jpg`;

  useEffect(() => {
    (async () => {
      setImageURL(await getImage("npc", targetImageName));
      setMissionsText(
        await getNpcMissions("g4tPE1itk3vJTDAj19PO", props.selectedNpc)
      );
    })();
  }, [props.selectedNpc]);

  return (
    <>
      {imageURL && (
        <Image source={{ uri: imageURL }} style={styles.npcImage} />
      )}
      {missionsText && (
        <DialogueOptions
          endConversation={props.endConversation}
          missionsText={missionsText}
          selectedNpc={props.selectedNpc}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  npcContainer: {
    // position: "absolute",

    width: "94%",
    // height: '10%',
  },
  npcImage: {
    // position: "absolute",

    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
