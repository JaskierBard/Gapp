import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { EquipmentCeil } from "../components/common/EquipmentCeil";

const { width } = Dimensions.get("window");

export default function Equipment({ route }: any) {
  const equipment = route.params;

  const items = Array.from({ length: 30 }, (_, index) => index);
  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={eqStyles.backgroundImage}
    >
      <View style={eqStyles.equipment}>
        <ScrollView style={eqStyles.scrollView}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {equipment.map((item: any, index: any) => (
              <EquipmentCeil
                key={index}
                index={index}
                image={item.image}
                quantity={item.quantity}
              />
            ))}
            {Array.from({ length: 30 - equipment.length }, (value, index) => (
              <View key={index} style={eqStyles.ceil}></View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const eqStyles = StyleSheet.create({
  scrollView: {
    height: (width * 108) / 100,
    width: (width * 90.1) / 100,
  },
  equipment: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: (width * 90.1) / 100,
    height: (width * 108) / 100,
    marginBottom: 110,

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
