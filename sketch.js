const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const TEXT_SIZE = 12;

const CONTROLLER_SIZE = 80;

const BALL_RADIUS = 10;
const BALL_XVEL = 3;
const BALL_YVEL = 2;
const BALL_MAX_ANGLE_CHANGE = 0.5;
const BALL_MIN_SIN = 0.5;

const PADDLE_WIDTH = 60;
const PADDLE_HEIGHT = 20;
const PADDLE_VEL = 10;

const TARGET_COLS = 10;
const TARGET_ROWS = 5;
const TARGET_HEIGHT = 20;

let ball;
let paddle;
let targets;
let gameManager;
let controller;
let renderer;

function setup() 
{
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    controller = new GestureController();
    
    renderer = new Renderer();
    renderer.addShowable(controller);

    let tw = width / (TARGET_COLS + 2);
    let th = TARGET_HEIGHT;
    let o = 1.5 * tw;

    targets = [];

    for (let row = 0; row < TARGET_ROWS; row++)
    {
        for (let col = 0; col < TARGET_COLS; col++)
        {
            let target = new Target(col * tw + o, row * th + o, tw, th, { r: 0, g: 255, b: 0 });
            targets.push(target);
            renderer.addShowable(target);
        }
    }

    paddle = new Paddle(CANVAS_WIDTH / 2, 0.9 * CANVAS_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
    renderer.addShowable(paddle);

    ball = new Ball(CANVAS_WIDTH / 2, 0.8 * CANVAS_HEIGHT, BALL_XVEL, -BALL_YVEL, BALL_RADIUS, paddle, targets);
    renderer.addShowable(ball);

    gameManager = new GameManager(paddle, ball, targets);

    rectMode(CENTER);
    ellipseMode(RADIUS);
}

function draw() 
{
    let input = controller.getInput();

    if (!gameManager.gameRunning && input == controller.Input.START)
    {
        gameManager.start();
    }
    else
    {
        if (input == controller.Input.LEFT)
        {
            paddle.moveLeft();
        }
        else if (input == controller.Input.RIGHT)
        {
            paddle.moveRight();
        }
    }

    paddle.update();
    ball.update();

    for (let i = 0; i < targets.length; i++)
    {
        if (targets[i].alive)
        {
            targets[i].update();
        }
    }

    background(150, 150, 255);
    renderer.render();

    noStroke();
    fill(255);
    textSize(TEXT_SIZE);
    textAlign(LEFT, TOP);
    text("Score: " + gameManager.score + "\nFramerate: " + frameRate().toFixed(1), TEXT_SIZE, TEXT_SIZE);

    if (!gameManager.gameRunning)
    {
        textSize(2 * TEXT_SIZE);
        textAlign(CENTER, CENTER);
        text("... Press SPACE to begin ...", width / 2, 0.1 * height);
    }
}