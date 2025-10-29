import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import { retriever } from '@ai-exam-technova/retriever';
import { standaloneQuestionTemplate, answerTemplate } from '@ai-exam-technova/templates';
import { combineDocuments } from '@ai-exam-technova/combinedocuments';
import { llm } from '@ai-exam-technova/llm';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

const memory = new BufferMemory({
    memoryKey : 'chat_history',
    returnMessages : true,
    inputKey : 'question'
});

const standaloneQuestionChain = RunnableSequence.from([
    standaloneQuestionTemplate,
    llm,
    new StringOutputParser()
]);

const retrieverChain = RunnableSequence.from([
    (data) => {
        return data.standaloneQuestion
    },
    retriever,
    combineDocuments
]);

const conversationChain = new ConversationChain({
    llm,
    prompt : answerTemplate,
    memory
});

export const chain = RunnableSequence.from([
    {
        standaloneQuestion : standaloneQuestionChain,
        originalQuestion : new RunnablePassthrough()
    },
    {
        context : retrieverChain,
        question : ({ originalQuestion }) => originalQuestion.question
    },
    conversationChain
]);