class GameObject
{
    constructor(xPos, yPos, xVel, yVel)
    {
        this.pos = {x: xPos, y: yPos};
        this.vel = {x: xVel, y: yVel};
    }

    update()
    {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    show()
    {
        //console.log("pos", this.pos, "vel", this.vel);
    }
}