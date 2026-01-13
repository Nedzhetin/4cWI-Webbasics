import React, { useState } from "react";

function ChatWindow({ selectedUser }: { selectedUser: string | null }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
  };

  return (
    <main className="flex-1 p-6">
      {selectedUser ? (
        <div className=" relative h-full w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Chatting with {selectedUser}
          </h2>
          {/* Chat messages and input would go here */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="h-16 w-3/4 absolute bottom-2 left-1/2 transform -translate-x-1/2 border border-gray-300 rounded-md p-2 text-2xl"
            />
          </form>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          Select a user to start chatting
        </div>
      )}
    </main>
  );
}

export default ChatWindow;
