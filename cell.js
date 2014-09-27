function CellDiv()
{
    var ret = document.createElement("div");
    document.getElementById("main").appendChild(ret);
    return ret;
}

function Cell(x,y,s)
{
    this.dom = new CellDiv();
    this.dom.style.top = x * 10 + "px";
    this.dom.style.left = y * 10 + "px";
    this.dom.cell = this;
    this.dom.onclick = function () {
        this.cell.state =! this.cell._state
    }   
    this.__defineSetter__("state",function(val){
        if (this._state != val) {
            this._state = val;
            if (val) {
                this.dom.classList.remove("die");
                this.dom.classList.add("alive");
            } else {
                this.dom.classList.add("die");
                this.dom.classList.remove("alive");
            }
        }
    });
    this.state = s;
    this.newState = s;

    this.upData = function(){
        this.state = this.newState;
    };
}

var Map = [];
var time = 0;

function Start()
{
    for (var i=0;i<Map.length;++i){
        for (var j=0;j<Map[i].length;++j){
            Map[i][j].dom.remove();
        }
    }

    while (Map.length >0){
        Map.pop();
    }

    time = 0;
    document.getElementById("time").textContent = time;
    var h = parseInt(document.getElementById("height").value);
    var w = parseInt(document.getElementById("width").value);
    for (var i=0;i<h;i++){
        var line = [];
        for (var j=0;j<w;++j){
            line.push(new Cell(i,j,(Math.random() >.5)));
        }
        Map.push(line);
    }
    document.getElementById("main").style.width = w * 10 +"px";
    document.getElementById("main").style.height = h * 10 +"px";

}

var Fx = [0,0,1,-1,1,1,-1,-1];
var Fy = [1,-1,0,0,1,-1,1,-1];

function Move()
{
    if (Map.length == 0) {
        return null;
    }
    var h = Map.length;
    var w = Map[0].length;
    for (var i=0;i<h;++i){
        for (var j=0;j<w;++j){
            var n = 0;
            for (var f=0;f<8;++f){
                {
                    n += Map[(i + Fx[f] + h) % h][(j + Fy[f] + w) % w]._state;
                    console.info(i, j, (i + Fx[f] + h) % h, (j + Fy[f] + w) % w);
                }
            }
 //           console.info("Map "+i+' '+j+' '+ n);
            if (n==3){
                Map[i][j].newState = true;
            } else if (n==2) {
                Map[i][j].newState = Map[i][j]._state;
            } else {
                Map[i][j].newState = false;
            }
        }
    }
    time +=1;
    document.getElementById("time").textContent = time;
    for (var i=0;i<h;++i) {
        for (var j = 0; j < w; ++j) {
            Map[i][j].upData();
        }
    }
}

var auto = 0;
function Auto() {
    if (document.getElementById("auto").checked){
        auto = setInterval(Move,100);
    } else {
        clearInterval(auto);
        auto = 0;
    }
}