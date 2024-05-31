import aiGeneral from "../GeneralAI.json";

const heroClass = [
  { farmer: 52 },
  { strażnik: 5 },
  { najemnik: 5 },
  { mag: 1 },
  { kowal: 11 },
  { myśliwy: 6 },
];
type MissionCategory = {
  [key: string]: any;
};

export function getNPCClass(category: any) {
  let best = "";
  let prev = 0;
  const data: any = aiGeneral.missionCategories;

  data[category].forEach((element: any) => {
    const matchingHero = heroClass.find(
      (hero) => Object.keys(hero)[0] === element
    );
    //   console.log(matchingHero)

    if (matchingHero) {
      const value = Object.values(matchingHero)[0];
      const name = Object.keys(matchingHero)[0];

      if (value >= prev) {
        prev = value;
        best = name;
      }
    }
  });

  return best;
}

export function getMissions(NPCclass: string) {
  const data: any = aiGeneral.missionCategorySupplement;

  const result: string = Object.keys(data[NPCclass])
    .map((key) => key)
    .join(", ");
  return result;
}
