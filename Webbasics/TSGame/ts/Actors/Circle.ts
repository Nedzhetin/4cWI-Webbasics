import {Actor} from "./actor";
import {MovementType} from "./MovementTypes.js";
import {ActorMovement} from "../ActorMovement.js";

export class Circle implements Actor {
    public x: number;
    public y: number;
    public radius: number;
    public color: string = "#00ff00";
    private movement: ActorMovement;
    public movementType: MovementType;

    // proxy speed properties to internal ActorMovement for external access
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
        radius: number,
        speedX: number = 0,
        speedY: number = 0,
        color: string = "#00ff00",
        movementType: MovementType,
    ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.movementType = movementType;
        this.movement = new ActorMovement(speedX, speedY, movementType);
    }

    public update(deltaTime: number): void {
        this.movement.update(deltaTime);

        const sx = this.movement.getSpeedX();
        const sy = this.movement.getSpeedY();
        this.x += sx * deltaTime;
        this.y += sy * deltaTime;

        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.movement.invertSpeedX();
        } else if (this.x + this.radius > 800) {
            this.x = 800 - this.radius;
            this.movement.invertSpeedX();
        }

        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.movement.invertSpeedY();
        } else if (this.y + this.radius > 600) {
            this.y = 600 - this.radius;
            this.movement.invertSpeedY();
        }
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}
