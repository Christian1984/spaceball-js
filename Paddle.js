class Paddle extends GameObject
{
    constructor(xPos, yPos, width, height)
    {
        super(xPos, yPos);
        this.width = width;
        this.height = height;
    }

    moveLeft()
    {
        this.vel.x = -PADDLE_VEL;
    }

    moveRight()
    {
        this.vel.x = PADDLE_VEL;
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