import React, { useState } from "react";
import ChatBot from "./ChatBot"; // Import your ChatBox component
import { MessageCircle } from "lucide-react"; // Install if needed: npm i lucide-react

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed bottom-6 right-6 bg-[#ef427c] rounded-full p-4 cursor-pointer hover:bg-[#d93a6e] shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="text-white" size={24} />
      </div>

      {/* Chat Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay background */}
          <div
            className="absolute inset-0 bg-gray-800 bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* ChatBox Modal */}
          <div className="relative bg-white rounded-2xl p-4 shadow-lg w-full max-w-sm">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <ChatBot />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
