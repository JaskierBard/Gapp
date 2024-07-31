import { BlurView } from "expo-blur";
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import { EquipmentSnippet } from "../components/MainScreenComponents/EquipmentSnippet";


const { width, height } = Dimensions.get("window");

export const MainScreen = () => {

  return (
    <ImageBackground
    source={require("../assets/images/background.jpg")}
    style={styles.backgroundImage}
  >
    <View style={styles.container}>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={styles.bigContainer}>
          <Text>Task</Text>
        </View>
      </BlurView>

      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={styles.smallContainer}>
          <Text>Task</Text>
        </View>
      </BlurView>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={styles.smallContainer}>
          <Text>Task</Text>
        </View>
      </BlurView>
      <EquipmentSnippet/>

      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={styles.smallContainer}>
          <Text>Bezimienny</Text>
          <Text>poziom 22</Text>

          <Text>stany:</Text>
          <Text>upojenie alkoholowe</Text>
          <Text>przerażenie</Text>
        </View>
      </BlurView>
      <View style={styles.bigContainer}>
        <Image
          source={require("../assets/images/khorinis.png")}
          style={styles.backgroundPicture}
        />
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          tint="light"
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

export const eqStyles = StyleSheet.create({
  eqContainer: {
    
    height: (height * 20) / 100,
    width: (width * 44) / 100,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 3,

  },
  itemContainer: {
    backgroundColor: "red",
    height: "43%",
    width: "43%",
    margin:5,
    borderRadius: 10,
  },
});

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
    // right: 0,
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
