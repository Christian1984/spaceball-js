class GameObject
{
    constructor(xPos, yPos)
    {
        this.pos = {x: xPos, y: yPos};
        this.vel = {x: 0, y: 0};
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