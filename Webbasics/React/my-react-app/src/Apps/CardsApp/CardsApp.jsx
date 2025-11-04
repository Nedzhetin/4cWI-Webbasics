import CardsMenu from "./CardsMenu.jsx";
import Sidebar from "./Sidebar.jsx";
import { useState } from "react";
import CreateNewPerson from "./CreateNewPerson.jsx";

function App() {
  const [showCreateNewPerson, setShowCreateNewPerson] = useState(false);
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6 overflow-y-auto">
        <CardsMenu />
      </div>
      <div className="w-1/5 h-full border-l-2">
        <Sidebar setShowCreateNewPerson={setShowCreateNewPerson} />
      </div>
      {showCreateNewPerson && (
        <CreateNewPerson setShowCreateNewPerson={setShowCreateNewPerson} />
      )}
    </div>
  );
}

export default App;
