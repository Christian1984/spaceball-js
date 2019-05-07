class Renderer
{
    constructor()
    {
        this.showable = [];
    }

    addShowable(showable)
    {
        this.showable.push(showable);
    }

    render()
    {
        for (let i = 0; i < this.showable.length; i++)
        {
            this.showable[i].show();
        }
    }
}