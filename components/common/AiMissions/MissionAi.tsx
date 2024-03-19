import { OpenAiChat } from "./AiMissions";
import characters from './WorldDescription.json';
import aiGeneral from "./GeneralAI.json";
import { getMissions, getNPCClass } from "./functions/getClass";
import { param3, param3json, param4 } from "./parametersOpenAi";



export const categoryAI = async (todo: string) => {
  const data: string[] = [];
  Object.keys(characters.npc).forEach(item => {
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

  const chat  = new OpenAiChat(ask)

  const res = await chat.say(todo, param3json);
  console.log('res: ' +res.category)

  const principal = getNPCClass(res.category);
  console.log('npcClass: ' +principal)


  const ask2 = 'otrzymasz klasę postaci, podaj imię postaci pasujące do podanej roli ' + data + "bardzo ważne jest aby wynikiem było samo imię";
  const chat2  = new OpenAiChat(ask2)
  

  const name = await chat2.say(principal, param3);
  
  const missions = getMissions(principal)

   console.log(name)

   const ask3 = `Wybierz pasującą kategorię misji spśród ${missions} od zleceniodawcy której zawodem jest ${principal} pasującej najbardziej do podanego przez użytkownika todo. Następnie stwórz z tych danych misję. Następnie wcielasz się w postać o imieniu" ${name}. I zleć misję bohaterowi. Odpowiedzią ma być sama wypowiedź zleceniodawcy do bohatera bez opisów i nie podawaj imienia zleceniodawcy`;

  const chat3 = new OpenAiChat(ask3)
  const res3 = await chat3.say(todo, param4);
  console.log(res3)


 return {name: name, message:res3}
};

// planAI('todo')

export const MissionAi = async (todo: string) => {
  //     const chat  = new OpenAiChat(aiProps.Bosper.aboutYou)
  //     const res = await chat.say(todo);
  //    console.log(res);
  //    return res;
};
