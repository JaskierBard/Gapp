import { View, Text } from "react-native";
import { text } from "../../../themes/fonts";
import { equipmentPreviewStyles, equipmentStyles } from "../../../themes/equipment";

interface Props {
  data: { [key: string]: number };
  description: { [key: string]: string };
}

export const ItemInfoPreview = ({ data, description }: Props) => {
  if (!data) return null;

  return (
    <View>
      {Object.entries(description).map(
        ([key, value]) =>
          data[key] > 0 && (
            <View key={key} style={equipmentPreviewStyles.infoLine}>
              <Text style={text.small}>{value}</Text>
              <Text style={text.small}>{data[key]}</Text>
            </View>
          )
      )}
    </View>
  );
};
