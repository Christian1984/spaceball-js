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
        this.vel.x -= PADDLE_VEL;
    }

    moveRight()
    {
        this.vel.x += PADDLE_VEL;
    }

    update()
    {
        super.update();
        this.vel.x = 0;

        if (this.pos.x - this.width / 2 < 0)
        {
            this.pos.x = this.width / 2
        }
        else if (this.pos.x + this.width / 2 > width)
        {
            this.pos.x = width - this.width / 2
        }
    }

    show()
    {
        super.show();
        
        fill(255);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}