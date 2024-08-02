import { BlurView } from "expo-blur";
import { View, StyleSheet, Text, Image, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import { EquipmentSnippet } from "../components/MainScreenComponents/EquipmentSnippet";
import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { StatisticsSnippet } from "../components/MainScreenComponents/StatisticsSnipet";
import Dice from "../components/common/Dice";

export interface Statistics {
  destination: object;
  parameters: {
    staminaPoints: number;
    manaPoints: number;
    healthPoints: number;
    maxManaPoints: number;
    maxHealthPoints: number;
    maxStaminaPoints: number;
  };
  missions: object;
  equipment: object;
}

const { width, height } = Dimensions.get("window");

export const MainScreen = () => {
  const [data, setData] = useState<Statistics|null>(null)
  const [equipment, setEquipment] = useState<any>(null)

  
  useEffect(() =>{
    (async () => {
      try {
        const data = await fetchData('player/get');
        // console.log(data.statistic);
        setData(data.statistic);
        setEquipment(data.equipment);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  },[])

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
          <Dice/>
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
      {equipment ? <EquipmentSnippet equipment={equipment} /> : <Text style={{color: 'white'}}>Ładowanie...</Text>}
      {data ? <StatisticsSnippet statistics={data} /> : <Text style={{color: 'white'}}>Ładowanie...</Text>}


     
      <View style={styles.bigContainer}>
        <Image
          source={require("../assets/images/khorinis.png")}
          style={styles.backgroundPicture}
        />
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={30}
          style={styles.blurMap}
        >
          <View style={styles.smallMapContainer}>
            <Text>Khorinis</Text>
            <Text>Dolne Miasto</Text>
            <Text></Text>
            <Text>deszczowo</Text>
            <Text>Późne popołudnie</Text>
            <Text>zagrożenie - niskie</Text>
          </View>
        </BlurView>
      </View>
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
    width: '100%',
    height: '100%',
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    padding: 20,
    backgroundColor: 'transparent', // Upewnij się, że tło jest przezroczyste, aby tło główne było widoczne
  },
  blurContainer: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: 'transparent', // Upewnij się, że tło jest przezroczyste
    borderColor: 'gray', 
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
