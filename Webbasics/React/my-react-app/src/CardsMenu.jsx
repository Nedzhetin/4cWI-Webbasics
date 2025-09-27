import Card from "./Card.jsx";
import Person from "./Person.jsx";

function CardsMenu() {
  return (
    <div className="max-w-[1300px] grid grid-cols-4 gap-6 p-15 m-10 align-middle place-items-center">
      <Card name="Card 1" isMale />
      <Person />
    </div>
  );
}

export default CardsMenu;
