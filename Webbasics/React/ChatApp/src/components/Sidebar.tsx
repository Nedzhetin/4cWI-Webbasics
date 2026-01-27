import type { User } from "./MainPage.tsx";
import { auth } from "../firebase/firebase.ts";
import UserItem from "./UserItem.tsx";

function Sidebar({
  users,
  handleChatClick,
}: {
  users: User[];
  handleChatClick: (userName: string) => void;
}) {
  return (
    <aside className="w-80 h-screen bg-white shadow-lg rounded-r-xl p-4 overflow-y-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>

      {users.length > 0 ? (
        <div className="space-y-3">
          {users.map(
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
    </aside>
  );
}
export default Sidebar;
