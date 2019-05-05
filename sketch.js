const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const BALL_RADIUS = 10;

const PADDLE_WIDTH = 30;
const PADDLE_HEIGHT = 10;
const PADDLE_VEL = 2;

let ball;
let paddle;

function setup() 
{
    ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, BALL_RADIUS);
    paddle = new Paddle(CANVAS_WIDTH / 2, 0.9 * CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);

    rectMode(CENTER);

    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() 
{
    if (keyIsDown(LEFT_ARROW))
    {
        console.log("left");
        paddle.moveLeft();
    }
    else if (keyIsDown(RIGHT_ARROW))
    {
        console.log("right");
        paddle.moveRight();
    }

    paddle.update();
    ball.update();

    background(150, 150, 255);
    paddle.show();
    ball.show();
}