import './index.css';
import { useEffect, useRef } from "react";
import { Loading } from "@ai-exam-technova/loading";
import { Message } from "@ai-exam-technova/message";
import { useChatLogic } from "@ai-exam-technova/usechat";

export const Chat = () => {
  const { messages, loading, handleSubmit, inputRef } = useChatLogic();

  const messagesEndRef = useRef(null);

  const messageComponents = messages.map((message, index) => (
    <Message text={message.text} role={message.role} key={index} />
  ));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="wrapper">
      <img src="/logo.png" alt="Logo" />
      <section className="chat">
        <section className="chat__messages">
          {messageComponents}
          {loading && <Loading />}
          <div ref={messagesEndRef} />
        </section>

        <form className="chat__form" onSubmit={handleSubmit}>
          <input type="text" className="chat__input" ref={inputRef} />
          <button className="chat__btn">Skicka!</button>
        </form>
      </section>
    </section>
  );
};


