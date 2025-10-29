import { ChatOllama } from '@langchain/ollama';
import { ConsoleCallbackHandler } from "langchain/callbacks";

export const llm = new ChatOllama({
    model : 'llama3.1:8b',
    temperature: 0,
    callbacks: [new ConsoleCallbackHandler()]
});