import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
export default function Equipment() {
  const items = Array.from({ length: 30 }, (_, index) => index);

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={eqStyles.backgroundImage}
    >
      <View style={eqStyles.equipment}>
        {items.map((item, index) => (
          <View key={index} style={eqStyles.ceil}></View>
        ))}
        {Array.from({ length: 30 - items.length }, (value, index) => (
          <View key={index} style={eqStyles.ceil}></View>
        ))}
      </View>
    </ImageBackground>
  );
}

const eqStyles = StyleSheet.create({
  equipment: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: (width * 90.1) / 100,
    height: (width * 108) / 100,
    marginBottom: 110,
    flexDirection: "row", // Ustawienie kierunku flexbox na rząd
    flexWrap: "wrap",
    marginTop: 100,
    marginLeft: (width * 5) / 100,
  },
  ceil: {
    width: (width * 18) / 100,
    height: (width * 18) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "grey",
    borderWidth: 1, // Dodanie szerokości obramowania
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    width: (width * 18) / 100,
    height: (width * 18) / 100,
  },
});
