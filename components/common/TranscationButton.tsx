import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchData, transactionData } from "../../api/fetchData";

interface Props {
  id: string;
  price: number;
  itemType: string;
  transactionType?: string;
  tradeSucces: () => void;
}

export default function TransactionButton({
  id,
  itemType,
  price,
  transactionType,
  tradeSucces
}: Props) {
  const [confirm, setConfirm] = useState(false);

  const confirmTransaction = () => {
    setConfirm(true);
    setTimeout(() => {
      setConfirm(false);
    }, 2000);
  };

  const completeTransaction = async () => {
    transactionData(
      id,
      itemType,
      "pc_rockefeller",
      "Bosper",
      transactionType
    ).then((response: any) => {
      console.log("Server response:", response);
    });
    tradeSucces();

  };
  return (
    <>
      {!confirm ? (
        <View style={styles.button}>
          <TouchableOpacity onPress={() => confirmTransaction()}>
            <Text style={{ color: "white" }}>
              {transactionType == "buy" ? "Kup" : "Sprzedaj"} za:
              {transactionType == "buy" ? price : price / 10}sz. złota
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.timeButton}>
          <TouchableOpacity onPress={() => completeTransaction()}>
            <Text style={{ color: "white" }}>Na pewno?</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    width: "50%",
    borderRadius: 5,
  },
  timeButton: {
    backgroundColor: "brown",
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    width: "50%",
    borderRadius: 5,
  },
});
