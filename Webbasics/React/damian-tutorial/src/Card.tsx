import { useState } from "react";

function Card({}) {
  let [count, setCount] = useState<number>(0);
  let words: string[] = ["Hallo", "Welt", "!", "Wie", "gehts?"];

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      {count > 5 && <h1>Groß</h1>}
      {words.map((word, index) => (
        <>
          <p key={index}>{word}</p>
          <p>{index}</p>
          {index >= 2 && <p>schön</p>}
        </>
      ))}
    </div>
  );
}

export default Card;
