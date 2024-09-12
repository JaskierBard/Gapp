import { ImageBackground, View, FlatList } from "react-native";
import { EquipmentCeil } from "../components/common/EquipmentCeil";
import { useState } from "react";
import ItemPreview from "../components/common/ItemPreview/ItemPreview";
import { equipmentStyles } from "../themes/equipment";
import { EquipmentEmptyCeil } from "../components/common/EquipmentEmptyCeil";
import EquipButton from "../components/common/EquipButton";

export default function Equipment({ route }: any) {
  const [itemInfo, setItemInfo] = useState<any>("");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { equipment, equipped } = route.params;

  const itemPreview = (index: number) => {
    if (index < equipment.length) {
      const clickedItem = equipment[index];
      setSelectedIndex(index);
      setItemInfo(clickedItem);
    } else {
      setSelectedIndex(null);
      setItemInfo("");
    }
  };

  const renderItem = ({ item, index }: any) => {
    let isEquipped = false;
    Object.values(equipped).find((equippedId) => {
      if (equippedId === item.id) {
        isEquipped = true;
      }
    });
    return (
      <EquipmentCeil
        key={index}
        index={index}
        image={item.image}
        quantity={item.quantity}
        onPress={itemPreview}
        isSelected={index === selectedIndex}
        isEquipped={isEquipped}
      />
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={equipmentStyles.backgroundImage}
    >
      <View style={equipmentStyles.equipment}>
        <FlatList
          data={[...equipment, ...EquipmentEmptyCeil(equipment.length, 30)]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={5}
        />
      </View>
      <ItemPreview
        itemInfo={itemInfo}
        tradeSucces={() => "ok"}
        npcName={""}
      ></ItemPreview>
      <EquipButton itemInfo={itemInfo} equipped={equipped} />
    </ImageBackground>
  );
}
