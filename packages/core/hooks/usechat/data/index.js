import { useState, useRef } from 'react';
import { chain } from '@ai-exam-technova/chains';

// Egen hook som hanterar logiken för chatten
export const useChatLogic = () => {
    // messages lagrar alla meddelanden i chatten
    // Startar med ett fördefinierat välkomstmeddelande
    const [messages, setMessages] = useState([
        {
            role: 'TechNovas AI-assistent',
            text: 'Hej och välkommen till TechNovas digitala AI-assistent. Jag svarar på frågor som du som konsument kan ha före och efter ett köp. Jag kan inte hantera personliga ärenden så skriv inga personuppgifter till mig.'
        }
    ]);

    // loading visar om AI:n just nu bearbetar en fråga
    const [loading, setLoading] = useState(false);

    // inputRef används för att nå input-fältet direkt (utan state)
    const inputRef = useRef();

    // Hanterar när användaren skickar in sin fråga
    const handleSubmit = async (e) => {
        e.preventDefault();

        const question = inputRef.current.value;
        if (!question.trim()) return;

        setLoading(true);

        // lägger till användarens fråga i chatten
        setMessages((prev) => [...prev, { text: question, role: 'user' }]);
        inputRef.current.value = '';

        // skickar frågan till AI-kedjan och väntar på svar
        const answer = await chain.invoke({ question });

        // lägger till AI:ns svar i chatten
        // visar "Ingen respons." om inget svar kommer
        setMessages((prev) => [
            ...prev,
            { role: 'TechNovas AI-assistent', text: answer.response || 'Ingen respons.' },
        ]);

        // AI:n är klar
        setLoading(false);
    };

    // Returnerar all data och funktioner som behövs för att använda chatten
    return { messages, loading, handleSubmit, inputRef };
};
