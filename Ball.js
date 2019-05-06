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

        if (this.pos.y + this.radius >= height)
        {
            this.die();
        }
    }

    yBounce()
    {
        super.undoUpdate();

        let rand = random(0.8, 1.2);
        this.vel.x /= rand;
        this.vel.y *= -rand;
    }

    xBounce()
    {
        super.undoUpdate();
        
        let rand = random(0.8, 1.2);
        this.vel.x *= -rand;
        this.vel.y /= rand;
    }

    die()
    {
        //TODO
        console.warn("AHHHHHHHHHHHHHHHH! I'm dead!");
    }

    update()
    {
        super.update();

        this.stayInBounds();

        if (this.isCollidingWith(paddle))
        {
            this.yBounce();
        }

        for (let i = 0; i < targets.length; i++)
        {
            if (targets[i].alive && this.isCollidingWith(targets[i]))
            {
                targets[i].die();
                this.yBounce();
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