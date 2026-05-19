import { Actor } from "./actor";
import { ActorMovement } from "../ActorMovement";

export abstract class AbstractActor implements Actor {
  protected movement: ActorMovement;

  protected constructor(movement: ActorMovement) {
    this.movement = movement;
  }

  update(deltaTime: number): void {
    // forward movement update so movement state is kept in one place
    if (this.movement) {
      this.movement.update(deltaTime);
    }
  }

  abstract render(ctx: CanvasRenderingContext2D): void;
}
