import { OpenAiChat } from "./AiMissions";
import characters from "./WorldDescription.json";
import aiGeneral from "./GeneralAI.json";
import { getMissions, getNPCClass } from "./functions/getClass";
import { param3, param3json, param4 } from "./parametersOpenAi";

const response = async (system: string, userInput: string) => {
  const chat = new OpenAiChat(system);
  const res = await chat.say(userInput, param3);
  return res;
};

export const fastResponse = async (userInput: string, option: string) => {
  const defaultSystem =
    "Powiedz graczowi że jesteś zajęty  i nie możesz teraz rozmawiać";
  const thanksSystem =
    "Podziękuj krótko graczowi za przyjęcie misji lub wyraź zrozumienie jeśli odmówi";
  const askSystem = `Zapytaj na jakim etapie jest gracz wykonujący misję. Podaję treść misji którą wcześniej zleciłeś graczowi: ${userInput} -nie wchódź w szczegóły misji. Twoją odpowiedzią ma być lekko rozbudowane pytanie`;
 const aboutSystem = 'Opowiedz graczowi co u ciebie'
  switch (option) {
    case "thanks":
      return response(thanksSystem, userInput);
    case "about":
      return response(aboutSystem, userInput);
    case "ask":
      return response(askSystem, userInput);
    default:
      return response(defaultSystem, userInput);
  }
};

export const shortTalkDown = async (missionsText: string) => {
  const system =
    "Otrzymasz opis zlecanej misji. Bazując na niej masz stworzyć krótkie zdanie do osoby która zleciła ci wykonanie tej misji aby o niej porozmawiać. W pytaniu zawrzyj krótką informację tak aby osoba wiedziała czego dotyczy misja";
  const chat = new OpenAiChat(system);
  const res = await chat.say(missionsText, param3);
  return res;
};

export const shortMissionAsk = async (missionsText: string) => {
  const system =
    "Jesteś bohaterem który przychodzi do npc i pyta go w jednym krótkim zdaniu zleceniodawce czy ma dla niego jakieś zadanie do wykonania";
  const chat = new OpenAiChat(system);
  const res = await chat.say(missionsText, param3);
  return res;
};

export const categoryAI = async (todo: string) => {
  const data: string[] = [];
  Object.keys(characters.npc).forEach((item) => {
    const npc = characters.npc[item as any];
    data.push(`${npc.name} - ${npc.role}`);
  });
  if (!todo) {
  } else {
    // info na f2 o braku
  }
  const data2: string[] = Object.keys(aiGeneral.missionCategories);

  const ask =
    aiGeneral.general.vaseline +
    aiGeneral.general.missionPlan +
    " kategorie: " +
    data2 +
    " uzupełnij:" +
    aiGeneral.general.missionPlanJSON;

  const chat = new OpenAiChat(ask);

  const res = await chat.say(todo, param3json);
  console.log("res: " + res.category);

  const principal = getNPCClass(res.category);
  console.log("npcClass: " + principal);

  const ask2 =
    "otrzymasz klasę postaci, podaj imię postaci pasujące do podanej roli " +
    data +
    "bardzo ważne jest aby wynikiem było samo imię";
  const chat2 = new OpenAiChat(ask2);

  const name = await chat2.say(principal, param3);

  const missions = getMissions(principal);

  console.log(name);

  const ask3 = `Wybierz pasującą kategorię misji spśród ${missions} od zleceniodawcy której zawodem jest ${principal} pasującej najbardziej do podanego przez użytkownika todo. Następnie stwórz z tych danych misję. Następnie wcielasz się w postać o imieniu" ${name}. I zleć misję bohaterowi. Odpowiedzią ma być sama wypowiedź zleceniodawcy do bohatera bez opisów i nie podawaj imienia zleceniodawcy`;

  const chat3 = new OpenAiChat(ask3);
  const res3 = await chat3.say(todo, param4);
  console.log(res3);

  return { name: name, message: res3 };
};

// planAI('todo')

export const MissionAi = async (todo: string) => {
  //     const chat  = new OpenAiChat(aiProps.Bosper.aboutYou)
  //     const res = await chat.say(todo);
  //    console.log(res);
  //    return res;
};
