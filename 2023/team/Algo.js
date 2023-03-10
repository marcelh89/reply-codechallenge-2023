//import {getRandomInt} from './utils.js'
import {board, fieldMap, Point} from "./DataManager.js";
import {randomInt} from "crypto"

export default function useTheAlgorithm(board,snakeList) {
    console.log("start algorithm")
    console.log(board.initialMatrix);

    //board = createBoard(Field);
    let wormholes = gatherWormholes(board);

    for (let snake of snakeList) {
        //console.log('start snake loop');
        snake.position = placeSnake(board);
        console.log('STARTPUNKT',snake.position);
        for (let step = 0; step < snake.length-1; step++ ) {
            //console.log('start move loop');
            moveSnake(snake);
        }
    }

    let overallScore = accumulateSnakePoints(snakeList);
    console.log('OverallScore: ' + overallScore);
}

function moveSnake(snake) {
    let areaMap = scanArea(snake.position);
    let fieldToGo = chooseDirection(areaMap);
    console.log('NEXT FIELD', fieldToGo);
    const [x,y] = fieldToGo;
    snake.path.push(fieldToGo);
    snake.points += board.initialMatrix[x][y];
    snake.position = fieldToGo;
    board.snakeMatrix[x][y] = 1;
}

function scanArea(position) {
    const [x,y] = position;
    //console.log('x',x);
    //console.log('y',y);
    let valueMap = new Map();
    const range = 1;
    for (let i = -range; i<=range; i++) {
        for (let j = -range; j<=range; j++) {
            //console.log(fieldNotBlocked([x+i,y+j]));
            //console.log("scanArea", !(i == 0 && j == 0) && fieldNotBlocked([x+i,y+j]))
            if (!(i == 0 && j == 0) && fieldNotBlocked([x+i,y+j])) {
                //console.log("scanArea", x+i, y+j)
                //console.log("fieldvalue", board.initialMatrix[x+i][y+j])
                //valueList.push(board.initialMatrix[x+i][y+j]);
                let map = new fieldMap();
                map.Position = new Point(x+i,y+j)
                valueMap.set(map.Position, board.initialMatrix[x+i][y+j]);
            }
        }
    }
    return valueMap;
}

function chooseDirection(areaMap) {
    console.log("chooseDirection", areaMap.size);
    let p = [0,0];
    let max = 0;
    for (let [x, value] of areaMap.entries()){
        if (value > max) {
            max = value;
            p = [x.x,x.y];
        }
    }
    return p;
}

function fieldNotBlocked(position) {
    const [x,y] = position;
    if (x < 0 || y < 0) {
        return false;
    }
    if (x >= board.columns || y >= board.rows) {
        return false;
    }
    //console.log("fieldNotBlocked", x,y)
    if (board.snakeMatrix[x][y] == 0) { //for considering wormholes as valid fields set to != 1
        return true;
    } else {
        return false;
    }
}

function placeSnake() {
    let valid = 0;
    let x = 0;
    let y = 0;
    while (valid == 0) {
        x = randomInt(0, board.columns );
        y = randomInt(0, board.rows);
        //console.log("placeSnake", x,y)
        if (board.initialMatrix[x][y] != '*') {
            valid = 1;
        }
    }
    return [x,y];
}

/*
function createBoard() {
    array of array board = new array of array(width, height);
    return Map;
}*/

//position = [x,y]
//obj = ([x,y] => value)
//List<obj>

function gatherWormholes(board) {
    let whMap = new Map();
    for (let i; i<board.columns; i++) {
        for (let j; j<board.rows; j++) {
            if (board.initialMatrix[i][j] == '*') {
                value = calculateWHValue((i,j));
                whMap.set((i,j), value);
            }
        }
    }

    return whMap
}

function calculateWHValue(tuple) {
    const [i,j] = tuple;
    //range y aroung point aufsummieren
    return 1;
}

function accumulateSnakePoints(snakeList) {
    let sum = 0;
    for (let snake of snakeList) {
        sum += snake.points;
    }
    return sum;
}