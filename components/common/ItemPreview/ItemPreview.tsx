import { View, Text, Image } from "react-native";
import { text } from "../../../themes/fonts";
import TranscationButton from "../TranscationButton";
import {
  equipmentPreviewStyles,
  equipmentStyles,
} from "../../../themes/equipment";
import { ItemInfoPreview } from "./ItemInfoPreview";
import {
  additionalBonusTypes,
  damageTypes,
  defenseTypes,
  neededAttributes,
  restoreTypes,
} from "../../../types/itemDescription";

interface Props {
  itemInfo: any;
  npcName: string;
  transactionType?: string;
  tradeSucces: () => void;
  heroGold?: number;
  npcGold?: number;
}

export default function ItemPreview({
  itemInfo,
  npcName,
  tradeSucces,
  transactionType,
  heroGold,
  npcGold,
}: Props) {
  console.log(itemInfo);
  return (
    <>
      {itemInfo ? (
        <View style={equipmentPreviewStyles.container}>
          <Text style={[text.medium, equipmentPreviewStyles.title]}>
            {itemInfo.name}
          </Text>

          <View style={equipmentPreviewStyles.itemInfo}>
            {itemInfo.description && (
              <View style={equipmentPreviewStyles.infoLine}>
                <Text style={text.description}>{itemInfo.description}</Text>
              </View>
            )}
            <ItemInfoPreview data={itemInfo.damage} description={damageTypes} />
            <ItemInfoPreview
              data={itemInfo.attributes}
              description={neededAttributes}
            />
            <ItemInfoPreview
              data={itemInfo.additional}
              description={additionalBonusTypes}
            />
            <ItemInfoPreview
              data={itemInfo.defense}
              description={defenseTypes}
            />
            <ItemInfoPreview
              data={itemInfo.restore}
              description={restoreTypes}
            />
          </View>
          {transactionType && itemInfo.id !== 900 ? (
            <TranscationButton
              id={itemInfo.id}
              npcName={npcName}
              itemType={itemInfo.type}
              price={itemInfo.price}
              transactionType={transactionType}
              tradeSucces={tradeSucces}
              heroGold={heroGold}
              npcGold={npcGold}
            />
          ) : (
            <View style={[equipmentPreviewStyles.infoLine, { bottom: 0 }]}>
              <Text style={text.small}>Wartość: </Text>
              <Text style={text.small}>{itemInfo.price}</Text>
            </View>
          )}
          <Image
            source={{ uri: itemInfo.image }}
            style={equipmentPreviewStyles.image}
          />
        </View>
      ) : (
        <View style={equipmentPreviewStyles.container}></View>
      )}
    </>
  );
}
