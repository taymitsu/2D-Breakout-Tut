<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gamedev Canvas Workshop</title>
    <style>
        * { padding: 0; margin: 0; }
        canvas { background: #eee; display: block; margin: 0 auto; }
    </style>
</head>
<body>
    <canvas id="myCanvas" width="480" height="320"> </canvas>
    
    <script>
        //////////////////////////////VARIABLES
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        var x = canvas.width/2;
        var y = canvas.height-30;
        var dx = 2;
        var dy = -2;
        var ballRadius = 10;
        var score = 0;
        //paddle control and creation
        var paddleHeight = 10;
        var paddleWidth = 75;
        var paddleX = (canvas.width-paddleWidth) / 2;
        var rightPressed = false;
        var leftPressed = false;
        //brick information
        var brickRowCount = 3;
        var brickColumnCount = 5;
        var brickWidth = 75;
        var brickHeight = 20;
        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 30;

        //lives for player
        var lives = 3;

        //paints each brick, 2D array containing column d & r and x, y positions 
        var bricks = [];
        for(var c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for(var r = 0; r < brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        //EVENT LISTENERS
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("mousemove", mouseMoveHandler, false);

        function keyDownHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = true;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if(e.key == "Right" || e.key == "ArrowRight") {
                rightPressed = false;
            }
            else if(e.key == "Left" || e.key == "ArrowLeft") {
                leftPressed = false;
            }
        }

        function mouseMoveHandler(e) {
            var relativeX = e.clientX - canvas.offsetLeft;
            if(relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth/2
            }
        }

        function collisionDetection() {
            for (var c = 0; c < brickColumnCount; c++) {
                for (var r = 0; r < brickRowCount; r++) {
                    var b = bricks[c][r];
                    if(b.status == 1) {
                        if (x >b.x && x < b.x + brickWidth && b.y && y < b.y + brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if (score == brickRowCount*brickColumnCount) {
                                alert("You Win! CONGRATULATIONS!");
                                document.location.relaod();
                                clearInterval(interval);
                            }
                        }
                    }
                }
            }
        }

        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillstyle = "#0095DD";
            ctx.fillText("Score: "+score, 8, 20);
        }

        function drawLives() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Lives: "+lives, canvas.width-65, 20);
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        //looping through bricks drawn in array and displays 
        function drawBricks() {
            for(var c = 0; c < brickColumnCount; c++) {
                for(var r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status == 1) {
                        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD"
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); //removes "trail from object"
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawScore();
            drawLives();
            collisionDetection();
            //RIGHT AND LEFT, includes game over 

            if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
                dx = -dx;
            }
            //TOP AND BOTTOM, includes game over 
            if(y + dy < ballRadius) {
                dy = -dy;
            }

            else if(y + dy > canvas.height-ballRadius) {
                if(x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                }
                else {
                    lives--;
                    if(!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    }
                    else {
                        x = canvas.width/2;
                        y = canvas.height-30;
                        dx = 3;
                        d = -3;
                        paddleX = (canvas.width-paddleWidth)/2;
                    }
                }
            }

            //User paddle controls
            if(rightPressed && paddleX < canvas.width-paddleWidth) {
                paddleX += 7;
            }
            else if(leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            x += dx; //paints ball in new position every frame 
            y += dy; //paints ball in new position every frame 
            requestAnimationFrame(draw);
        }

        draw();

    </script>
</body>
</html>