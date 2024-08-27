import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  Text,
} from "react-native";
import { EquipmentCeil } from "../components/common/EquipmentCeil";
import { useEffect, useState } from "react";
import ItemPreview from "../components/common/EquipmentPreview";
import { fetchData } from "../utils/fetchData";
import { text } from "../themes/fonts";
import { sortEquipment } from "../utils/sortEquipment";
import { updateEquipmentsAfterTransactions } from "../utils/updateEquipmentsAfterTransactions";

const { width } = Dimensions.get("window");

export type transactionType = "sell" | "buy";

export default function TradeScreen({ route }: any) {
  const [NpcEquipment, setNpcEquipment] = useState<any>([]);
  const [playerEquipment, setPlayerEquipment] = useState<any>([]);

  const [itemInfo, setItemInfo] = useState<any>("");
  const [transactionType, setTransactionType] = useState<
    transactionType | undefined
  >(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const tradeSucces = () => {
    const [updatedPlayerEquipment, updatedNpcEquipment] = updateEquipmentsAfterTransactions(
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
        const data = await fetchData("player/get_npc");
        setNpcEquipment(sortEquipment(data.equipment));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    setPlayerEquipment(route.params);
  }, []);

  const itemPreview = (index: number, type: transactionType) => {
    const clickedItem =
      type == "sell" ? playerEquipment[index] : NpcEquipment[index];
    setTransactionType(type);
    setSelectedIndex(index);
    setItemInfo(clickedItem);
  };

  const renderItem = ({ item, index }: any, type: transactionType) => (
    <EquipmentCeil
      key={index}
      index={index}
      image={item.image}
      quantity={item.quantity}
      onPress={() => itemPreview(index, type)}
      isSelected={index === selectedIndex}
    />
  );

  const roundToFive = (num: number) => Math.ceil(num / 5) * 5;

  const emptyCells = Array.from(
    { length: roundToFive(playerEquipment.length) - playerEquipment.length },
    (_, index) => <View key={`empty-${index}`} style={eqStyles.ceil}></View>
  );

  const emptyCellsNpc = Array.from(
    { length: roundToFive(NpcEquipment.length) - NpcEquipment.length },
    (_, index) => <View key={`empty-${index}`} style={eqStyles.ceil}></View>
  );

  const emptyEqCells = Array.from({ length: 15 }, (_, index) => ({
    key: `empty-${index}`,
  }));

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={eqStyles.backgroundImage}
    >
      <View style={eqStyles.equipmentShort}>
        <Text style={text.medium}>
          Bosper złoto:{" "}
          {NpcEquipment.find((item: any) => item.id === 900)?.quantity}
        </Text>

        {NpcEquipment ? (
          <FlatList
            data={[...NpcEquipment, ...emptyCellsNpc]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(props) => renderItem(props, "buy")}
            numColumns={5}
          />
        ) : (
          <FlatList
            data={emptyEqCells}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => <View style={eqStyles.ceil}></View>}
            numColumns={5}
          />
        )}
      </View>
      <ItemPreview
        itemInfo={itemInfo}
        transactionType={transactionType}
        tradeSucces={tradeSucces}
      ></ItemPreview>

      <View style={eqStyles.equipmentShort}>
        <Text style={text.medium}>
          Bezimienny złoto:{" "}
          {playerEquipment.find((item: any) => item.id === 900)?.quantity}
        </Text>

        <FlatList
          data={[...playerEquipment, ...emptyCells]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(props) => renderItem(props, "sell")}
          numColumns={5}
        />
      </View>
    </ImageBackground>
  );
}

const eqStyles = StyleSheet.create({
  equipmentShort: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: (width * 90.1) / 100,
    height: (width * 54) / 100,
    marginBottom: 50,

    marginTop: 50,
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
