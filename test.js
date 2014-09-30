/**
 * 细胞自动机测试
 *
 * @module CellularAutomateTest
 */

/**
* 细胞自动机测试界面
*
* @class TestClass
* @constructor
*/
 
var TestClass = {
	/**
	* 根据Game对象中提取当前状态的二维数组
	*
	* @method map_formObject
	* @param {Object} game Game对象
	*/
	map_formObject:function (game) {
		var h = game.h;
		var w = game.w;
		var convertResult = [];
		for (var i = 0; i < h; i++) {
			var line = [];
			for (var j = 0; j < w; j++) {
				line.push(game.Map[i][j].state?1:0);
			}
			convertResult.push(line);
		}
		return convertResult;
	},

	/**
	* 根据数组指定当前状态
	*
	* @method setMap
	* @param {Object} game Game对象
	* @param {Array(Array(Bool))} t 二维数组
	*/
	setMap:function (game,t) {
		game.CleanAll();
		var h = t.length;
		var w = t[0].length;
		game.h = h;
		game.w = w;
		for (var i = 0; i < h; i++) {
			var line = [];
			for (var j = 0; j < w; ++j) {
				line.push(new Cell(i, j, (t[i][j])));
			}
			game.Map.push(line);
		}
	},

	/**
	* 运行测试并比较输出
	*
	* @method runtest
	* @param {String} name 测试名称
	* @param {Array(Array(Bool))} input 输入数据
	* @param {Array(Array(Bool))} output 期望输出数据数据
	*/
	runtest : function (name,input,output){
		var _this = this;
		test(name,function() {
			_this.setMap(Game,input);
			Game.Move();
			deepEqual(_this.map_formObject(Game), output, "Map");
		})
	}
}


/**
* 细胞自动机测试数据
*
* @class TestClass
* @constructor
*/
var Test={

	testdata : [
		{	//0
			input: [
				[1]
			],
			output : [
				[0]
			]
		} , {  //1
			input: [
				[1, 0, 0, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 0, 0, 0]
			],
			output : [
				[1, 0, 0, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 0, 0, 1]
			]
		} , {  //2
			input: [
				[1, 0, 0, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 0, 0, 1]
			],
			output : [
				[1, 0, 0, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 0, 0, 1]
			]
		}, {  //3
			input: [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 1, 1, 1, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0]
			],
			output : [
				[0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0]
			]
		}, {  //4
			input: [
				[1, 0, 1, 0, 0, 1, 1]
			],
			output : [
				[0, 0, 1, 1, 1, 0, 0]
			]
		} , {  //5
			input: [
				[0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 1, 0],
				[0, 1, 1, 1, 0],
				[0, 0, 0, 0, 0]
			],
			output : [
				[0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 1, 0],
                [0, 0, 1, 0, 0]
			]
		}, {  //6
			input: [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
			    [0, 1, 0, 1, 0],
			    [0, 0, 1, 1, 0],
				[0, 0, 1, 0, 0]
			],
			output : [
				[0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 1, 1, 0]
			]
		} , {  //7
			input: [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0],
				[0, 1, 0, 1, 0],
				[0, 0, 1, 1, 0]
			],
			output : [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 1, 1],
				[0, 0, 1, 1, 0]
			]
		} , {  //8
			input: [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0],
				[0, 0, 0, 1, 1],
				[0, 0, 1, 1, 0]
			],
			output : [
				[0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 0, 0, 1, 0],
				[0, 0, 0, 0, 1],
				[0, 0, 1, 1, 1]
			]
		}
	],

	main: function (){
		for (var i = 0;i<this.testdata.length;++i){
			TestClass.runtest("TEST_"+i,this.testdata[i].input,this.testdata[i].output);
		}
	}
}

Test.main();