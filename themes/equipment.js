import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const equipmentStyles = StyleSheet.create({
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
    paddingBottom:2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
