class Ball extends GameObject
{
    constructor(xPos, yPos, radius)
    {
        super(xPos, yPos);
        this.radius = radius;
    }

    update()
    {
        super.update();
    }

    show()
    {
        super.show();
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
}