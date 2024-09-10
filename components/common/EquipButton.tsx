import { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { manageEquipped } from "../../utils/fetchData";

interface Props {
  itemInfo: any;
  equipped: any;
}

export default function EquipButton({ itemInfo, equipped }: Props) {
  const [isEquipped, setIsEquipped] = useState<boolean>(false);

  useEffect(() => {
    const isItemEquipped = Object.values(equipped).some(
      (equippedId) => equippedId === itemInfo.id
    );
    setIsEquipped(isItemEquipped);
  }, [equipped, itemInfo]);

  return (
    <>
      {isEquipped ? (
        <TouchableOpacity onPress={()=> manageEquipped(itemInfo.id, itemInfo.type, 'unequip')} style={styles.button}>
          <Text>Zdejmij</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={()=> manageEquipped(itemInfo.id, itemInfo.type, 'equip')} style={styles.button}>
          <Text>Załóż</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 20,
    backgroundColor: "green",
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    width: "20%",
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "gray",
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    width: "60%",
    borderRadius: 5,
  },
});
