import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { RootStackParamList } from "../navigation/Navigation";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { background } from "../components/Styles";
export interface Props {
  addLog: (arg: string) => void;
}

export const NpcList = ({ route }: any) => {
  const [npcList, setNpcList] = useState<string[]>(["Bosper", "Bengar"]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const equipment = route.params;

  const renderNpc = ({ item }: any) => {
    return (
      <View>
        <TouchableOpacity
onPress={() => navigation.navigate('Trade', { equipment, item })}
>
          <Text style={styles.talkingText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={background.image}
    >
      <View style={styles.npcContainer}>
        {npcList && (
          <View style={{ padding: 10 }}>
            <FlatList
              data={npcList}
              renderItem={(item) => renderNpc(item)}
              keyExtractor={(todo) => todo}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  npcContainer: {
    width: "94%",
    height: 600,
    borderRadius: 5,
    top: 120,
    // left: "3%",
    position: "relative",
    // shadowColor: "wheat",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1.9,
    // shadowRadius: 10,
    // elevation: 10,
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
