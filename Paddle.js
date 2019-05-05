class Paddle extends GameObject
{
    constructor(xPos, yPos, width, height)
    {
        super(xPos, yPos, 0, 0);
        this.width = width;
        this.height = height;
    }

    moveLeft()
    {
        this.move(-PADDLE_VEL);
    }

    moveRight()
    {
        this.move(PADDLE_VEL);
    }

    move(xVel)
    {
        if (this.pos.x - this.width / 2 < 0)
        {
            this.pos.x = this.width / 2
        }
        else if (this.pos.x + this.width / 2 > width)
        {
            this.pos.x = width - this.width / 2
        }
        else
        {
            this.vel.x += xVel;
        }
    }

    update()
    {
        super.update();
        this.vel.x = 0;
    }

    show()
    {
        super.show();
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}