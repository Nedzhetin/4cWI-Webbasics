export interface Actor {
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
}
