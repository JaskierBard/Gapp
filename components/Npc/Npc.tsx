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
import { FIREBASE_STORAGE, FIRESTORE_DB } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

interface Props {
  name: string;
  end: () => void;
}

export const Npc = (props: Props) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [text, setText] = useState<string | null>();
  const [singleItem, setSingleItem] = useState<string>("");
  const targetImageName = `${props.name}.jpg`;

  useEffect(() => {
    (async () => {
      const docRef = doc(FIRESTORE_DB, "todos", "L5T2RhEr41WEVtx321UH");

      const docSnap = await getDoc(docRef);
      setText(docSnap.data()?.description);
    })();
  }, []);

  useEffect(() => {
    const fetchSingleImage = async () => {
      try {
        const storageRef = ref(FIREBASE_STORAGE, `npc/${targetImageName}`);

        const url = await getDownloadURL(storageRef);

        setSingleItem(url);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };

    fetchSingleImage();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={background.image}
    >
      <View style={styles.npcContainer}>
        {isSpeaking && (
          <Speak
            name={props.name}
            text={text ? text : "bład"}
            speak={isSpeaking}
          />
        )}
        <View>
          {singleItem && (
            <Image source={{ uri: singleItem }} style={styles.npcImage} />
          )}

          <View style={styles.talkingArea}>
            <TouchableOpacity onPress={() => setIsSpeaking(!isSpeaking)}>
              <Text style={styles.talkingText}>
                Czy masz dla mnie jakieś zadanie?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSpeaking(!isSpeaking)}>
              <Text style={styles.talkingText}>Co do tej misji...</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.end}>
              <Text style={styles.talkingText}>Koniec</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 5,
  },
  talkingText: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 12,
  },
});
