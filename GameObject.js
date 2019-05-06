class GameObject
{
    constructor(xPos, yPos, xVel, yVel)
    {
        this.gameManager = undefined;

        this.startPos = createVector(xPos, yPos);
        this.startVel = createVector(xVel, yVel);

        this.reset();
    }

    setGameManager(gameManager)
    {
        this.gameManager = gameManager;
    }

    update()
    {
        if(gameManager && gameManager.gameRunning)
        {
            this.pos.add(this.vel);
        }
    }
    
    reset()
    {
        this.alive = true;

        this.pos = this.startPos.copy();
        this.vel = this.startVel.copy();
    }

    undoUpdate()
    {
        this.pos.sub(this.vel);
    }

    show()
    { }

    die()
    {
        this.alive = false;
    }
}