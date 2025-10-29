import { useState, useRef } from 'react';
import { chain } from '@ai-exam-technova/chains';

export const useChatLogic = () => {
    const [messages, setMessages] = useState([
        {
            role: 'TechNovas AI-assistent',
            text: 'Hej och välkommen till TechNovas digitala AI-assistent. Jag svarar på frågor som du som konsument kan ha före och efter ett köp. Jag kan inte hantera personliga ärenden så skriv inga personuppgifter till mig.'
        }
    ]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const question = inputRef.current.value;
        if (!question.trim()) return;

        setLoading(true);

        setMessages((prev) => [...prev, { text: question, role: 'user' }]);
        inputRef.current.value = '';

        const answer = await chain.invoke({question});

        setMessages((prev) => [
            ...prev,
            { role: 'TechNovas AI-assistent', text: answer.response || 'Ingen respons.' },
        ]);

        setLoading(false);
    };

    return { messages, loading, handleSubmit, inputRef };
};
