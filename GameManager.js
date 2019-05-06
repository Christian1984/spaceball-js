class GameManager
{
    constructor(ball, paddle, targets)
    {
        this.ball = ball;
        this.paddle = paddle;
        this.targets = targets;

        this.gameRunning = false;
        this.score = 0;
    }

    addScore()
    {
        this.score += 100;
    }

    start()
    {
        this.gameRunning = true;
        this.score = 0;
    }

    reset()
    {
        this.gameRunning = false;

        this.ball.reset();
        this.paddle.reset();

        for (let i = 0; i < this.targets.length; i++)
        {
            this.targets[i].reset();
        }
    }
}