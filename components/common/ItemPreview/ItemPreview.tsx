import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import { text } from "../../../themes/fonts";
import TranscationButton from "../TranscationButton";
import { equipmentStyles } from "../../../themes/equipment";
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
        <View style={equipmentStyles.container}>
          <Text style={[text.medium, equipmentStyles.title]}>
            {itemInfo.name}
          </Text>

          <View style={equipmentStyles.itemInfo}>
            {itemInfo.description && (
              <View style={equipmentStyles.infoLine}>
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
          <View style={[equipmentStyles.infoLine, { bottom: 0 }]}>
            <Text style={text.small}>Wartość: </Text>
            <Text style={text.small}>{itemInfo.price}</Text>
          </View>
          {transactionType && itemInfo.id !== 900 && (
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
          )}
          <Image
            source={{ uri: itemInfo.image }}
            style={equipmentStyles.image}
          />
        </View>
      ) : (
        <View style={equipmentStyles.container}></View>
      )}
    </>
  );
}
