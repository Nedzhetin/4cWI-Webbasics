let sum = (a: number, b: number): number => a + b;
let randomNumber = (): number => Math.floor(Math.random() * (10 - 1) + 1);
let sub = (a: number, b: number): number => a - b;
let greet = (name: string): void => {
  console.log(`Hello, ${name}!`);
};

const animals: string[] = ["dog", "cat", "bird", "fish", "horse"];

const personList: { name: string; age: number }[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 10 },
  { name: "Charlie", age: 35 },
  { name: "David", age: 25 },
  { name: "Eve", age: 14 },
];

let over18 = personList.filter((person) => person.age > 18);

greet("Manasseh Luca");

let names = animals.map((animal) => animal.toUpperCase());
console.log(names);
console.log(over18);
console.log(sum(5, 10));
console.log(randomNumber());
console.log(sub(10, 5));
