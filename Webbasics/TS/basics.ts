let a: number = 10;
let b: number = 20;
let myName: string = "John Doe";
let names: string[] = ["Alice", "Bob", "Charlie"];
let isActive: boolean = true;
let data: object = { id: 1, value: "Sample" };

interface Person {
  name: string;
  age: number;
  isEmployed?: boolean;
}

let person: Person = {
  name: "Luca Hagspiel",
  age: 18,
  isEmployed: false,
};

console.log(person.name);

function add(x: number, y: number): number {
  return x + y;
}

function greet(name: string): string {
  return "Hello, " + name + "!";
}

console.log(greet(myName));

let result = add(a, b);
console.log(`The sum of ${a} and ${b} is ${result}`);
