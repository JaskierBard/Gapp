import { StyleSheet } from "react-native";

const FONT = {
  fontFamily: "gothic-font",
  color: "white",
};

export const text = StyleSheet.create({
  large: {
    ...FONT, 
    fontSize: 18,
  },
  medium: {
    ...FONT,
    fontSize: 14,
  },

  small: {
    ...FONT, 
    fontSize: 12,
  },
  description: {
    ...FONT,
    fontSize: 9,
    paddingBottom: 5,
    color: "lightgray",
  }
});
