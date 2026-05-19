import { MovementType } from "./Actors/MovementTypes.js";

export class ActorMovement {
  private speedX: number = 0;
  private speedY: number = 0;
  private movementType: MovementType;

  constructor(
    speedX: number = 0,
    speedY: number = 0,
    movementType: MovementType = MovementType.Random,
  ) {
    this.speedX = speedX;
    this.speedY = speedY;
    this.movementType = movementType;

    // Immer initialisieren, nicht nur wenn 0
    switch (movementType) {
      case MovementType.Left:
        this.speedX = -(Math.abs(speedX) || 60);
        this.speedY = 0;
        break;
      case MovementType.Right:
        this.speedX = Math.abs(speedX) || 60;
        this.speedY = 0;
        break;
      case MovementType.Up:
        this.speedY = -(Math.abs(speedY) || 60);
        this.speedX = 0;
        break;
      case MovementType.Down:
        this.speedY = Math.abs(speedY) || 60;
        this.speedX = 0;
        break;
      case MovementType.Random:
        if (speedX === 0 && speedY === 0) this.randomize();
        break;
    }
  }

  update(_deltaTime: number): void {
    // Nur beim ersten Mal initialisieren (wenn speedX/Y noch 0 sind)
    switch (this.movementType) {
      case MovementType.Left:
        if (this.speedX === 0 && this.speedY === 0) {
          this.speedX = -60;
          this.speedY = 0;
        }
        break;
      case MovementType.Right:
        if (this.speedX === 0 && this.speedY === 0) {
          this.speedX = 60;
          this.speedY = 0;
        }
        break;
      case MovementType.Up:
        if (this.speedX === 0 && this.speedY === 0) {
          this.speedX = 0;
          this.speedY = -60;
        }
        break;
      case MovementType.Down:
        if (this.speedX === 0 && this.speedY === 0) {
          this.speedX = 0;
          this.speedY = 60;
        }
        break;
      case MovementType.Random:
      default:
        break;
    }
  }

  private randomize(): void {
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;
    // moderate speeds so actors wander smoothly
    this.speedX = rand(-80, 80);
    this.speedY = rand(-80, 80);
  }

  public getSpeedX(): number {
    return this.speedX;
  }

  public getSpeedY(): number {
    return this.speedY;
  }

  public setSpeedX(v: number): void {
    this.speedX = v;
  }

  public setSpeedY(v: number): void {
    this.speedY = v;
  }

  public invertSpeedX(): void {
    this.speedX = -this.speedX;
  }

  public invertSpeedY(): void {
    this.speedY = -this.speedY;
  }
}
