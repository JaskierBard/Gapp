import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

export interface Props {
  name: string;
  onClickButton: () => void;
  undo: () => void;
  addLog: (arg: string) => void;


}

export const BinButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={buttonStyle.buttonContainer}
      onPress={() => {
        props.onClickButton();
        props.undo();
        props.addLog('Usunięto misję: ' + props.name)

      }}
    >
      <Image
        style={buttonStyle.img}
        source={require("../../../assets/images/recycle-bin.png")}
      />
    </TouchableOpacity>
  );
};

export const buttonStyle = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    width: 22,
    height: 22,
    borderWidth: 0.5,
    borderColor: "yellow",
    borderRadius: 5,
  },
  img: {
    width: 20,
    height: 20,
  },
});
