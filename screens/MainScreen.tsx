import { BlurView } from "expo-blur";
import { View, StyleSheet, Text, Image } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const MainScreen = () => {
  return (
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
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={eqStyles.eqContainer}>
          <View style={eqStyles.itemContainer}></View>
          <View style={eqStyles.itemContainer}></View>
          <View style={eqStyles.itemContainer}></View>
          <View style={eqStyles.itemContainer}></View>
        </View>
      </BlurView>
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
  );
};

const eqStyles = StyleSheet.create({
  eqContainer: {
    height: (height * 20) / 100,
    width: (width * 44) / 100,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
  },
  itemContainer: {
    backgroundColor: "red",
    height: "43%",
    width: "43%",
    margin:5,
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    width: (width * 100) / 100,
    height: (height * 100) / 100,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    // marginTop: 30,
  },
  blurContainer: {
    borderRadius: 15,
    marginBottom: 10,
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
    height: (width * 44) / 100,
    width: (width * 44) / 100,
    marginBottom: 10,
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
