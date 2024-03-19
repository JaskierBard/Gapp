import OpenAI from "openai";
import { API_KEY } from "../../../aiConfig";
import {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from "openai/resources/chat/completions";
import { Completions } from "openai/resources";
import { countPrice35 } from "./functions/getCosts";



const extractFirstChoiceText = (
  msg: OpenAI.Chat.Completions.ChatCompletion
): string | null => {
  return msg?.choices?.[0]?.message?.content ?? null;
};

export class OpenAiChat {
  private readonly openai = new OpenAI({
    apiKey: API_KEY,
  });
  private readonly messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
    [];

  constructor(system: string) {
    this.messages = [
      {
        role: "system",
        content: system,
      },
    ];
  }



  async say(prompt: string, parameters: ChatCompletionCreateParamsBase): Promise<any | null> {
    this.messages.push({
      role: "user",
      content: prompt,
    });

    const data = await this.openai.chat.completions.create({
      ...parameters,
      messages: this.messages,
    });

    const s = extractFirstChoiceText(data as ChatCompletion);

    if (s) {
      this.messages.push({
        role: "assistant",
        content: s,
      });
    }
    try {
      const parsedResponse = s ? JSON.parse(s) : null;
      // console.log(typeof(parsedResponse))
      return parsedResponse;

    } catch (err) {}
    
    if ('usage' in data) {
      const usageData = (data as ChatCompletion).usage;
      countPrice35(usageData)
    }
    // console.log(typeof(s))

    return s
  }

  clear(): void {
    this.messages.splice(1);
  }

  get history() {
    return this.messages;
  }
}
