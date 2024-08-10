import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { EquipmentCeil } from "../components/common/EquipmentCeil";

const { width } = Dimensions.get("window");

export default function Equipment({ route }: any) {
  const equipment = route.params;
  const renderItem = ({ item, index }: any) => (
    <EquipmentCeil
      key={index}
      index={index}
      image={item.image}
      quantity={item.quantity}
    />
  );
  const emptyCells = Array.from({ length: 30 - equipment.length }, (_, index) => (
    <View key={`empty-${index}`} style={eqStyles.ceil}></View>
  ));
  
  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={eqStyles.backgroundImage}
    >
  
        <View style={eqStyles.equipment}>
        <FlatList
          data={equipment}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={5}
          ListFooterComponent={<View>{emptyCells}</View>}
          // contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        />
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
