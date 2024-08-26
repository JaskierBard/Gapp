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
import { fetchData } from "../api/fetchData";
import { text } from "../themes/fonts";

const { width } = Dimensions.get("window");

export default function TradeScreen({ route }: any) {
  const [NpcEquipment, setNpcEquipment] = useState<any>("");
  const [playerEquipment, setPlayerEquipment] = useState<any>([]);

  const [itemInfo, setItemInfo] = useState<any>("");
  const [transactionType, setTransactionType] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const tradeSucces = () => {
    if (transactionType === "sell") {
      setNpcEquipment([...NpcEquipment, itemInfo]);
      const result: any[] = Object.values(playerEquipment).filter(
        (item: any) => {
          return item.id !== itemInfo.id;
        }
      );
      setPlayerEquipment(result);
    } else {
      setPlayerEquipment([...playerEquipment, itemInfo]);
      const result: any[] = Object.values(NpcEquipment).filter(
        (item: any) => {
          return item.id !== itemInfo.id;
        }
      );
      setNpcEquipment(result);
    }
    setItemInfo('')
    setSelectedIndex(null)
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData("player/get_npc");
        setNpcEquipment(data.equipment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    setPlayerEquipment(route.params);
  }, []);

  const itemPreview = (index: number, type: string) => {
    const clickedItem =
      type == "sell" ? playerEquipment[index] : NpcEquipment[index];
    setTransactionType(type);
    setSelectedIndex(index);
    setItemInfo(clickedItem);
  };

  const renderItem = ({ item, index }: any, type: "buy" | "sell") => (
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
        <Text style={text.medium}>Bosper</Text>

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
        <Text style={text.medium}>Bezimienny</Text>

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
