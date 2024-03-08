import OpenAI from "openai";
import { API_KEY } from "../../../aiConfig";
import {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from "openai/resources/chat/completions";
import { Completions } from "openai/resources";

const parameters: ChatCompletionCreateParamsBase = {
  temperature: 0.7,
  max_tokens: 1000,
  stream: false,
  model: "gpt-3.5-turbo-1106",
  messages: [],
  response_format: { type: 'json_object' },
};

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

  countPrice35 = (usage: any) => {
    const input = (usage?.prompt_tokens / 1000) * 0.001;
    const output =(usage?.completion_tokens / 1000) * 0.002;
    console.log('input: ' + ((input * 100).toFixed(4)) + ' centów')
    console.log('output: ' + ((output * 100).toFixed(4)) + ' centów')
  };

  async say(prompt: string): Promise<any | null> {
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
    
    const parsedResponse = s ? JSON.parse(s) : null;
    console.log(parsedResponse);
    if ('usage' in data) {
      const usageData = (data as ChatCompletion).usage;

      this.countPrice35(usageData)
    }
    return parsedResponse;
  }

  clear(): void {
    this.messages.splice(1);
  }

  get history() {
    return this.messages;
  }
}
