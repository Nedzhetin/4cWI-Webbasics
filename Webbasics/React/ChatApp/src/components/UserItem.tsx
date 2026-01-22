interface Props {
  name: string;
  handleChatClick: (userName: string) => void;
}

export default function UserItem({ name, handleChatClick }: Props) {
  return (
    <div
      onClick={() => handleChatClick(name)}
      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
    >
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
          {name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-lg font-medium text-gray-700">{name}</div>
        </div>
      </div>
    </div>
  );
}
