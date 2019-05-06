class GameManager
{
    constructor(ball, paddle, targets)
    {
        this.ball = ball;
        this.paddle = paddle;
        this.targets = targets;

        this.score = 0;
    }

    addScore()
    {
        this.score += 100;
    }

    restart()
    {
        this.score = 0;

        this.ball.reset();
        this.paddle.reset();

        for (let i = 0; i < this.targets.length; i++)
        {
            this.targets[i].reset();
        }
    }
}