import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { ConsoleItems } from "./ConsoleItems";

export interface Props {
  text: string[];
  consoleVisible: () => void;
  flashConsole: boolean;
}

export const Console = (props: Props) => {
  const handlePress = () => {
    props.consoleVisible();
  };
  return (
    <>
      {props.flashConsole ? (
        <View style={consoleStyle.codes_flash}>
        <Image
          style={consoleStyle.code_flame}
          source={require("../../../assets/images/flame_1.png")}
        />
          <ConsoleItems logs={[props.text[0]]} />
      </View>
      ) : (
        <TouchableOpacity onPress={handlePress} style={consoleStyle.codes}>
          <Image
            style={consoleStyle.code_flame}
            source={require("../../../assets/images/flame_1.png")}
          />
          <Image
            style={consoleStyle.code_text}
            source={require("../../../assets/images/gothic.png")}
          />
          {}
          <ConsoleItems logs={props.text} />
        </TouchableOpacity>
      )}
    </>
  );
};
export const consoleStyle = StyleSheet.create({
  codes: {
    position: "absolute",
    width: "100%",
    height: 120,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 1000,
    borderBottomColor: "rgba(255, 215, 0, 0.5)",
    borderBottomWidth: 1,
  },
 

  codes_flash: {
    position: "absolute",
    width: "100%",
    height: 110,
    shadowColor: "green",
    backgroundColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // zIndex: 1000,
    shadowOpacity: 0.5, // Zwiększenie widoczności cienia
    shadowRadius: 10,
    elevation: 10,
  },
  




  code_flame: {
    position: "absolute",
    margin: 0,
    padding: 0,
    top: -340,
    width: 120,
    height: 800,
    transform: [{ rotate: "270deg" }],
    opacity: 0.3,
  },

  code_text: {
    position: "absolute",
    bottom: 10,
    right: 15,
    height: 24,
    width: 100,
    opacity: 0.5,
  },

  text: {
    position: "absolute",

    fontFamily: "gothic-font",
    color: "wheat",
    fontSize: 12,
    left: 10,
    bottom: 3,
  },
});
