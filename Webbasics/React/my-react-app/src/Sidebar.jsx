import CreateNewPerson from "./CreateNewPerson.jsx";
import { useState } from "react";

function Sidebar({ setShowCreateNewPerson }) {
  return (
    <div className=" fixed right-0 top-0 w-1/5 h-full border-2 ml-[20%] ">
      <ul className="flex flex-row space-x-24 p-4">
        <a href="" className="text-2xl hover:text-blue-500">
          Home
        </a>
        <a href="" className="text-2xl hover:text-blue-500">
          About
        </a>
        <a href="" className="text-2xl hover:text-blue-500">
          Contact
        </a>
      </ul>

      <div
        onClick={() => setShowCreateNewPerson(true)}
        className=" group flex items-center justify-center absolute w-full h-32 bg-white bottom-0 border-4 hover:cursor-pointer hover:bg-gray-100"
      >
        <p className="text-3xl group-hover:text-5xl transition-all duration-300">
          new Person
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
