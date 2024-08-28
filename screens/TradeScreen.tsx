import { ImageBackground, View, FlatList, Text } from "react-native";
import { EquipmentCeil } from "../components/common/EquipmentCeil";
import { useEffect, useState } from "react";
import ItemPreview from "../components/common/ItemPreview/ItemPreview";
import { fetchData } from "../utils/fetchData";
import { text } from "../themes/fonts";
import { sortEquipment } from "../utils/equipment/sortEquipment";
import { updateEquipmentsAfterTransactions } from "../utils/equipment/updateEquipmentsAfterTransactions";
import { EquipmentEmptyCeil } from "../components/common/EquipmentEmptyCeil";
import { filterHiddenCells } from "../utils/equipment/filterHiddenCells";
import { equipmentStyles } from "../themes/equipment";

export type transactionType = "sell" | "buy";

export default function TradeScreen({ route }: any) {
  const [NpcEquipment, setNpcEquipment] = useState<any>([]);
  const [playerEquipment, setPlayerEquipment] = useState<any>([]);

  const [itemInfo, setItemInfo] = useState<any>("");
  const [transactionType, setTransactionType] = useState<
    transactionType | undefined
  >(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { equipment, equipped, item } = route.params;

  const tradeSucces = () => {
    const [updatedPlayerEquipment, updatedNpcEquipment] =
      updateEquipmentsAfterTransactions(
        playerEquipment,
        NpcEquipment,
        itemInfo,
        transactionType
      );

    setPlayerEquipment(updatedPlayerEquipment);
    setNpcEquipment(updatedNpcEquipment);
    setItemInfo("");
    setSelectedIndex(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData(`player/get_npc?npcName=${item}`);
        setNpcEquipment(sortEquipment(data.equipment));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    setPlayerEquipment(filterHiddenCells(equipment, equipped));
  }, []);

  const itemPreview = (index: number, type: transactionType) => {
    const clickedItem =
      type == "sell" ? playerEquipment[index] : NpcEquipment[index];
    setTransactionType(type);
    setSelectedIndex(index);
    setItemInfo(clickedItem);
  };

  const renderItem = ({ item, index }: any, type: transactionType) => {
    const isEquipped = Object.values(equipped).some(
      (equippedId) => equippedId === item.id
    );
    if (isEquipped) return null;

    return (
      <EquipmentCeil
        key={index}
        index={index}
        image={item.image}
        quantity={item.quantity}
        onPress={() => itemPreview(index, type)}
        isSelected={index === selectedIndex}
      />
    );
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={equipmentStyles.backgroundImage}
    >
      <View style={equipmentStyles.equipmentShort}>
        <Text style={text.medium}>
          Bosper złoto:{" "}
          {NpcEquipment.find((item: any) => item.id === 900)?.quantity}
        </Text>

        {NpcEquipment && (
          <FlatList
            data={[...NpcEquipment, ...EquipmentEmptyCeil(NpcEquipment.length, 15)]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(props) => renderItem(props, "buy")}
            numColumns={5}
          />
        )}
      </View>
      <ItemPreview
        itemInfo={itemInfo}
        npcName={item}
        transactionType={transactionType}
        tradeSucces={tradeSucces}
        heroGold={
          playerEquipment.find((item: any) => item.id === 900)?.quantity
        }
        npcGold={NpcEquipment.find((item: any) => item.id === 900)?.quantity}
      ></ItemPreview>

      <View style={equipmentStyles.equipmentShort}>
        <Text style={text.medium}>
          Bezimienny złoto:{" "}
          {playerEquipment.find((item: any) => item.id === 900)?.quantity}
        </Text>

        <FlatList
          data={[
            ...playerEquipment,
            ...EquipmentEmptyCeil(playerEquipment.length, 15),
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(props) => renderItem(props, "sell")}
          numColumns={5}
        />
      </View>
    </ImageBackground>
  );
}
