import { Image, Text, TouchableOpacity } from "react-native";
import { equipmentCeilStyles } from "../../themes/equipment";

interface Props {
  index: number;
  quantity: number;
  image: string;
  onPress?: (index: number) => void;
  isSelected?: boolean;
  isEquipped?: boolean;
}

export const EquipmentCeil = ({
  index,
  image,
  quantity,
  onPress,
  isSelected,
  isEquipped,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(index)}
      key={index}
      style={[
        equipmentCeilStyles.ceil, 
        isEquipped && equipmentCeilStyles.equippedCeil, 
        isSelected && equipmentCeilStyles.clickedCeil,
      ]}
    >
      <Image source={{ uri: image }} style={equipmentCeilStyles.image} />
      <Text style={equipmentCeilStyles.text}>
        {quantity == 1 ? "" : quantity}
      </Text>
    </TouchableOpacity>
  );
};
