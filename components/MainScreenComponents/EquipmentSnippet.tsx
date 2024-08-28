import { BlurView } from "expo-blur";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigation";
import { EquipmentCeil } from "../common/EquipmentCeil";
const { width, height } = Dimensions.get("window");

interface Props {
  equipment: any;
  equipped: any;
}

export const EquipmentSnippet = ({ equipment, equipped }: Props) => {
 
  // console.log('eq' +equipment)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Equipment", {equipment, equipped})}>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={eqStyles.eqContainer}>
          {/* {equipment.map((item: any, index: any) => (
            <EquipmentCeil
              key={index}
              index={index}
              image={item.image}
              quantity={item.quantity}
            />
          ))} */}
          {Array.from({ length: 4 - equipment.length }, (value, index) => (
            <View key={index} style={eqStyles.ceil}></View>
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
    borderColor: 'gray', 
    borderWidth: 1,
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
