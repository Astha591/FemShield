import React, { useState } from "react";
import axios from "axios";

const ChatBox = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "bot",
      message: "Hello! 👋 I’m FemShield. Ask me anything about women’s health.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user message to the chat
    const newHistory = [...chatHistory, { sender: "user", message: userMessage }];
    setChatHistory(newHistory);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/chatbot", {
        user_message: userMessage,
      });
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          message: response.data.reply,
        },
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "bot",
          message: "Oops! Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      setUserMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto rounded-xl border p-4 bg-white shadow-sm">
      <div className="h-80 overflow-y-auto space-y-3 p-2">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-3 text-sm ${
                chat.sender === "user"
                  ? "bg-[#ef427c] text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {chat.message}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-bl-none rounded-xl p-3 text-sm">
              Typing...
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 mt-3">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ef427c]"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-[#ef427c] hover:bg-[#d93a6e] text-white rounded-full px-4 py-2 font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
