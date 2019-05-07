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
    { }

    show()
    { }
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

class GestureController extends Controller
{
    constructor()
    {
        super();

        //init ml5 library and model
        //TODO

        //add keyboard controller to train model
        //TODO
    }
    
    getInput()
    {
        super.getInput();

        //keyboard commands to train model
        //TODO

        //translate classification to input commands
        //TODO
        return this.Input.NOTHING;
    }

    show()
    {
        //show video
    }
}