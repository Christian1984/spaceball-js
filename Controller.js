class Controller
{
    constructor()
    {
        this.Input = 
        {
            NOTHING: 0,
            START: 1,
            LEFT: 2,
            RIGHT: 3,
            ADD_NOTHING: 4
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

        if (keyIsDown(32)) //space
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
        else if (keyIsDown(DOWN_ARROW))
        {
            return this.Input.ADD_NOTHING;
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

        this.modelStates = {
            PREPARING: 0,
            COLLECTING_SAMPLES: 1,
            TRAINING: 2,
            PREDICTING: 3
        };

        this.modelState = this.modelStates.PREPARING;

        this.modelReady = false;
        this.classifierReady = false;
        this.images = 0;
        this.input = this.Input.NOTHING;

        //create video feed
        this.video = createCapture(VIDEO);
        this.video.hide();

        //init ml5 library and model
        this.featureExtractor = ml5.featureExtractor("mobileNet", { numClasses: 4 }, () => this.onModelReady());
        this.classifier = this.featureExtractor.classification(this.video, () => this.onClassifierReady());

        //add keyboard controller to train model
        this.keyboardController = new KeyboardController();
    }

    onModelReady()
    {
        console.log("model ready");
        this.modelReady = true;
        this.onReady();
    }

    onClassifierReady()
    {
        console.log("classifier ready");
        this.classifierReady = true;
        this.onReady();
    }

    onReady()
    {
        if (this.classifierReady && this.modelReady)
        {
            console.log("all ready");
            this.modelState = this.modelStates.COLLECTING_SAMPLES;
        }
    }
    
    getInput()
    {
        super.getInput();

        let input = this.keyboardController.getInput();

        //keyboard commands to train model
        if (this.modelState == this.modelStates.COLLECTING_SAMPLES)
        {

            switch (input)
            {
                case this.Input.LEFT:
                    this.addImage('left');
                    break;
                case this.Input.RIGHT:
                    this.addImage('right');
                    break;
                case this.Input.ADD_NOTHING:
                    this.addImage('nothing');
                    break;
                case this.Input.START:
                    this.modelState = this.modelStates.TRAINING;
                    this.classifier.train((loss) => this.onTraining(loss));
                    break;
            }
        }
        else if (this.modelState == this.modelStates.PREDICTING)
        {
            if (input == this.Input.START)
            {
                return this.Input.START;
            }
            else
            {
                return this.input;
            }
        }

        return this.Input.NOTHING;
    }

    addImage(label)
    {
        this.classifier.addImage(label);

        this.images++;
        console.log("image added! added", this.images, "images so far!");
    }

    onTraining(loss)
    {
        if (loss)
        {
            console.log("loss:", loss);
        }
        else
        {
            this.modelState = this.modelStates.PREDICTING;
            this.predict();
        }
    }

    predict()
    {
        this.classifier.classify((err, res) => this.gotResults(err, res));
    }

    gotResults(err, res)
    {
        if (err)
        {
            console.error(err);
        }
        else
        {
            console.log(res);
            
            switch(res)
            {
                case "left":
                    this.input = this.Input.LEFT;
                    break;
                case "right":
                    this.input = this.Input.RIGHT;
                    break;
                case "nothing":
                    this.input = this.Input.NOTHING;
                    break;
            }

            this.predict();
        }
    }

    show()
    {
        super.show();

        //show video
        push();
        translate(width,0);
        scale(-1.0, 1.0);
        image(this.video, 0, 0, width, width * this.video.height / this.video.width);
        pop();

        rectMode(CORNER);
        strokeWeight(2);
        stroke(0);
        fill(0, 255, 255, 100);
        rect(CONTROLLER_SIZE / 2, height - 1.5 * CONTROLLER_SIZE, CONTROLLER_SIZE, CONTROLLER_SIZE);
        rect(width - 1.5 * CONTROLLER_SIZE, height - 1.5 * CONTROLLER_SIZE, CONTROLLER_SIZE, CONTROLLER_SIZE);

        noStroke();
        fill(150, 150, 255, 100);
        rect(0, 0, width, height);
    }
}