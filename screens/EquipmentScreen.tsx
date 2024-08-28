import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import { EquipmentCeil } from "../components/common/EquipmentCeil";
import { useState } from "react";
import ItemPreview from "../components/common/ItemPreview/ItemPreview";

const { width } = Dimensions.get("window");

export default function Equipment({ route }: any) {
  const [itemInfo, setItemInfo] = useState<any>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const {equipment, equipped} = route.params;
  const itemPreview = (index: number) => {
    const clickedItem = equipment[index];
    setSelectedIndex(index);
    setItemInfo(clickedItem);
  };

  const renderItem = ({ item, index }: any) => {
    let isEquipped = false;
    Object.values(equipped).find(equippedId =>{
      if (equippedId === item.id) {
        isEquipped = true;
      }
    })
    return (<EquipmentCeil
      key={index}
      index={index}
      image={item.image}
      quantity={item.quantity}
      onPress={itemPreview}
      isSelected={index === selectedIndex}
      isEquipped= {isEquipped}
    />)
  };

  const roundToFive = (num: number) => Math.ceil(num / 5) * 5;

  const emptyCells = Array.from(
    { length: roundToFive(equipment.length) - equipment.length },
    (_, index) => <View key={`empty-${index}`} style={eqStyles.ceil}></View>
  );

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={eqStyles.backgroundImage}
    >
      <View style={eqStyles.equipment}>
        <FlatList
          data={[...equipment, ...emptyCells]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={5}
        />
      </View>
      <ItemPreview itemInfo={itemInfo} tradeSucces={() => 'ok'} npcName={""}></ItemPreview>
    </ImageBackground>
  );
}

const eqStyles = StyleSheet.create({
  equipment: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: (width * 90.1) / 100,
    height: (width * 108) / 100,
    marginBottom: 50,
    marginTop: 100,
    marginLeft: (width * 5) / 100,
  },
  ceil: {
    width: (width * 18) / 100,
    height: (width * 18) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "grey",
    borderWidth: 1,
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
