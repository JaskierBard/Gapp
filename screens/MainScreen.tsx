import { BlurView } from "expo-blur";
import { View, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import { EquipmentSnippet } from "../components/MainScreenComponents/EquipmentSnippet";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { StatisticsSnippet } from "../components/MainScreenComponents/StatisticsSnipet";
import Dice from "../components/common/Dice";
import { MapSnippet } from "../components/MainScreenComponents/MapSnippet";
import { sortEquipment } from "../utils/equipment/sortEquipment";
import { getEquipmentBonuses } from "../utils/equipment/getEquipmentBonuses";

export interface Statistics {
  destination: object;
  parameters: {
    maxHitpoints: number;
    hitpoints: number;
    staminaPoints: number;
    manaPoints: number;
    healthPoints: number;
    maxManaPoints: number;
    maxHealthPoints: number;
    maxStaminaPoints: number;
  };
  missions: object;
  equipped: object;
  equipment: object;
}

const { width, height } = Dimensions.get("window");

export const MainScreen = () => {
  const [data, setData] = useState<Statistics | null>(null);
  const [equipment, setEquipment] = useState<any>(null);
  const [equippedBonuses, setEquippedBonuses] = useState<any>(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData("player/get");
        setData(data.statistic);
        const changedItemsValue = data.equipment.map((element: any) => {
          const heroItemValue = Math.ceil(element.price / 10);
          element.price = heroItemValue;
          return element;
        });
        setEquipment(sortEquipment(changedItemsValue));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (data !== null && equipment !== null) {
      setEquippedBonuses(getEquipmentBonuses(data.equipped, equipment))
    }
  }, [equipment]);

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={30}
          style={styles.blurContainer}
        >
          <View style={styles.bigContainer}>
            <Dice />
          </View>
        </BlurView>

        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={30}
          style={styles.blurContainer}
        >
          <View style={styles.smallContainer}>
            <Text>Task</Text>
          </View>
        </BlurView>
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={30}
          style={styles.blurContainer}
        >
          <View style={styles.smallContainer}>
            <Text>Task</Text>
          </View>
        </BlurView>
        {equipment && data ? (
          <EquipmentSnippet equipment={equipment} equipped={data.equipped} />
        ) : (
          <Text style={{ color: "white" }}>Ładowanie...</Text>
        )}
        {data ? (
          <StatisticsSnippet statistics={data} equipped={equippedBonuses} />
        ) : (
          <Text style={{ color: "white" }}>Ładowanie...</Text>
        )}
        {equipment && data ? (
          <MapSnippet equipment={equipment} equipped={data.equipped} />
        ) : (
          <Text style={{ color: "white" }}>Ładowanie...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover',
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    padding: 20,
    backgroundColor: "transparent", // Upewnij się, że tło jest przezroczyste, aby tło główne było widoczne
  },
  blurContainer: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "transparent", // Upewnij się, że tło jest przezroczyste
    borderColor: "gray",
    borderWidth: 1,
    overflow: "hidden",
  },
  blurMap: {
    // overflow: "hidden",
    width: "50%",

    // position: "absolute",
  },
  smallMapContainer: {
    height: (height * 20) / 100,
    width: (width * 90) / 100,
  },
  bigContainer: {
    height: (height * 20) / 100,
    width: (width * 90) / 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  smallContainer: {
    height: (height * 20) / 100,
    width: (width * 44) / 100,
    // marginBottom: 10,
  },
  backgroundPicture: {
    alignItems: "flex-end",
    position: "absolute", // pozwala na precyzyjne ustawienie
    left: -550, // przesunięcie w poziomie
    top: -550, // przesunięcie w pionie
    width: 1000, // szerokość obrazu
    height: 1000, // wysokość obrazu
  },
});
