import { XMarkIcon } from "@heroicons/react/16/solid/index.js";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function CreateNewPerson({ setShowCreateNewPerson }) {
  let [isMale, setIsMale] = useState(false);

  function handleIsMale() {
    setIsMale(!isMale);
  }

  return (
    <div
      className="fixed top-1/2 left-1/2 h-2/5 w-1/6 bg-blue-300 border-2 border-black
                    transform -translate-x-1/2 -translate-y-1/2
                    flex flex-col justify-start items-center
                    "
    >
      <div className="relative top-0 w-full h-full">
        <img
          className="absolute w-fit h-fit"
          src={isMale ? "/Male_Avatar.png" : "/Female_Avatar.png"}
          alt={isMale ? "/Male_Avatar.png" : "/Female_Avatar.png"}
        />

        <button
          onClick={() => handleIsMale()}
          className="absolute z-10 bottom-32 right-0 text-xl text-white"
        >
          {isMale ? "Male" : "Female"}
        </button>
      </div>
      <input
        className="bg-blue-400 text-2xl text-center placeholder-black absolute bottom-0 h-32 w-full"
        placeholder="Name"
      />
      <button
        className="absolute top-0 left-0 m-1 p-3 text-2xl font-bold bg-red-400"
        onClick={() => setShowCreateNewPerson(false)}
      >
        <XMarkIcon className="h-6 w-6 text-black hover:text-red-500" />
      </button>
      <button
        className="absolute top-0 right-0 m-1 p-3 text-2xl font-bold bg-green-400"
        onClick={() => setShowCreateNewPerson(false)}
      >
        <CheckIcon className="h-6 w-6 text-black hover:text-green-500" />
      </button>
    </div>
  );
}

export default CreateNewPerson;
