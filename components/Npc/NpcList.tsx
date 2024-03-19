import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { background } from "../Styles";
import { Npc } from "./Npc";
import { getMissions, getNpc } from "../common/FirebaseService";





export const NpcList = () => {
  const [speaker, setSpeaker] = useState<string | null>(null);
  const [npcList, setNpcList] = useState<[string]>();

  useEffect(() => {
    (async () => {
      setNpcList(getNpc())
      getMissions("g4tPE1itk3vJTDAj19PO")
    })();

  }, []);
  const endSpeak = () => {
    setSpeaker(null);

  };
  const renderTodo = ({ item }: any) => {
    return (
      <View>
        <TouchableOpacity onPress={() => setSpeaker(item)}>
          <Text style={styles.talkingText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={background.image}
    >
      {speaker ? (
        <Npc name={speaker} end={endSpeak} />
      ) : (
        <View style={styles.npcContainer}>
          {npcList && <View>
            <FlatList
              data={npcList}
              renderItem={(item) => renderTodo(item)}
              keyExtractor={(todo) => todo}
            />
          </View>}
          
        </View>
      )}
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
    paddingTop: 5,
  },
  talkingText: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 16,
  },
});
