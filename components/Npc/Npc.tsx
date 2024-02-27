import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { background, missionStyles } from "../Styles";
import { Speak } from "../common/Speech";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const Npc = () => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [text, setText] = useState<string>();

  useEffect(() => {
    (async () => {
      const docRef = doc(FIRESTORE_DB, "todos", "L5T2RhEr41WEVtx321UH");

      const docSnap = await getDoc(docRef);
      setText(docSnap.data()?.description);
    })();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={background.image}
    >
      <View style={styles.npcContainer}>
        {isSpeaking && <Speak name={"Bosper"} text={text ? text : 'bład'} speak={isSpeaking} />}
        {/* <Flame/> */}
        <View>
          {/* <NPCView name={props.name} /> */}
          <Image
            source={require("../../assets/Npc/Bosper.jpg")}
            style={styles.npcImage}
          />
          <View style={styles.talkingArea}>
            <TouchableOpacity onPress={() => setIsSpeaking(!isSpeaking)}>
              <Text style={styles.talkingText}>
                Czy masz dla mnie jakieś zadanie?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.talkingText}>Wstecz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  npcContainer: {
    width: "94%",
    height: 600,
    borderRadius: 5,
    top: 170,
    left: "3%",
    position: "relative",
    shadowColor: "wheat",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.9,
    shadowRadius: 10,
    elevation: 10,
  },
  npcImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  talkingArea: {
    position: "absolute",
    width: "100%",
    height: 110,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingTop: 5,
  },
  talkingText: {
    marginLeft: 10,
    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 12,
  },
});
