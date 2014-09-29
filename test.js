function map_toObject(Map) {
    var h = Map.length;
    var w = Map[0].length;
    var convertResult = [];
    for (var i = 0; i < h; i++) {
        var line = [];
        for (var j = 0; j < w; j++) {
            if (Map[i][j]._state) {
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

function setMap(testdata) {
    CleanAll();
    var h = testdata.h;
    var w = testdata.w;
    for (var i = 0; i < h; i++) {
        var line = [];
        for (var j = 0; j < w; ++j) {
            line.push(new Cell(i, j, (testdata.map[i][j])));
        }
        Map.push(line);
    }
}

test('cell_logic_test', function () {
    for (var i = 0; i < testNum; ++i) {
        setMap(testdata[i]);
        deepEqual(map_toObject(Move()), resultdata[i], 'Move() test');

    }
})