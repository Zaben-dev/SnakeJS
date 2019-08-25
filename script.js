// Snake created without any libraries or canvas

window.onload=menu;
score=-1;
let blockArrows;

function menu()
{
    addScore();
    document.getElementById("game_window").innerHTML='<button id="button" onclick="(function(){ createMap(); Snake.setStartPosition(); Snake.display(); spawnApple();  setTimeout(game, 650);})();">PLAY</button><div id="instruction">use the arrow keys</div>';
}

function addScore()
{
    if(sessionStorage.getItem("bestScore")==null)
    {
        sessionStorage.setItem("bestScore", 0);
    }

    score++;

    if(score>sessionStorage.getItem("bestScore"))
    {
        sessionStorage.setItem("bestScore", score);
    }
    document.getElementById("footer").innerHTML ='<div id="footerScore">SCORE:' + score + '</div><div id="footerBest"> BEST:' + sessionStorage.getItem("bestScore") + '</div><div id="footerCopyright"></div>';
}

function coordinatesToBlockId(row, column)
{
    return ((row-1)*25)+column-1;
}

function createMap()
{
    let blocks_divs = "";
    for (let i = 0; i < 475; i++)
    {
        blocks_divs = blocks_divs + '<div class="map_blocks" id="block' + i + '"></div>';
    }
    document.getElementById("game_window").innerHTML = blocks_divs;
}

function spawnApple()
{
    fruit = new Apple();
    fruit.generatePosition();
    fruit.display();
}

function Apple()
{
    this.generatePosition=function()
    {
        let flag;
        do {
            flag=false;
            this.position = Math.floor(Math.random() * 474);
            for (let i = 0; i < Snake.position.length; i++)
            {
                if (this.position === coordinatesToBlockId( Snake.position[i].row,  Snake.position[i].column)) flag = true;
            }
        } while (flag === true)  // avoids situation when apple spawn on snake
    }

    this.display=function()
    {
        document.getElementById('block'+this.position).style.background="red";
    }
}

let Snake=
    {

    direction: 'ArrowUp',

    position: [],

    changeColorToDefault: 0,

    setDirection: function(key)                          // avoids incorrect moves
    {
        if(key=="ArrowUp" && this.direction!="ArrowDown")
        {
            this.direction=key;
        }

        if(key=="ArrowRight" && this.direction!="ArrowLeft")
        {
            this.direction=key;
        }

        if(key=="ArrowLeft" && this.direction!="ArrowRight")
        {
            this.direction = key;
        }

        if(key==="ArrowDown" && this.direction!="ArrowUp")
        {
            this.direction=key;
        }
    },

    setStartPosition: function()
    {
         this.position.push({row: 19, column: 13});
         this.position.push({row: 18, column: 13});
         this.position.push({row: 17, column: 13});
         this.position.push({row: 16, column: 13});
         this.position.push({row: 15, column: 13});
    },

    display: function ()
    {
        document.getElementById('block'+this.changeColorToDefault).style.background="#ffffff";
        for (let i = 0; i < this.position.length; i++)
        {
            document.getElementById('block' + coordinatesToBlockId(this.position[i].row, this.position[i].column)).style.background = "#4bc406";
        }
    },

    move: function()
    {
        if(this.direction == "ArrowUp")
        {
            if(coordinatesToBlockId(this.position[this.position.length-1].row-1, this.position[this.position.length-1].column)===fruit.position)  //detecting apples
            {
                this.position.push({row: this.position[this.position.length-1].row-1, column: this.position[this.position.length-1].column});
                spawnApple();
                addScore();
                return undefined;
            }

            for(i=0; i<this.position.length; i++)     //if collision with himself
            {
                if(coordinatesToBlockId(this.position[this.position.length-1].row-1, this.position[this.position.length-1].column)===coordinatesToBlockId(this.position[i].row, this.position[i].column))
                {
                    return true;
                }
            }

            if(this.position[this.position.length-1].row-1 <1)    //if out of map
                return true;

            this.changeColorToDefault=coordinatesToBlockId(this.position[0].row, this.position[0].column);    //moving

            for (let i = 0; i < this.position.length - 1; i++)
            {
                this.position[i].row = this.position[i + 1].row;
                this.position[i].column = this.position[i + 1].column;
            }

            this.position[this.position.length-1].row = this.position[this.position.length-1].row-1;
        }

        if(this.direction == "ArrowDown")
        {
            if(coordinatesToBlockId(this.position[this.position.length-1].row+1, this.position[this.position.length-1].column)===fruit.position)
            {
                this.position.push({row: this.position[this.position.length-1].row+1, column: this.position[this.position.length-1].column});
                spawnApple();
                addScore();
                return undefined;
            }

            for(i=0; i<this.position.length; i++)
            {

                if (coordinatesToBlockId(this.position[this.position.length - 1].row + 1, this.position[this.position.length - 1].column) === coordinatesToBlockId(this.position[i].row, this.position[i].column))
                {
                    return true;
                }
            }

            if(this.position[this.position.length-1].row+1 >19) return true;

            this.changeColorToDefault=coordinatesToBlockId(this.position[0].row, this.position[0].column);

            for (let i = 0; i < this.position.length - 1; i++)
            {
                this.position[i].row = this.position[i + 1].row;
                this.position[i].column = this.position[i + 1].column;
            }

            this.position[this.position.length-1].row = this.position[this.position.length-1].row+1;
        }

        if(this.direction == "ArrowLeft")
        {
            if(coordinatesToBlockId(this.position[this.position.length-1].row, this.position[this.position.length-1].column-1)===fruit.position)
            {
                this.position.push({row: this.position[this.position.length-1].row, column: this.position[this.position.length-1].column-1});
                spawnApple();
                addScore();
                return undefined;
            }

            for(i=0; i<this.position.length; i++)
            {
                if (coordinatesToBlockId(this.position[this.position.length - 1].row, this.position[this.position.length - 1].column - 1) === coordinatesToBlockId(this.position[i].row, this.position[i].column))
                {
                    return true;
                }
            }

            if(this.position[this.position.length-1].column-1 <1) return true;

            this.changeColorToDefault=coordinatesToBlockId(this.position[0].row, this.position[0].column);

            for (let i = 0; i < this.position.length - 1; i++)
            {
                this.position[i].row = this.position[i + 1].row;
                this.position[i].column = this.position[i + 1].column;
            }
            this.position[this.position.length-1].column = this.position[this.position.length-1].column-1;
        }

        if(this.direction == "ArrowRight")
        {
            if(coordinatesToBlockId(this.position[this.position.length-1].row, this.position[this.position.length-1].column+1)===fruit.position)
            {
                this.position.push({row: this.position[this.position.length-1].row, column: this.position[this.position.length-1].column+1});
                spawnApple();
                addScore();
                return undefined;
            }

            for(i=0; i<this.position.length; i++)
            {
                if (coordinatesToBlockId(this.position[this.position.length - 1].row, this.position[this.position.length - 1].column + 1) === coordinatesToBlockId(this.position[i].row, this.position[i].column))
                {
                    return true;
                }
            }

            if(this.position[this.position.length-1].column+1 >25) return true;

            this.changeColorToDefault=coordinatesToBlockId(this.position[0].row, this.position[0].column);

            for (let i = 0; i < this.position.length - 1; i++)
            {
                this.position[i].row = this.position[i + 1].row;
                this.position[i].column = this.position[i + 1].column;
            }
            this.position[this.position.length-1].column = this.position[this.position.length-1].column+1;
        }
    },

};

    function game()
    {
        if(Snake.move()==true){                                                     //when player loses snake.move returns true
            setTimeout(function(){ window.location.reload(); }, 1200);
            return undefined;
        }

        Snake.display();

        blockArrows=false;
        window.addEventListener('keydown', function (event) {
            if(blockArrows===false)                                        //avoids incorrect moves
            {
                Snake.setDirection(event.key);
                blockArrows=true;
            }
        }, false);

        setTimeout(game, 125);
    };
