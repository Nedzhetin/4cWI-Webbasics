import Card from "./Card.jsx";
import Person from "./Person.jsx";

function CardsMenu() {
  return (
    <main className="max-w-[1300px]  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 p-15 m-10 align-middle place-items-center">
      {/*<Card name="Card 1" isMale />*/}
      <Person />
    </main>
  );
}

export default CardsMenu;
