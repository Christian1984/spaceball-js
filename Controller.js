class Controller
{
    constructor()
    {
        this.Input = 
        {
            NOTHING: 0,
            START: 1,
            LEFT: 2,
            RIGHT: 3
        };
    }

    getInput()
    {

    }
}

class KeyboardController extends Controller
{
    constructor() 
    {
        super();
    }
    getInput()
    {
        super.getInput();

        if (keyIsDown(32))
        {
            return this.Input.START;
        }
        else if (keyIsDown(LEFT_ARROW))
        {
            return this.Input.LEFT;
        }
        else if (keyIsDown(RIGHT_ARROW))
        {
            return this.Input.RIGHT;
        }
        else
        {
            return this.Input.NOTHING;
        }
    }
}