import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const imageWidth = 800; 
const imageHeight = 627;

export const Map: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = savedX.value + e.translationX;
      translateY.value = savedY.value + e.translationY;
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((e) => {
      const nextScale = savedScale.value * e.scale;
      scale.value = Math.min(Math.max(nextScale, 1), 3);
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(translateX.value) },
      { translateY: withSpring(translateY.value) },
      { scale: withSpring(scale.value) },
    ],
  }));

  return (
    <ImageBackground
      source={require("../assets/images/wooden_bg.webp")}
      style={styles.container}
    >
      
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[animatedStyle]}>
          <Image
            source={require("../assets/images/khorinis.webp")}
            style={{ width: imageWidth, height: imageHeight }}
          />
        </Animated.View>
      </GestureDetector>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default Map;
