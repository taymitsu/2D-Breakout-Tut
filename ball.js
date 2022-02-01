class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -1, radius = 10, color = 'purple') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.PI2 = Math.PI * 2;
  }

  move() {
    this.x += this.dx; /* paints ball in new position every frame */
    this.y += this.dy; /* paints ball in new position every frame */
  }

  // dependency injection
  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
