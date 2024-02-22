import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const Checkmark = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <View style={checkmarkStyle.mark_container}>
      <TouchableOpacity
        style={[checkmarkStyle.mark, isChecked && { backgroundColor: "green" }]}
        onPress={() => setIsChecked(!isChecked)}
      ></TouchableOpacity>
      <Text style={checkmarkStyle.mark_text}>Misja cykliczna.</Text>
    </View>
  );
};

export const checkmarkStyle = StyleSheet.create({
  mark_container: {
    position: "absolute",
    top: 30,
    left: 10,
    width: 200,
    height: 50,
    // backgroundColor: "grey",
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
    color: 'white'
  },
});
