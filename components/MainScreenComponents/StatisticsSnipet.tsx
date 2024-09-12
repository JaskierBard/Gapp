import { BlurView } from "expo-blur";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/Navigation";
import BarDisplay from "../common/BarDisplay";
import { Statistics } from "../../screens/MainScreen";
const { width, height } = Dimensions.get("window");

interface Props {
  statistics: Statistics;
  equipped: any
}

export const StatisticsSnippet = ({statistics, equipped}:Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Statistics", {statistics, equipped})}>
       <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
        style={styles.blurContainer}
      >
        <View style={styles.smallContainer}>
          <Text>Bezimienny</Text>
          <Text>poziom 22</Text>

          <Text>stany:</Text>
          <Text>upojenie alkoholowe</Text>
          <Text>przerażenie</Text>
          <View style={styles.barContainer}>
          <BarDisplay type={'hitpoints'} value={statistics.parameters.hitpoints} max={statistics.parameters.maxHitpoints} />
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom:10,
    alignItems: 'center',
  },
  blurContainer: {
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: "transparent",
    overflow: "hidden",
    borderColor: 'gray', 
    borderWidth: 1,
  },
  smallContainer: {
    height: (height * 20) / 100,
    width: (width * 44) / 100,
  },

});

