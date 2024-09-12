type DefenseValues = {
  arrow: number;
  fire: number;
  magic: number;
  weapon: number;
};
type DamageValues = { arrow: number; cut: number; hit: number; stab: number };
type ParametersValues = {
  maxHitpoints: number;
  maxMana: number;
  maxStamina: number;
  one_handed: number;
  two_handed: number;
  bow: number;
  crossbow: number;
  strength: number;
  dexterity: number;
};

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getEquipmentBonuses = (equipped: any, equipment: any) => {
  const bonuses: {
    damage: DamageValues;
    defense: DefenseValues;
    parameters: ParametersValues;
  } = {
    damage: { arrow: 0, cut: 0, hit: 0, stab: 0 },
    defense: { arrow: 0, fire: 0, magic: 0, weapon: 0 },
    parameters: { maxHitpoints: 0, maxMana: 0, maxStamina: 0, one_handed: 0, two_handed: 0, bow: 0, crossbow: 0, strength: 0, dexterity: 0},
  };

  const equippedIds = Object.values(equipped);
  const equippedItems: any = [];

  equipment.forEach((item: any) => {
    if (equippedIds.includes(item.id)) {
      equippedItems.push(item);
    }
  });

  equippedItems.forEach((item: any) => {
    if (item.defense) {
      Object.entries(item.defense).forEach(([key, value]: any) => {
        bonuses.defense[key as keyof DefenseValues] =
          (bonuses.defense[key as keyof DefenseValues] || 0) + value;
      });
    }
    if (item.damage) {
      Object.entries(item.damage).forEach(([key, value]: any) => {
        bonuses.damage[key as keyof DamageValues] =
          (bonuses.damage[key as keyof DamageValues] || 0) + value;
      });
    }
    if (item.parameters) {
        Object.entries(item.parameters).forEach(([key, value]: any) => {
            bonuses.parameters[key as keyof ParametersValues] =
              (bonuses.parameters[key as keyof ParametersValues] || 0) + value;
          });
    }

    if (item.bonusIf) {
      const capitalizedKey = capitalizeFirstLetter(
        Object.keys(item.bonusIf)[0]
      );
      equippedItems.forEach((element: any) => {
        if (capitalizedKey === element.name) {
          // console.log(item.bonusIf[element.name].defense)
          if (item.bonusIf[element.name].defense) {
            Object.entries(item.defense).forEach(([key, value]: any) => {
              bonuses.defense[key as keyof DefenseValues] =
                (bonuses.defense[key as keyof DefenseValues] || 0) + value;
            });
          }
          if (item.bonusIf[element.name].damage) {
            Object.entries(item.damage).forEach(([key, value]: any) => {
              bonuses.damage[key as keyof DamageValues] =
                (bonuses.damage[key as keyof DamageValues] || 0) + value;
            });
          }
        }
      });
    }
  });

  return bonuses;
};
