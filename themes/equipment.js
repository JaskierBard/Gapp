import { StyleSheet } from "react-native";
import { width } from "./main";

export const equipmentStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  equipmentShort: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: (width * 90.1) / 100,
    height: (width * 54) / 100,
    marginBottom: 50,
    marginTop: 50,
    marginLeft: (width * 5) / 100,
  },

  equipment: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: (width * 90.1) / 100,
    height: (width * 108) / 100,
    marginBottom: 50,
    marginTop: 100,
    marginLeft: (width * 5) / 100,
  },
});

export const equipmentCeilStyles = StyleSheet.create({
  ceil: {
    width: (width * 18) / 100,
    height: (width * 18) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "grey",
    borderWidth: 1,
  },
  image: {
    resizeMode: "contain",
    width: 70,
    height: 70,
  },
  text: {
    position: "absolute",
    color: "white",
    bottom: 2,
    right: 2,
  },
  clickedCeil: {
    borderColor: "blue",
    borderWidth: 1,
  },
  equippedCeil: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
  },
});

export const equipmentPreviewStyles = StyleSheet.create({
  container: {
    marginLeft: (width * 5) / 100,
    height: (width * 40) / 100,
    width: (width * 90.1) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "grey",
    borderWidth: 1,
    position: "relative",
  },
  itemInfo: {
    height: 100,
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
    width: 90,
    height: 90,
    right: 40,
    top: 40,
  },
  title: {
    textAlign: "center",
    paddingTop: 3,
    paddingBottom: 5,
  },
  infoLine: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
