import type { User } from "./MainPage.tsx";
import { auth } from "../firebase/firebase.ts";
import UserItem from "./UserItem.tsx";
import { useState, useRef, useEffect } from "react";
import { TiUserAdd } from "react-icons/ti";

function Sidebar({
  friends,
  handleChatClick,
}: {
  friends: User[];
  handleChatClick: (userName: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, []);

  console.log("Current user photoURL:", auth.currentUser?.photoURL);
  return (
    <aside className="w-80 relative h-screen bg-white shadow-lg rounded-r-xl p-4 overflow-y-auto">
      <div className="relative w-full h-20  ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Friends</h2>
        <TiUserAdd className="absolute top-1 right-4 size-7 hover:scale-110" />
      </div>
      {friends.length > 0 ? (
        <div className="space-y-3">
          {friends.map(
            (user) =>
              user.name !== auth.currentUser?.displayName && (
                <UserItem
                  key={user.uid}
                  name={user.name}
                  handleChatClick={handleChatClick}
                  newMessageSeen={true}
                />
              ),
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No users found.</p>
      )}

      {/* Current user card fixed to bottom of the sidebar */}
      <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-200 rounded-r-xl">
        <div className="flex items-center gap-3">
          <img
            src={auth.currentUser?.photoURL || "/Male_Avatar.png"}
            alt={auth.currentUser?.displayName || "User avatar"}
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {auth.currentUser?.displayName || "You"}
            </p>
            <p className="text-xs text-gray-500">Online</p>
          </div>

          <div className="flex items-center gap-2">
            {/* three-dots menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((s) => !s)}
                aria-label="Open menu"
                className="p-2 rounded-full hover:bg-gray-100 text-gray-700"
              >
                {/* simple vertical ellipsis icon */}
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
                <div className="absolute right-0 bottom-12 bg-white border rounded-md shadow-lg w-40 py-1 z-20">
                  <button
                    onClick={() => {
                      const name = auth.currentUser?.displayName || "";
                      if (name) handleChatClick(name);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    New Chat
                  </button>
                  <button
                    onClick={() => {
                      auth.signOut();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
