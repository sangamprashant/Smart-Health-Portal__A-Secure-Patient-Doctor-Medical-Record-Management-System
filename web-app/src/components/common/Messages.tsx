import React, { useEffect, useRef, useState } from "react";

const Messages = () => {
  const currentUser = "patient"; // change to "doctor" to test

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "doctor",
      text: "Hello, what seems to be the issue?",
      time: "10:00",
    },
    {
      id: 2,
      sender: "patient",
      text: "I have been having headaches for 2 days.",
      time: "10:02",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef<any>(null);

  // 🔥 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Send message
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: currentUser,
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl mx-auto border rounded">
      
      {/* Header */}
      <div className="p-3 border-b font-semibold bg-gray-100">
        Doctor Chat
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((msg) => {
          const isMe = msg.sender === currentUser;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg text-sm ${
                  isMe
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[10px] opacity-70 block text-right">
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;