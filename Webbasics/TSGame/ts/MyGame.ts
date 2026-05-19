// MyGame - Example implementation of Game interface
import { Game, GameFramework } from "./GameFramework.js";
import { Actor } from "./Actors/actor.js";
import { Rectangle } from "./Actors/Rectangle.js";
import { Circle } from "./Actors/Circle.js";
import { MovementType } from "./Actors/MovementTypes.js";

class MyGame extends Game {
  private actors: Actor[] = [];

  init(): void {
    console.log("Game started!");
    for (let i = 0; i < 5; i++) {
      this.actors.push(
        new Circle(
          Math.random() * 700 + 50,
          Math.random() * 500 + 50,
          20,
          0,
          0,
          "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
          MovementType.Up,
        ),
      );
    }

    for (let i = 0; i < 5; i++) {
      this.actors.push(
        new Rectangle(
          Math.random() * 700 + 50,
          Math.random() * 500 + 50,
          40,
          40,
          0,
          0,
          "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
          MovementType.Left,
        ),
      );
    }
  }

  update(deltaTime: number): void {
    this.actors.forEach((actor) => actor.update(deltaTime));
    this.resolveCollisions();
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.actors.forEach((actor) => actor.render(ctx));
  }

  private resolveCollisions(): void {
    for (let i = 0; i < this.actors.length; i++) {
      for (let j = i + 1; j < this.actors.length; j++) {
        const a = this.actors[i];
        const b = this.actors[j];

        if (a instanceof Circle && b instanceof Circle) {
          this.resolveCircleCircle(a, b);
        } else if (a instanceof Rectangle && b instanceof Rectangle) {
          this.resolveRectRect(a, b);
        } else {
          const circle = (a instanceof Circle ? a : b) as Circle;
          const rect = (a instanceof Rectangle ? a : b) as Rectangle;
          this.resolveCircleRect(circle, rect);
        }
      }
    }
  }

  private resolveCircleCircle(a: Circle, b: Circle): void {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = a.radius + b.radius;

    if (dist === 0 || dist >= minDist) return;

    const nx = dx / dist;
    const ny = dy / dist;

    // Push circles apart so they no longer overlap
    const overlap = minDist - dist;
    a.x -= (nx * overlap) / 2;
    a.y -= (ny * overlap) / 2;
    b.x += (nx * overlap) / 2;
    b.y += (ny * overlap) / 2;

    // Reflect velocity components along the collision normal
    const dvx = b.speedX - a.speedX;
    const dvy = b.speedY - a.speedY;
    const dot = dvx * nx + dvy * ny;

    if (dot >= 0) return; // Already separating

    a.speedX += dot * nx;
    a.speedY += dot * ny;
    b.speedX -= dot * nx;
    b.speedY -= dot * ny;
  }

  private resolveRectRect(a: Rectangle, b: Rectangle): void {
    const aRight = a.x + a.width;
    const aBottom = a.y + a.height;
    const bRight = b.x + b.width;
    const bBottom = b.y + b.height;

    if (aRight <= b.x || bRight <= a.x || aBottom <= b.y || bBottom <= a.y)
      return;

    const overlapX = Math.min(aRight - b.x, bRight - a.x);
    const overlapY = Math.min(aBottom - b.y, bBottom - a.y);

    if (overlapX < overlapY) {
      // Resolve on X axis
      const sign = a.x < b.x ? -1 : 1;
      a.x += (sign * overlapX) / 2;
      b.x -= (sign * overlapX) / 2;
      [a.speedX, b.speedX] = [b.speedX, a.speedX];
    } else {
      // Resolve on Y axis
      const sign = a.y < b.y ? -1 : 1;
      a.y += (sign * overlapY) / 2;
      b.y -= (sign * overlapY) / 2;
      [a.speedY, b.speedY] = [b.speedY, a.speedY];
    }
  }

  private resolveCircleRect(circle: Circle, rect: Rectangle): void {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    const dx = circle.x - closestX;
    const dy = circle.y - closestY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist >= circle.radius) return;

    let nx: number;
    let ny: number;

    if (dist === 0) {
      const overlapLeft = circle.x - rect.x;
      const overlapRight = rect.x + rect.width - circle.x;
      const overlapTop = circle.y - rect.y;
      const overlapBottom = rect.y + rect.height - circle.y;
      const minOverlap = Math.min(
        overlapLeft,
        overlapRight,
        overlapTop,
        overlapBottom,
      );

      if (minOverlap === overlapLeft) {
        nx = -1;
        ny = 0;
      } else if (minOverlap === overlapRight) {
        nx = 1;
        ny = 0;
      } else if (minOverlap === overlapTop) {
        nx = 0;
        ny = -1;
      } else {
        nx = 0;
        ny = 1;
      }
    } else {
      nx = dx / dist;
      ny = dy / dist;
    }

    // Fully separate the two objects
    const overlap = circle.radius - dist;
    circle.x += (nx * overlap) / 2;
    circle.y += (ny * overlap) / 2;
    rect.x -= (nx * overlap) / 2;
    rect.y -= (ny * overlap) / 2;

    // Project each velocity onto the normal
    const circleNormal = circle.speedX * nx + circle.speedY * ny;
    const rectNormal = rect.speedX * nx + rect.speedY * ny;

    // Swap the normal components, keep tangential components untouched
    circle.speedX += (rectNormal - circleNormal) * nx;
    circle.speedY += (rectNormal - circleNormal) * ny;
    rect.speedX += (circleNormal - rectNormal) * nx;
    rect.speedY += (circleNormal - rectNormal) * ny;
  }
}

const game = new MyGame();
const framework = new GameFramework(game, 800, 600);
framework.start();
