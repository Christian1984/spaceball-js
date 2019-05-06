class Target extends GameObject
{
    constructor(xPos, yPos, width, height, color)
    {
        super(xPos, yPos, 0, 0);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    show()
    {
        super.show();
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}