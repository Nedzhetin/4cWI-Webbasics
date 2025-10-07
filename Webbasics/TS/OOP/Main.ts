import { Car } from "./Car";
import { Engine } from "./Engine";

let engine: Engine = new Engine(200, "V6");
let car: Car = new Car("Toyota", "Camry", engine);

console.log(car.getCarInfo());
console.log(car.getHorsepower());
