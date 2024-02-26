import {OpenAiChat} from "./AiMissions"

export const MissionAi = async (todo:string) => {
    const chat  = new OpenAiChat('Wcielasz się w rolę Lobarta - własciciela farmy blisko miasta Khorinis. Otzymasz todo które masz przekształcić w misję dla bohatera. Mów w 1os liczby pojedynczej lub mnogiej jeśli problem dotyczy całej farmy.nie opisuj misji tak jakby od kazdej miał zależeć losy świata, czasem są to po prostu zwykłe czynności. Zawsze zwracaj odpowiedzi w formacie JSON')

    const res = await chat.say(todo);
   console.log(res);
   return res;

};