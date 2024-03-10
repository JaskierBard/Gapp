import { OpenAiChat } from "./AiMissions";
import characters from './WorldDescription.json';
import aiGeneral from "./GeneralAI.json";
import { getMissions, getNPCClass } from "./functions/getClass";
import { param3, param3json } from "./parametersOpenAi";



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

  //   const ask2 = 'otrzymasz klasę postaci, podaj imię postaci pasujące do podanej roli ' + data + "bardzo ważne jest aby wynikiem było samno imię";
  // const chat  = new OpenAiChat(ask)

  // const res = await chat.say('muszę pogadać z tatą', param3json);
  // console.log('res: ' +res.category)

  // const principal = getNPCClass(res.category);
  // console.log('npcClass: ' +principal)

  // const chat2  = new OpenAiChat(ask2)
  // const ask3 = "";

  // const chat3 = new OpenAiChat(ask3)
  console.log(getMissions('mag'))

  // const res2 = await chat2.say(principal, param3);

  //  console.log(res2)

};

// planAI('todo')

export const MissionAi = async (todo: string) => {
  //     const chat  = new OpenAiChat(aiProps.Bosper.aboutYou)
  //     const res = await chat.say(todo);
  //    console.log(res);
  //    return res;
};
