import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchData, transactionData } from "../../utils/fetchData";

interface Props {
  id: string;
  price: number;
  itemType: string;
  transactionType?: string;
  tradeSucces: () => void;
  heroGold?: number;
  npcGold?: number;
}

export default function TransactionButton({
  id,
  itemType,
  price,
  transactionType,
  tradeSucces,
  heroGold,
  npcGold,
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
      price,
      transactionType
    ).then((response: any) => {
      console.log("Server response:", response);
    });
    tradeSucces();
  };
  return (
    <>
      {!confirm ? (
        <View >
          {transactionType === "buy" ? (
            heroGold && heroGold > price ? (
              <TouchableOpacity onPress={() => confirmTransaction()} style={styles.button}>
                <Text style={{ color: "white" }}>
                  Kup za: {price} sz. złota
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled style={styles.buttonDisabled}>
                <Text style={{ color: "white" }}>Masz za mało złota</Text>
              </TouchableOpacity>
            )
          ) : (
            npcGold && npcGold > price ? (
              <TouchableOpacity onPress={() => confirmTransaction()} style={styles.button}>
                <Text style={{ color: "white" }}>
                  Sprzedaj za: {price} sz. złota
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled style={styles.buttonDisabled}>
                <Text style={{ color: "white" }}>Kupiec ma mało złota</Text>
              </TouchableOpacity>
            )
          )}
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
  buttonDisabled: {
    backgroundColor: "gray",
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
