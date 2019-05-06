class GameObject
{
    constructor(xPos, yPos, xVel, yVel)
    {
        this.pos = {x: xPos, y: yPos};
        this.vel = {x: xVel, y: yVel};
        this.alive = true;
    }

    update()
    {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    undoUpdate()
    {
        this.pos.x -= this.vel.x;
        this.pos.y -= this.vel.y;
    }

    show()
    { }

    die()
    {
        this.alive = false;
    }
}