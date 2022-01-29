const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// CONSTANTS //
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const PI2 = Math.PI * 2;
const objectColor = '#0095DD';

const gameOverMessage = 'Game Over';

const bricks = [];
initializeBricks();

// VARIABLES //
let ball = new Ball(0, 0, 2, -2, ballRadius, objectColor);

let paddleX;

resetBallAndPaddle();

let score = 0;
let lives = 3;

let rightPressed = false;
let leftPressed = false;

// FUNCTIONS //
/* paints each brick, 2D array containing column d & r and x, y positions */
function initializeBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r += 1) {
      const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
      const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
      bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, objectColor);
    }
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = objectColor;
  ctx.fill();
  ctx.closePath();
}

/* looping through bricks drawn in array and displays */
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (bricks[c][r].status === 1) {
        brick.render(ctx);
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (ball.x > brick.x &&
          ball.x < brick.x + brickWidth &&
          ball.y > brick.y && ball.y < brick.y + brickHeight) {
          ball.dy = -ball.dy;
          brick.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('You Win! CONGRATULATIONS!');
            document.location.relaod();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillstyle = objectColor;
  ctx.fillText(`Score:  ${+score}`, 8, 20);
}

function resetBallAndPaddle() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = 3;
  ball.dy = -3;
  paddleX = paddleXStart;
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = objectColor;
  ctx.fillText(`Lives: ${+lives}`, canvas.width - 65, 20);
}

function moveBall() {
  ball.x += ball.dx; /* paints ball in new position every frame */
  ball.y += ball.dy; /* paints ball in new position every frame */
}

function movePaddle() {
  /* User paddle controls */
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

function canvasAndPaddleCollision() {
  /* RIGHT AND LEFT, includes game over */
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  /* TOP AND BOTTOM, includes game oveR */
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        resetBallAndPaddle();
      }
    }
  }
}

// LOOP
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); /* removes trail from canvas */
  drawBricks();
  ball.render(ctx);
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  moveBall();
  movePaddle();
  canvasAndPaddleCollision();

  requestAnimationFrame(draw);
}

// EVENT LISTENERS //
function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

// START PROG //
draw();
