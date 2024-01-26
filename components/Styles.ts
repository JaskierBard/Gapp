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
