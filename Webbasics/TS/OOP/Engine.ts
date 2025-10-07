export class Engine {
  constructor(
    private horsepower: number,
    private type: string,
  ) {}

  getHorsepower(): number {
    return this.horsepower;
  }
}
