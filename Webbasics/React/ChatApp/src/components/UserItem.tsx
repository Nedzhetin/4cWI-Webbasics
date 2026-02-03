import React, { useState } from "react";

interface Props {
  name: string;
  handleChatClick: (userName: string) => void;
  newMessageSeen: boolean;
}

export default function UserItem({
  name,
  handleChatClick,
  newMessageSeen,
}: Props) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div
      onClick={() => handleChatClick(name)}
      className={`relative flex items-center justify-between p-3 bg-gray-50 border border-gray-200 ${newMessageSeen ? "border-blue-500" : ""} rounded-lg hover:bg-gray-100 transition`}
    >
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
          {name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-lg font-medium text-gray-700">{name}</div>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            setMenuOpen((s) => !s);
          }}
          aria-expanded={menuOpen}
          aria-label="Open options"
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v.01M12 12v.01M12 18v.01"
            />
          </svg>
        </button>

        {menuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 z-10"
          >
            <button
              type="button"
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700"
            >
              View Profile
            </button>
            <button
              type="button"
              className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-red-600"
            >
              Remove from Friends
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
