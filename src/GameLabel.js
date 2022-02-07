import Sprite from './Sprite';

class GameLabel extends Sprite {
  constructor(text, x, y, color, font = '16px Arial') {
    super(x, y, 0, 0, color);

    this.text = text;
    this.value = 0;
    this.font = font;
  }

  // unique to gamelabel
  // override render method from Sprite
  render(ctx) {
    ctx.font = this.font;
    ctx.fillstyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

export default GameLabel;
