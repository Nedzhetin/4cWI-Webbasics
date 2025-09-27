import { useState } from "react";

function Person() {
  let [personList, setPersonList] = useState([
    { name: "Alice", isMale: false },
    { name: "Bob", isMale: true },
    { name: "Charlie", isMale: true },
    { name: "Diana", isMale: false },
    { name: "Eve", isMale: false },
  ]);

  if (personList.length === 0) {
    return <h1>No persons found!</h1>;
  }

  return (
    <>
      {" "}
      {personList.map((person, index) => (
        <div
          key={index}
          className="relative h-[400px] w-[300px] bg-blue-300 border-2 border-black shadow-black"
        >
          <div className="absoulte top-0 ">
            {person.isMale ? (
              <img src="/Male_Avatar.png" alt="Male_Avatar" />
            ) : (
              <img src="/Female_Avatar.png" alt="Female_Avatar" />
            )}
          </div>
          <div
            key={index}
            className="absolute bottom-0 flex justify-center items-center h-[130px] w-full bg-blue-400 shadow-xl"
          >
            <h1 className="text-xl">{person.name}</h1>
          </div>
        </div>
      ))}
    </>
  );
}

export default Person;
