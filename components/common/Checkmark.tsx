import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export interface Props {
  text: string;
  isChecked: boolean;
  onCheckChange: (isChecked: boolean) => void;
}

export const Checkmark = (props: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isChecked);

  useEffect(() => {
    props.onCheckChange(isChecked);
  }, [isChecked]);

  return (
    <View style={checkmarkStyle.mark_container}>
      <TouchableOpacity
        style={[checkmarkStyle.mark, isChecked && { backgroundColor: "green" }]}
        onPress={() => setIsChecked(!isChecked)}
      ></TouchableOpacity>
      <Text style={checkmarkStyle.mark_text}>{props.text}</Text>
    </View>
  );
};

export const checkmarkStyle = StyleSheet.create({
  mark_container: {
    // position: "absolute",
    // top: 10,
    left: 10,
    width: 200,
    height: 50,
  },
  mark: {
    position: "relative",
    width: 20,
    height: 20,
    backgroundColor: "red",
    marginTop: 10,
    marginLeft: 20,
  },
  mark_text: {
    position: "absolute",
    marginLeft: 50,
    marginTop: 10,
    fontFamily: "gothic-font",
    color: "white",
  },
});
