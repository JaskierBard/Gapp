import { useState, useRef } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";

export default function Dice() {
  const [value, setValue] = useState<number | string>("");
  const [pressStartTime, setPressStartTime] = useState<number>(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const rollDice = () => {
    const randomValue = Math.floor(Math.random() * 20) + 1;
    setValue(randomValue);
  };

  const handlePressIn = () => {
    setValue("");
    setPressStartTime(Date.now());
  };

  const handlePressOut = () => {
    const pressDuration = (Date.now() - pressStartTime) / 1000;
    const calculatedPower = Math.min(pressDuration, 3);

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: calculatedPower * 1000,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      rollDice();
    });
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "3600deg"],
  });

  return (
    <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View style={styles.container}>
        <Animated.Image
          source={require("../../assets/images/dice.png")}
          style={[styles.dice, { transform: [{ rotate: spin }] }]}
        />
        <Text style={styles.text}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  dice: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  text: {
    color: "lightgrey",
    fontWeight: "400",
    fontSize: 20,
    transform: [{ rotate: "-25deg" }],
  },
});
