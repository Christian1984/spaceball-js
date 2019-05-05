class Ball extends GameObject
{
    constructor(xPos, yPos, xVel, yVel, radius, paddle)
    {
        super(xPos, yPos, xVel, yVel);
        this.radius = radius;
        this.paddle = paddle;
    }

    isCollidingWith(paddle)
    {
        return this.pos.x + this.radius >= paddle.pos.x - paddle.width / 2 
            && this.pos.x - this.radius <= paddle.pos.x + paddle.width / 2
            && this.pos.y + this.radius >= paddle.pos.y - paddle.height / 2
            && this.pos.y - this.radius <= paddle.pos.y + paddle.height / 2;
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
        let rand = random(0.8, 1.2);
        //this.vel.x /= rand;
        this.vel.y *= -rand;
    }

    xBounce()
    {
        let rand = random(0.8, 1.2);
        this.vel.x *= -rand;
        //this.vel.y /= rand;
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
    }

    show()
    {
        super.show();
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
}