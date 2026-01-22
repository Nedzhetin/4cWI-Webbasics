import { auth } from "../firebase/firebase";
import type { Timestamp } from "firebase/firestore";

interface Props {
  text: string;
  from: string;
  timestamp?: Timestamp | null;
}

export default function MessageBubble({ text, from, timestamp }: Props) {
  const currentUser =
    auth.currentUser?.displayName || auth.currentUser?.email || "";
  const isMine = from === currentUser;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed break-words ${
          isMine
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        <div
          className={`text-[11px] font-medium ${isMine ? "text-gray-200" : "text-gray-500"} mb-1`}
        >
          {from}
        </div>

        <div>{text}</div>

        <div className="text-[10px] text-gray-400 mt-1 text-right select-none">
          {timestamp ? new Date(timestamp.toMillis()).toLocaleTimeString() : ""}
        </div>
      </div>
    </div>
  );
}
