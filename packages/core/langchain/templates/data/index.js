import { PromptTemplate, ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";

export const standaloneQuestionTemplate = PromptTemplate.fromTemplate(`
    Givet en fråga om TechNova, omformulera frågan till en standalone question som är tydlig och enkel att förstå.
    Fråga: {question},
    Standalone Question:
`);

export const answerTemplate = ChatPromptTemplate.fromMessages([
    [
        "system",
        `Du är en expert på Technova och deras FAQ och policydokument. Du svarar vänligt på frågorna från användaren och hänvisar alltid till vilken del av FAQ- och policydokumentet du har tagit informationen ifrån. Frågar kunden om något annat berättar du vänligt att du endast kan svara på frågor om Technova.`
    ],
    new MessagesPlaceholder('chat_history'),
    [
        "user",
        `Kontext: {context}
        Fråga: {question}
        Svar:`
    ]
]);