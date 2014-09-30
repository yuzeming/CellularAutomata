/**
 * 细胞自动机测试
 *
 * @module CellularAutomateTest
 */

/** 过滤Game.Map中无关信息
 *
 *  返回仅存储细胞状态值数组
 */
function map_toObject() {
    var h = Game.h;
    var w = Game.w;
    var convertResult = [];
    for (var i = 0; i < h; i++) {
        var line = [];
        for (var j = 0; j < w; j++) {
            if (Game.Map[i][j]._state) {
                line.push(1);
            }
            else {
                line.push(0);
            }
        }
        convertResult.push(line);
    }
    return convertResult;
}

/** 测试数据
 *  testdata[i].h 数据行数
 *  testdata[i].w 数据列数
 *  testdata[i].map 棋盘描述
 *  resultdata[i].map 下一代棋盘描述
 *  testNum 测试总数
 */
testdata = [];
resultdata = [];
testNum = 1;
testdata.push({
    w: 4,
    h: 4,
    map: [[1, 0, 0, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [1, 0, 0, 0]]

})
resultdata.push([[1, 0, 0, 1],
                 [0, 0, 0, 0],
                 [0, 0, 0, 0],
                 [1, 0, 0, 1]]);

/** 根据testdata指定当前状态
 *
 *  testdata 测试数据对象
 */
function setMap(testdata) {
    Game.CleanAll();
    var h = testdata.h;
    var w = testdata.w;
    Game.h = h;
    Game.w = w;
    for (var i = 0; i < h; i++) {
        var line = [];
        for (var j = 0; j < w; ++j) {
            line.push(new Cell(i, j, (testdata.map[i][j])));
        }
        Game.Map.push(line);
    }
}

test('cell_logic_test', function () {
    for (var i = 0; i < testNum; ++i) {
        setMap(testdata[i]);
        deepEqual(map_toObject(Game.Move()), resultdata[i], 'Move() test');

    }
})