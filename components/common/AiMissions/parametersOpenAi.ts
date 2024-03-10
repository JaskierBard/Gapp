import {
    ChatCompletionCreateParamsBase,
  } from "openai/resources/chat/completions";

export const param3json: ChatCompletionCreateParamsBase = {
    temperature: 0.7,
    max_tokens: 1000,
    stream: false,
    model: "gpt-3.5-turbo-1106",
    messages: [],
    response_format: { type: 'json_object' },
  };

  export const param3: ChatCompletionCreateParamsBase = {
    temperature: 0.7,
    max_tokens: 1000,
    stream: false,
    model: "gpt-3.5-turbo-1106",
    messages: [],
  };

  export const param4: ChatCompletionCreateParamsBase = {
    temperature: 0.7,
    max_tokens: 1000,
    stream: false,
    model: "gpt-4-turbo-preview",
    messages: [],
  };