var Fx = [0,0,1,-1,1,1,-1,-1];
var Fy = [1,-1,0,0,1,-1,1,-1];
var SIZE = 8;

function CellDiv(x,y,cell)
{
    var ret = document.createElement("div");
    document.getElementById("main").appendChild(ret);
	ret.style.top = x * SIZE + "px";
    ret.style.left = y * SIZE + "px";
	ret.cell = cell;
    ret.onclick = function () {
        this.cell.state =! this.cell._state
    }
	ret.SetState = function (val) {
		if (val) {
			this.classList.remove("die");
			this.classList.add("alive");
		} else {
			this.classList.add("die");
			this.classList.remove("alive");
		}
	}
    return ret;
}

function Cell(x,y,s)
{
    this.dom = new CellDiv(x,y,this);
    this.__defineSetter__("state",function(val){
        if (this._state != val) {
            this._state = val;
			this.dom.SetState(val);
        }
    });
    this.state = s;
    this.newState = s;
    this.upData = function(){
        this.state = this.newState;
    };
}

function SetTime(t)
{
	time = t;
	document.getElementById("time").textContent = time;
}

var Map = [];
var time = 0, h, w;

function CleanAll()
{
    for (var i=0;i<Map.length;++i){
        for (var j=0;j<Map[i].length;++j){
            Map[i][j].dom.remove();
        }
    }

    while (Map.length >0){
        Map.pop();
    }
	
	SetTime(0);
}

function GetGameSize()
{
    h = parseInt(document.getElementById("height").value);
    w = parseInt(document.getElementById("width").value);
    document.getElementById("main").style.width = w * SIZE +"px";
    document.getElementById("main").style.height = h * SIZE +"px";
}

function Start()
{
    CleanAll();
	GetGameSize();
    for (var i=0;i<h;i++){
        var line = [];
        for (var j=0;j<w;++j){
            line.push(new Cell(i,j,(Math.random() > (3.0/8.0) )));
        }
        Map.push(line);
    }
}

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
				n += Map[(i + Fx[f] + h) % h][(j + Fy[f] + w) % w]._state;
            }
			switch (n)
            {
				case 3:
					Map[i][j].newState = true;
					break;
				case 2:
					Map[i][j].newState = Map[i][j]._state;
					break;
				default:
					Map[i][j].newState = false;
            }
        }
    }
    SetTime(time+1);
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