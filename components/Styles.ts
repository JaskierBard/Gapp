import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export const main = StyleSheet.create({
  container: {
    position: "absolute",
    width: (width * 94) / 100,
    height: (height * 50) / 100,
    borderWidth: 0.5,
    borderColor: "yellow",
    // backgroundColor: "rgba(0, 0, 0, 0.826)",
    backgroundColor: "black",
    zIndex: 2,
    // position: "absolute",
  },
  textTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "gothic-font",
  },
  textRegular: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    fontFamily: "gothic-font",
  },
});

export const button = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: -70, // Odstęp od dołu
    right: 10, // Odstęp od prawej
    backgroundColor: "rgba(0, 0, 0, 0.726)",

    borderWidth: 0.5, // Grubość obramówki
    borderColor: "yellow", // Kolor obramówki (żółty)
    borderRadius: 8, // Zaokrąglenie narożników
    paddingHorizontal: 16, // Wypełnienie poziome
    paddingVertical: 8, // Wypełnienie pionowe
  },
  buttonContent: {
    flexDirection: "row", // Domyślnie przycisk będzie centrował tekst i ikonę w poziomie
    alignItems: "center", // Centrowanie zawartości w pionie
    justifyContent: "center", // Centrowanie zawartości w poziomie
  },
  buttonText: {
    color: "white", // Kolor tekstu (czarny)
    fontSize: 16, // Rozmiar tekstu
    fontFamily: "gothic-font",

  },
});
export const background = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export const missionStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: (width * 94) / 100,
    height: (height * 50) / 100,
    marginTop: 200,
marginLeft: (width * 3) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.726)",
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 4,
  },
  todoTextUndone: {
    flex: 1,
    paddingHorizontal: 4,
    fontFamily: "gothic-font",
  },
  todoTextDone: {
    color: "white",
    flex: 1,
    paddingHorizontal: 4,
    fontFamily: "gothic-font",
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  left: {
    width: "30%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: 2,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  current: {
    height: "20%",
    position: "relative",
    flex: 2,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  done: {
    height: "20%",
    position: "relative",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  failture: {
    height: "20%",
    position: "relative",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  information: {
    height: "20%",
    position: "relative",
    flex: 1,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  date: {
    height: "20%",
    position: "relative",
    flex: 2,
    borderWidth: 0.5,
    borderColor: "yellow",
  },
  text: {
    color: "white",
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "gothic-font",
  },
  descriptionText: {
    color: "white",
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: "gothic-font",
  },
  right: {
    width: "50%",
    height: "100%",
    flex: 3,
    // borderWidth: 0.6,
    // borderColor: "yellow",
  },
});

