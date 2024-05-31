import { OpenAiChat } from "./AiMissions";
import characters from "./WorldDescription.json";
import aiGeneral from "./GeneralAI.json";
import { getMissions, getNPCClass } from "./functions/getClass";
import { param3, param3json, param4, param4json } from "./parametersOpenAi";
import { addOpression } from "../../../utils/firebase/firebaseNpc";
import { getDateToday, getTimeNow, getTimeOfDayMessage } from "../GetTimeNow";

const response = async (system: string, userInput: string) => {
  const chat = new OpenAiChat(system);
  const res = await chat.say(userInput, param4);
  return res;
};

export const fastResponse = async (
  userInput: string,
  track: string,
  mission?: string,
  lvlOpression?: number,
  selectedNpc?: string,
  NPCcharacter?: any,
  NPCdescription?: string
) => {
  console.log(track + ' track')
  const fightResult = "wygrał" // przegrał
  const timeOfDayMessage = getTimeOfDayMessage(aiGeneral.timeOfDay);
  // TODO: zapis aktualnej rozmowy i w chmurze zapis skrótu o czym była rozmowa wcześniej
  // TODO: głos w tle gdy wejdzie sie na dane miejsce, np. plac wisielców: herold uwaga uwaga
  //
  const defeatSystem = "Gracz " + fightResult + " w uczciwej walce, odnieś się do tego" //walka była dobra ale już się skończyła
  const assaultSystem = "Gracz podstępem cię zaatakował i " + fightResult + " jesteś zły" //wulgarne nastawienie, zgłoszenie do lorda Andre? Onara?
  //
  const defaultSystem =
    "Powiedz graczowi że jesteś zajęty i nie możesz teraz rozmawiać";
  const heySystem = `Wcielasz się w postać o imieniu ${selectedNpc}, Wynik ma być odpowiedzią na interakcję gracza. Odpowiedz bardzo krótko biorąc pod uwagę swój charakter:${NPCcharacter} oraz opis postaci w którą się wcielasz: ${NPCdescription}. Weź również pod uwagę obecne fakty: 1,${timeOfDayMessage}  2. Znacie się,3. Widzicie się dziś pierwszy raz, (Dane pokazują tylko jak masz sie zachować, nie włączaj ich do swojej wypowiedzi) Tych słów nie wolno ci używać:  ${aiGeneral.dictionary.avoid} A jeśli pasuje to używaj tych: ${aiGeneral.dictionary.old}. Zawsze zwracaj się jako postać w którą się wcielasz. Cały output ma być bardzo krótką wypowiedzią NPC w którego się wcielasz w 1 osobie.`;
  const rewardSystem =
  "Podziękuj krótko graczowi za wykonanie misji";
  const thanksSystem =
    "Podziękuj krótko graczowi za przyjęcie misji lub wyraź zrozumienie jeśli odmówi";
  const askSystem = `Zapytaj na jakim etapie jest gracz wykonujący misję. Podaję treść misji którą wcześniej zleciłeś graczowi: ${userInput} -nie wchódź w szczegóły misji. Twoją odpowiedzią ma być lekko rozbudowane pytanie`;
  const aboutSystem =
    aiGeneral.general.vaseline +
    `Opowiedz graczowi co u ciebie ale w zależności od tego jak często już gracz cię o to pytał odpowiadaj inaczej.  przedział to wartości od 0 do 10. Wartość '0' oznacza że gracz pyta po raz pierwszy dzisiejszego dnia, wartość '1' i więcej oznacza że pyta minimum 2 raz i możesz się zwracać do niego tak jakby już cie oto pytał ale nadal masz odpowiedzieć.  '5' to wartość graniczna i gracz cały czas zawraca ci głowę i masz go dosyć i możesz być w stosunku niego niemiły. Warość aktualna to: ${lvlOpression}. Nigdy nie podawaj wartości w odpowiedzi to bardzo ważne. Odpowiedźą ma być zdanie bazujące na podanej wartości`;
  switch (track) {
    case "thanks":
      return response(thanksSystem, userInput);
    case "about":
      return response(aboutSystem, userInput);
    case "mission":
      return mission;
      case "reward":
        return response(rewardSystem, userInput);
        case "ask":
      return response(askSystem, userInput);
    case "hey":
      // console.log(heySystem)
      return response(heySystem, userInput);
    
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
  // console.log(res3);

  return { name: name, message: res3 };
};

// planAI('todo')

export const aiDialogLinesCreator = async (
  todo: string,
  NPCname: string,
  aboutNPC: any,
  mission: any,
  conversationTrack: string | null
) => {
  const hasShop = true;
  const teacher: string | null = "łucznictwo lub skradanie się";

  const ile = [];
  const track: string[] = [];
  console.log(conversationTrack);
  if (conversationTrack===null || conversationTrack==='welcome') {
    mission.forEach((element: any, index: number) => {
      if (mission[index].isAccepted) {
        ile.push(
          "Zapytaj sie czy możecie porozmawiać na temat tej misji którą właśnie wykonujesz: " +
            element.mission
        );
        track.push("ask");
      } else {
        ile.push("Zapytaj się czy ma coś dla ciebie do pracy");
        track.push("mission");
      }
    });
    if (hasShop) {
      ile.push("Chcesz pohandlować");
      track.push("trade");
    }
    if (teacher) {
      ile.push("Zapytaj czego może cię nauczyć");
      track.push("learning");
    }
  } else if (conversationTrack === "ask") {
    ile.push("Wykonałeś zadanie");
    track.push("reward");
  }
 
  const chat = new OpenAiChat(
    `Jesteś najlepszym kreatorem dialogów do gier RPG. Stwórz ${ile.length} bardzo krótkich zdanie/zdań jeśli to możliwe to może być nawet jedno lub kilka słów na dany temat, każde według wskazówki z tych danych: ${ile}  tak aby gracz mógł zdecydować w którym kierunku ma iść rozmowa.Rozmawiasz  właśnie z postacią o imieniu ${NPCname} który  ${aboutNPC.opis} Wypowiadaj się zawsze w pierwszej osobie jako bohater. Zdania oddziel znakiem & to bardzo ważne `
  );
  const res = await chat.say(todo, param4);
  const sentences: string[] = res.split("&");

  const jsonData = sentences.map((sentence, index) => ({
    text: sentence, // Zdanie wstawione w miejsce wypowiedzi
    action: async () => {
      return await fastResponse(sentence, track[index], mission[index].mission); // Działanie dla każdej wypowiedzi
    },
    track: track[index]
  }));
  return jsonData;

};
