import { transactionType } from "../screens/TradeScreen";
import { sortEquipment } from "./equipment/sortEquipment";

interface Equipment {
  id: number;
  quantity: number;
}

export const updateEquipmentsAfterTransactions = (
  hero: Equipment[],
  merchant: Equipment[],
  itemInfo: any,
  transactionType: transactionType | undefined
) => {
  const manageBuyerEquipement = (equipments: Equipment[], itemInfo: any, ) => {
    const updatedGold = equipments.map((equipment) =>
      equipment.id === 900
        ? { ...equipment, quantity: equipment.quantity - itemInfo.price }
        : equipment
    );
    return sortEquipment([...updatedGold, itemInfo]);
  };
  const manageSellerEquipment = (equipments: Equipment[], itemInfo: any) => {
    const updatedGold = equipments.map((equipment) =>
      equipment.id === 900
        ? { ...equipment, quantity: equipment.quantity + itemInfo.price }
        : equipment
    );

    const result: any[] = Object.values(updatedGold).filter(
      (item: any) => item.id !== itemInfo.id
    );

    return sortEquipment(result);
  };

  switch (transactionType) {
    case "sell":
      return [
        manageSellerEquipment(hero, itemInfo),
        manageBuyerEquipement(merchant, itemInfo),
      ];

    case "buy":
      return [
        manageBuyerEquipement(hero, itemInfo),
        manageSellerEquipment(merchant, itemInfo),
      ];

    default:
      return [hero, merchant];
  }
};
