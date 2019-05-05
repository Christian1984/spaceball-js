const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const BALL_RADIUS = 5;
const BALL_XVEL = 1.5;
const BALL_YVEL = 1;

const PADDLE_WIDTH = 30;
const PADDLE_HEIGHT = 10;
const PADDLE_VEL = 5;

let ball;
let paddle;

function setup() 
{
    paddle = new Paddle(CANVAS_WIDTH / 2, 0.9 * CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, BALL_XVEL, BALL_YVEL, BALL_RADIUS, paddle);

    rectMode(CENTER);
    ellipseMode(RADIUS);

    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() 
{
    if (keyIsDown(LEFT_ARROW))
    {
        paddle.moveLeft();
    }
    else if (keyIsDown(RIGHT_ARROW))
    {
        paddle.moveRight();
    }

    paddle.update();
    ball.update();

    background(150, 150, 255);
    paddle.show();
    ball.show();
}