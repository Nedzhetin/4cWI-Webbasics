import { Engine } from "./Engine";

export class Car {
  private make: string;
  private model: string;

  constructor(
    make: string,
    model: string,
    private engine: Engine,
  ) {
    this.make = make;
    this.model = model;
  }

  getHorsepower(): number {
    return this.engine.getHorsepower();
  }

  getCarInfo(): string {
    return `${this.make} ${this.model}`;
  }
}
