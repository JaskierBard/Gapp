import { useState } from "react";
import { View, Text, Dimensions, Image, StyleSheet } from "react-native";
import { text } from "../../themes/fonts";
import TranscationButton from "./TranscationButton";
const { width } = Dimensions.get("window");

interface Props {
  itemInfo: any;
  transactionType?: string
  tradeSucces: () => void;

}



export default function ItemPreview({ itemInfo,tradeSucces, transactionType }: Props) {



  return (
    <>
      {itemInfo ? (
        <View style={styles.container}>
          <Text style={[text.medium, styles.title]}>{itemInfo.name}</Text>
          {itemInfo.damage && (
            <View style={styles.infoLine}>
              <Text style={text.medium}>obrażenia:</Text>
              <Text style={text.medium}>{itemInfo.damage.cut}</Text>
            </View>
          )}

          <View style={[styles.infoLine]}>
            <Text style={text.medium}>Wartość: </Text>
            <Text style={text.medium}>{itemInfo.price}</Text>
          </View>
          {transactionType && <TranscationButton id={itemInfo.id} itemType={itemInfo.type} price={itemInfo.price} transactionType={transactionType} tradeSucces={tradeSucces}/>}
          <Image source={{ uri: itemInfo.image }} style={styles.image} />
        </View>
      ) : (
        <View style={styles.container}></View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: (width * 5) / 100,
    height: (width * 40) / 100,
    width: (width * 90.1) / 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "grey",
    borderWidth: 1,
    position: "relative",
  },
  image: {
    position: "absolute",
    resizeMode: "contain",
    width: 70,
    height: 70,
    right: 50,
    top: 50,
  },
  title: {
    textAlign: "center",
    paddingBottom: 10,
  },
  infoLine: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
