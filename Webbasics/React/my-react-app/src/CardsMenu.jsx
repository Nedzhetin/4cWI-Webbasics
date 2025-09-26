import Card from "./Card.jsx";

function CardsMenu() {
  return (
    <div className="max-w-[1300px] grid grid-cols-4 gap-6 p-15 m-10 align-middle place-items-center">
      <Card name="Card 1" isMale />
      <Card name="Card 2" isMale={false} />
      <Card name="Card 3" isMale />
      <Card name="Card 4" isMale={false} />
      <Card name="Card 5" isMale />
      <Card name="Card 6" isMale={false} />
      <Card name="Card 7" isMale />
    </div>
  );
}

export default CardsMenu;
