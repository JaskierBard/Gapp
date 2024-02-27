import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { background, missionStyles } from "../Styles";

export const Npc = () => {
  const text =
    "Kolejnym cieniem spotkanym przez Bezimiennego jest Świstak. Odda on swój głos w zamian za drobną przysługę. Chce on zdobyć pewien pięknie zdobiony miecz, który sprzedaje Fisk.";

  const text2 =
    "Problem w tym, że panowie się posprzeczali, dlatego Świstak musi zakupić oręż przez pośrednika. Bohater dostaje 100 bryłek rudy i ma za zadanie nabyć broń. Na miejscu okazuje się jednak, że miecz kosztuje 110 bryłek rudy. Bezimienny może wrócić do Świstaka po dodatkowe bryłki lub zapłacić z własnej kieszeni. Po udanym zakupie Bezimienny wraca do cienia, który jest zadowolony i oddaje na niego swój głos.";
  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={background.image}
    >
      <View style={styles.npcContainer}>
        <View style={styles.npcTalkWindow}>
          <Text style={styles.npcName}>Bosper</Text>
          <Text style={styles.npcTalkText}>{text}</Text>
        </View>
        {/* <Flame/> */}
        <View>
          {/* <NPCView name={props.name} /> */}
          <Image
            source={require("../../assets/Npc/Bosper.jpg")}
            style={styles.npcImage}
          />
          <View style={styles.talkingArea}>
            <TouchableOpacity>
              <Text style={styles.talkingText}>
                Co możesz powiedzieć mi o tym miejscu?
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

  npcTalkWindow: {
    position: "absolute",
    flex: 1,
    alignItems: "center",
    top: 20,
    left: "5%",
    zIndex: 3,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "90%",
    height: "20%",
  },
  npcName: {
    position: "absolute",
    fontFamily: "gothic-font",
    color: "white",
  },

  npcTalkText: {
    position: "absolute",
    fontFamily: "gothic-font",
    color: "rgb(255, 255, 102)",
    fontSize: 11,
    top: 20,
    textAlign: "center",

    
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
