import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase.ts";
import { auth } from "../firebase/firebase.ts";

interface Message {
  id: string;
  text: string;
  from: string;
  to: string | null;
  timestamp?: Timestamp | null;
}

function ChatWindow({ selectedUser }: { selectedUser: string | null }) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesCollection = collection(db, "messages");

  // 🔽 auto-scroll anchor
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentUser =
      auth.currentUser?.displayName || auth.currentUser?.email || null;

    if (!selectedUser || !currentUser) {
      setMessages([]);
      return;
    }

    const users = [selectedUser, currentUser].filter(Boolean) as string[];

    const q = query(messagesCollection, where("from", "in", users));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data() as Omit<Message, "id">;

        if (
          (data.from === selectedUser && data.to === currentUser) ||
          (data.from === currentUser && data.to === selectedUser)
        ) {
          msgs.push({ id: doc.id, ...data });
        }
      });

      msgs.sort((a, b) => {
        const ta = a.timestamp ? a.timestamp.toMillis() : 0;
        const tb = b.timestamp ? b.timestamp.toMillis() : 0;
        return ta - tb;
      });

      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // 🔥 AUTO-SCROLL WHEN MESSAGES CHANGE
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(messagesCollection, {
      text: newMessage,
      from:
        auth.currentUser?.displayName || auth.currentUser?.email || "Anonymous",
      to: selectedUser,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    // 🔒 page height locked
    <main className="flex-1 h-screen bg-gray-100 p-6 overflow-hidden">
      {selectedUser ? (
        <div className="h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Chatting with {selectedUser}
            </h2>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((message) => {
              const currentUser =
                auth.currentUser?.displayName || auth.currentUser?.email || "";
              const isMine = message.from === currentUser;

              return (
                <div
                  key={message.id}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed break-words ${
                      isMine
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <div className="text-[11px] font-medium text-gray-500 mb-1">
                      {message.from}
                    </div>

                    <div>{message.text}</div>

                    <div className="text-[10px] text-gray-400 mt-1 text-right select-none">
                      {message.timestamp
                        ? new Date(
                            message.timestamp.toMillis(),
                          ).toLocaleTimeString()
                        : ""}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 🔽 scroll target */}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <form
            onSubmit={handleSubmit}
            className="px-6 py-4 border-t border-gray-200 bg-white"
          >
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message…"
                className="flex-1 h-12 px-5 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-95 transition"
              >
                Send
              </button>
            </div>
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
