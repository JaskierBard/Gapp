import { View } from "react-native";
import { eqStyles } from "../MainScreenComponents/EquipmentSnippet";

const roundToFive = (num: number) => Math.ceil(num / 5) * 5;

export const EquipmentEmptyCeil = (equipmentLength: any, size: number) => {
  const emptyCells = Array.from(
    {
      length:
        equipmentLength < size
          ? size - equipmentLength
          : roundToFive(equipmentLength) - equipmentLength,
    },
    (_, index) => <View key={`empty-${index}`} style={eqStyles.ceil}></View>
  );

  return emptyCells;
};
