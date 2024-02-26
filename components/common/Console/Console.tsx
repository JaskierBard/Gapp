import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { ConsoleItems } from "./ConsoleItems";

export interface Props {
    text: string[]
}

export const Console = (props:Props) => {
  return (
    <View style={consoleStyle.codes}>
      <Image
        style={consoleStyle.code_flame}
        source={require("../../../assets/images/flame_1.png")}
      />
      <Image
        style={consoleStyle.code_text}
        source={require("../../../assets/images/gothic.png")}
      />
      {}
      <ConsoleItems logs={props.text}/>
    </View>
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

  code_flame: {
    position: "absolute",
    margin: 0,
    padding: 0,
    top: -290,
    width: 120,
    height: 700,
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
    color: 'wheat',
    fontSize: 12,
    left: 10,
    bottom: 3,
  },
});
