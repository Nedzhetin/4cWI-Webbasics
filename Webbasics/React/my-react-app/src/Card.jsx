function Card(props) {
  return (
    <div className="relative h-[400px] w-[300px] bg-blue-300 border-2 border-black">
      <div className="absoulte top-0 ">
        {props.isMale ? (
          <img src="/Male_Avatar.png" alt="Male_Avatar" />
        ) : (
          <img src="/Female_Avatar.png" alt="Female_Avatar" />
        )}
      </div>
      <div className="absolute bottom-0 flex justify-center items-center h-32 w-full bg-blue-400">
        <h1 className="text-xl">{props.name}</h1>
      </div>
    </div>
  );
}

export default Card;
