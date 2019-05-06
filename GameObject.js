class GameObject
{
    constructor(xPos, yPos, xVel, yVel)
    {
        this.startPos = {x: xPos, y: yPos};
        this.startVel = {x: xVel, y: yVel};

        this.pos = {x: xPos, y: yPos};
        this.vel = {x: xVel, y: yVel};

        this.alive = true;
    }

    update()
    {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
    
    reset()
    {
        this.alive = true;

        this.pos = {x: this.startPos.x, y: this.startPos.y};
        this.vel = {x: this.startVel.x, y: this.startVel.y};
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