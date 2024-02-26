import OpenAI from "openai";
import { API_KEY } from "../../../aiConfig";
import {
  ChatCompletion,
  ChatCompletionCreateParamsBase,
} from "openai/resources/chat/completions";

const parameters: ChatCompletionCreateParamsBase = {
  n: 1, // liczba odpowiedzi, nie zawsze działa
  top_p: 1, // im większe tym bardziej kreatywny, lepiej bawić się tylko temperaturą
  temperature: 1, // im większe tym bardziej kreatywny, nie zmieniać obu na raz
  max_tokens: 1000, // utnie odpowiedź jeśli się przekroczy tokeny
  stream: false, // podaje całą odpowiedź a nie po literce
  model: "gpt-4-1106-preview",
  messages: [],
  response_format: {type: 'json_object'}, // działa tylko w wersji '1106' w 3.5 i 4 chata gpt
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
    console.log(s ? JSON.parse(s) : null);
    return s ? JSON.parse(s) : null;
  }

  clear(): void {
    this.messages.splice(1);
  }

  get history() {
    return this.messages;
  }
}
