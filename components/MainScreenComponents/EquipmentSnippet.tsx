import { BlurView } from "expo-blur";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigation";
import { EquipmentCeil } from "../common/EquipmentCeil";
const { width, height } = Dimensions.get("window");

export const EquipmentSnippet = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const items = Array.from({ length: 4 }, (_, index) => index);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Equipment")}>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={eqStyles.eqContainer}>
          {items.map((item, index) => (
            <EquipmentCeil key={index} index={index} character={""} />
          ))}
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  blurContainer: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "transparent",
    overflow: "hidden",
  },

});

export const eqStyles = StyleSheet.create({
    eqContainer: {
      
      height: (height * 20) / 100,
      width: (width * 44) / 100,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
  
    },
    itemContainer: {
      backgroundColor: "red",
      height: "43%",
      width: "43%",
      margin:5,
      borderRadius: 10,
    },
  });