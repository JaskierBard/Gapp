import { BlurView } from "expo-blur";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigation";
import { GetTimeNow } from "../common/GetTimeNow";
import { text } from "../../themes/fonts";

const { width, height } = Dimensions.get("window");

export const MapSnippet = ({equipment, equipped}:any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.bigContainer}>
      <Image
        source={require("../../assets/images/khorinis.webp")}
        style={styles.backgroundPicture}
      />
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
        style={styles.blurMap}
      >
        <TouchableOpacity
          // onPress={() => navigation.navigate("NpcList", {equipment, equipped})}
          onPress={() => navigation.navigate("Map")}

        >
          <View style={styles.smallMapContainer}>
            <Text style={text.medium}>Khorinis - Dolne Miasto </Text>
            <Text>{GetTimeNow()}</Text>
            <Text></Text>
            <Text>deszczowo</Text>
            <Text>Późne popołudnie</Text>
            <Text>zagrożenie - niskie</Text>
          </View>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "transparent",
    overflow: "hidden",
    borderColor: "gray",
    borderWidth: 1,
  },
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
    left: -250, // przesunięcie w poziomie
    top: -350, // przesunięcie w pionie
    width: 1000, // szerokość obrazu
    height: 1000, // wysokość obrazu
  },
});

export const eqStyles = StyleSheet.create({
  ceil: {
    width: (width * 18) / 100,
    height: (width * 18) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderColor: "grey",
    borderWidth: 1,
  },
  eqContainer: {
    height: (height * 20) / 100,
    width: (width * 44) / 100,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingTop: (height * 1) / 100,
  },
  // itemContainer: {
  //   backgroundColor: "red",
  //   height: "43%",
  //   width: "43%",
  //   margin: 5,
  //   borderRadius: 10,
  // },
});
