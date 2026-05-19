import { Actor } from "./actor";
import { ActorMovement } from "../ActorMovement.js";
import { MovementType } from "./MovementTypes";

export class Rectangle implements Actor {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public color: string = "#ff0000";
  private movement: ActorMovement;
  public movementType: MovementType;

  // expose speed properties that proxy to the internal ActorMovement
  public get speedX(): number {
    return this.movement.getSpeedX();
  }
  public set speedX(v: number) {
    this.movement.setSpeedX(v);
  }

  public get speedY(): number {
    return this.movement.getSpeedY();
  }
  public set speedY(v: number) {
    this.movement.setSpeedY(v);
  }

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    speedX: number = 0,
    speedY: number = 0,
    color: string = "#ff0000",
    movementType: MovementType,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.movementType = movementType;
    this.movement = new ActorMovement(speedX, speedY, this.movementType);
  }

  public update(deltaTime: number): void {
    this.movement.update(deltaTime);

    const sx = this.movement.getSpeedX();
    const sy = this.movement.getSpeedY();
    this.x += sx * deltaTime;
    this.y += sy * deltaTime;

    if (this.x < 0) {
      this.x = 0;
      this.movement.invertSpeedX();
    } else if (this.x + this.width > 800) {
      this.x = 800 - this.width;
      this.movement.invertSpeedX();
    }

    if (this.y < 0) {
      this.y = 0;
      this.movement.invertSpeedY();
    } else if (this.y + this.height > 600) {
      this.y = 600 - this.height;
      this.movement.invertSpeedY();
    }
  }

  public render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
