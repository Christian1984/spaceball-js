const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const BALL_RADIUS = 5;
const BALL_XVEL = 1.5;
const BALL_YVEL = 1;

const PADDLE_WIDTH = 30;
const PADDLE_HEIGHT = 10;
const PADDLE_VEL = 5;

const TARGET_COLS = 10;
const TARGET_ROWS = 5;
const TARGET_HEIGHT = 10;

let ball;
let paddle;
let targets;

function setup() 
{
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    let tw = width / (TARGET_COLS + 2);
    let th = TARGET_HEIGHT;
    let o = 1.5 * tw;

    targets = [];

    for (let row = 0; row < TARGET_ROWS; row++)
    {
        for (let col = 0; col < TARGET_COLS; col++)
        {
            targets.push(new Target(col * tw + o, row * th + o, tw, th, { r: 0, g: 255, b: 0 }));
        }
    }

    paddle = new Paddle(CANVAS_WIDTH / 2, 0.9 * CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, BALL_XVEL, BALL_YVEL, BALL_RADIUS, paddle, targets);

    rectMode(CENTER);
    ellipseMode(RADIUS);
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

    background(150, 150, 255);

    paddle.update();
    paddle.show();

    ball.update();
    ball.show();

    for (let i = 0; i < targets.length; i++)
    {
        if (targets[i].alive)
        {
            targets[i].update();
            targets[i].show();
        }
    }
}