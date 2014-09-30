/**
 * ϸ���Զ�������
 *
 * @module CellularAutomateTest
 */

/** ����Game.Map���޹���Ϣ
 *
 *  ���ؽ��洢ϸ��״ֵ̬����
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

/** ��������
 *  testdata[i].h ��������
 *  testdata[i].w ��������
 *  testdata[i].map ��������
 *  resultdata[i].map ��һ����������
 *  testNum ��������
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

/** ����testdataָ����ǰ״̬
 *
 *  testdata �������ݶ���
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