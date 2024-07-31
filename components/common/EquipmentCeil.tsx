import { View, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

interface Props {
  index: number;
  character: string;
}

export const EquipmentCeil = ({index}: Props) => {
  return <View key={index} style={styles.ceil}></View>;
};

const styles = StyleSheet.create({
  ceil: {
    width: (width * 18) / 100,
    height: (width * 18) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "grey",
    borderWidth: 1,
  },
});
