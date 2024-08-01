import React from "react";
import { View, Image, StyleSheet, ImageBackground } from "react-native";

interface ProgressBarProps {
  type: "hitpoints" | "mana";
  value: number;
  max: number;
}

export const BarDisplay: React.FC<ProgressBarProps> = ({
  type,
  value,
  max,
}) => {
  const progress = Math.min(value / max, 1);

  const images = {
    hitpoints: {
      bar: require("../../../assets/images/bars/hp.png"),
      liquid: require("../../../assets/images/bars/liquid.png"),
    },
    mana: {
      bar: require("../../../assets/images/bars/mana.png"),
      liquid: require("../../../assets/images/bars/liquid_blue.png"),
    },
  };

  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={images[type].bar}
        style={styles.barImage}
        resizeMode="contain"
      >
        <View style={[styles.progress, { width: `${progress * 100}%` }]}>
          <Image source={images[type].liquid} style={styles.progressImage} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
  },
  barImage: {
    resizeMode: "contain",

    width: "100%",
    height: 20,
  },
  progress: {
    marginTop: 5,
    marginLeft: 10,
    position: "absolute",
    height: "100%",
  },
  progressImage: {
    height: "60%",
    width: "90%",
  },
});

export default BarDisplay;
