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
import { SelectedNpc } from "./SelectedNpc";
import { getMissionsCount, getNpc } from "../common/FirebaseService";
export interface Props {
  addLog: (arg: string) => void;

}


export const NpcList = (props:Props) => {
  const [sectedNpc, setSelectedNpc] = useState<string | null>(null);
  const [npcList, setNpcList] = useState<[string]>();
  const [npcWithMission, setNpcWithMission] = useState<{ [key: string]: any }>(
    {}
  );

  useEffect(() => {
    (async () => {
      const npcs = getNpc();
      setNpcList(npcs);
      setNpcWithMission(await getMissionsCount("g4tPE1itk3vJTDAj19PO"));
    })();
  }, []);

  const endConversation = () => {
    setSelectedNpc(null);
  };

  const renderNpc = ({ item }: any) => {
    if (npcWithMission.hasOwnProperty(item)) {
      return (
        <View>
          <TouchableOpacity onPress={() => setSelectedNpc(item)}>
            <Text style={styles.important}>
              {item} - Nowa Misja [{npcWithMission[item]}]
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity onPress={() => setSelectedNpc(item)}>
            <Text style={styles.talkingText}>{item}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={background.image}
    >
      {sectedNpc ? (
        <View style={styles.npcContainer}>
          <SelectedNpc
            addLog={props.addLog}
            selectedNpc={sectedNpc}
            endConversation={endConversation}
          />
        </View>
      ) : (
        <View style={styles.npcContainer}>
          {npcList && (
            <View>
              <FlatList
                data={npcList}
                renderItem={(item) => renderNpc(item)}
                keyExtractor={(todo) => todo}
              />
            </View>
          )}
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


  talkingText: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 16,
  },
  important: {
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: "gothic-font",
    color: "orange",
    fontSize: 16,
  },
});
