/**
 * 细胞自动机
 *
 * @module CellularAutomate
 */

var Fx = [0,0,1,-1,1,1,-1,-1];
var Fy = [1,-1,0,0,1,-1,1,-1];
var SIZE = 8;

/**
* 这个类实现了细胞的显示
*
* @class CellDiv
* @constructor
* @param {Number} x 细胞X坐标
* @param {Number} y 细胞Y坐标
* @param {Object} cell 细胞对象，用于绑定onclick事件
*/

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
/**
* 这个类存贮了细胞的状态，并维护显示状态。
*
* @class Cell
* @constructor
* @param {Number} x 细胞X坐标
* @param {Number} y 细胞Y坐标
* @param {Bool} s 细胞初始状态
*/

function Cell(x,y,s)
{
    this.dom = new CellDiv(x,y,this);
    this.__defineSetter__("state",function(val){
        if (this._state != val) {
            this._state = val;
			this.dom.SetState(val);
        }
    });
	this.__defineGetter__("state",function(val){
			return this._state;
    });
	
    this.state = s;
	
	//计算中需要使用原状态，延时更新。
    this.newState = s;
    this.upData = function(){
        this.state = this.newState;
    };
}


/**
* 这个类实现了界面操作，并存储必要的信息。
*
* @class Game
*/

var Game = {

	/**
	* 设定当前时间并更新时间标签。
	*
	* @method SetTime
	* @param {Number} t 时间数值
	*/

	SetTime:function (t)
	{
		time = t;
		document.getElementById("time").textContent = time;
	},

	/**
	* 全局二维数组
	* 
	* @property Map
	* @type { Array(Array(Cell)) }
	* @default Array(Array())
	*/
	Map : [],
	
	/**
	* 时间
	* 
	* @property time
	* @type {Number}
	* @default 0
	*/
	time : 0,
	
	/**
	* 高度
	* 
	* @property h
	* @type {Number}
	*/
	h : 0,
	
	/**
	* 宽度
	* 
	* @property w
	* @type {Number}
	*/
	w : 0,
	
	/**
	* 生成比率
	* 
	* @property r
	* @type {Float}
	*/
	r : 0.3,

	/**
	* 清除二维数组Map,并删除所对应的Dom
	*
	* @method CleanAll
	*/
	CleanAll:function ()
	{
		for (var i=0;i<this.Map.length;++i){
			for (var j=0;j<this.Map[i].length;++j){
				this.Map[i][j].dom.remove();
			}
		}

		while (this.Map.length >0){
			this.Map.pop();
		}
		
		this.SetTime(0);
	},

	/**
	* 获取输入，高度，宽度，生成比率。
	*
	* @method GetInput
	*/
	GetInput:function ()
	{
		this.h = parseInt(document.getElementById("height").value);
		this.w = parseInt(document.getElementById("width").value);
		this.r = parseFloat(document.getElementById("rate").value);
		
		document.getElementById("main").style.width = this.w * SIZE +"px";
		document.getElementById("main").style.height = this.h * SIZE +"px";
	},

	/**
	* 初始化操作
	*
	* @method Start
	*/
	Start:function ()
	{
		this.CleanAll();
		this.GetInput();
		for (var i=0;i<this.h;i++){
			var line = [];
			for (var j=0;j<this.w;++j){
				line.push(new Cell(i,j,(Math.random() < this.r )));
			}
			this.Map.push(line);
		}
	},

	/**
	* 模拟下一秒状态
	*
	* @method Move
	*/
	Move:function ()
	{
		if (this.Map.length == 0) {
			return null;
		}
		for (var i=0;i<this.h;++i){
			for (var j=0;j<this.w;++j){
				var n = 0;
				for (var f=0;f<8;++f){
					n += this.Map[(i + Fx[f] + this.h) % this.h][(j + Fy[f] + this.w) % this.w].state;
				}
				switch (n)
				{
					case 3:
						this.Map[i][j].newState = true;
						break;
					case 2:
						this.Map[i][j].newState = this.Map[i][j].state;
						break;
					default:
						this.Map[i][j].newState = false;
				}
			}
		}
		this.SetTime(time+1);
		for (var i=0;i<this.h;++i) {
			for (var j = 0; j < this.w; ++j) {
				this.Map[i][j].upData();
			}
		}
	},

	/**
	* 自动模拟下一步操作
	*
	* @method Start
	*/
	auto : 0,
	Auto:function () {
		if (document.getElementById("auto").checked){
			var _this = this;
			this.auto = setInterval(function(){
				_this.Move();
			},100);
		} else {
			clearInterval(this.auto);
			this.auto = 0;
		}
	}
}

