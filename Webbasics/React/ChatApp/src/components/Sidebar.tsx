import type { User } from "./MainPage.tsx";

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
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                  {user.user?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-lg font-medium text-gray-700">
                    {user.user}
                  </div>
                  <div className="text-xs text-gray-400">ID: {user.id}</div>
                </div>
              </div>

              <button
                onClick={() => handleChatClick(user.user)}
                aria-label={`Chat with ${user.user}`}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 text-white text-sm font-medium py-2 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M2 5.5A2.5 2.5 0 014.5 3h11A2.5 2.5 0 0118 5.5v5A2.5 2.5 0 0115.5 13H7l-4 3V5.5z" />
                </svg>
                <span>Chat</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No users found.</p>
      )}
    </aside>
  );
}
export default Sidebar;
