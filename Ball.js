class Ball extends GameObject
{
    constructor(xPos, yPos, xVel, yVel, radius, paddle, targets)
    {
        super(xPos, yPos, xVel, yVel);
        this.radius = radius;
        this.paddle = paddle;
        this.targets = targets;
    }

    isCollidingWith(other)
    {
        return this.pos.x + this.radius >= other.pos.x - other.width / 2 
            && this.pos.x - this.radius <= other.pos.x + other.width / 2
            && this.pos.y + this.radius >= other.pos.y - other.height / 2
            && this.pos.y - this.radius <= other.pos.y + other.height / 2;
    }

    stayInBounds()
    {
        if (this.pos.x - this.radius < 0)
        {
            this.pos.x = this.radius;
            this.xBounce();
        }
        else if (this.pos.x + this.radius > width)
        {
            this.pos.x = width - this.radius;
            this.xBounce();
        }

        if (this.pos.y - this.radius <= 0)
        {
            this.pos.y = this.radius;
            this.yBounce();
        }
        else if (this.pos.y + this.radius >= height)
        {
            this.die();
        }
    }

    changeHeading()
    {
        let dir = random() < 0.5 ? -1 : 1;
        let angle = dir * random(0.5);

        let tmpVel = this.vel.copy().rotate(angle);
        let tmpVelSin = abs(sin(tmpVel.heading()));

        if (tmpVelSin > BALL_MIN_SIN)
        {
            this.vel = tmpVel;
        }
    }

    yBounce()
    {
        super.undoUpdate();
        this.changeHeading();
        this.vel.y *= -1;
    }

    xBounce()
    {
        super.undoUpdate();
        this.changeHeading();
        this.vel.x *= -1;
    }

    die()
    {
        console.warn("AHHHHHHHHHHHHHHHH! I'm dead!");

        if (gameManager)
        {
            gameManager.reset();
        }
    }

    update()
    {
        super.update();

        this.stayInBounds();

        if (this.isCollidingWith(paddle) && this.vel.y > 0)
        {
            this.yBounce();
        }

        for (let i = 0; i < targets.length; i++)
        {
            if (targets[i].alive && this.isCollidingWith(targets[i]))
            {
                targets[i].die();
                this.yBounce();

                if (gameManager)
                {
                    gameManager.addScore();
                }

                break;
            }
        }
    }

    show()
    {
        super.show();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
}