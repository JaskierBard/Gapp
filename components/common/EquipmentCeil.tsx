import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
const { width } = Dimensions.get("window");

interface Props {
  index: number;
  quantity: number;
  image: string;
  onPress?: (index: number) => void;
  isSelected?: boolean;
}

export const EquipmentCeil = ({ index, image, quantity, onPress, isSelected }: Props) => {
  // console.log(isSelected)
  return (
    <TouchableOpacity onPress={() => onPress && onPress(index)} key={index} style={isSelected ? styles.clickedCeil : styles.ceil}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{quantity == 1 ? "" : quantity}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ceil: {
    width: (width * 18) / 100, //
    height: (width * 18) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderColor: "grey",
    borderWidth: 1,
    overflow: "hidden",
  },
  clickedCeil: {
    width: (width * 18) / 100, //
    height: (width * 18) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderColor: "blue",
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    resizeMode: "contain",
    width: 70,
    height: 70,
  },
  text: {
    position: "absolute",
    color: "white",
    bottom: 2,
    right: 2,
  },
});
