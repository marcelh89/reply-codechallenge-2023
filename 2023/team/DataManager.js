import fs from "fs";
import {readFile} from "./utils.js";

/*
 * Read input
 */

const files = fs.readdirSync("../inputs");
const filename = files[1];

const content = readFile("../inputs/" + filename);
const data = content.split("\n");

/*
 * Create models
 */
class Board {
    constructor(input_lines) {
        const [columns, rows, numberOfSnakes] = input_lines[0].split(" ")
        this.columns = Number(columns);
        this.rows = Number(rows);
        this.numberOfSnakes = Number(numberOfSnakes)

        
        this.initialMatrix = [] // TODO init 2d matrix from input lines
        this.snakeMatrix = []
        
        for(let currentRow = 2; currentRow < input_lines.length ; currentRow++){
            
            const currentColumns = input_lines[currentRow].split(" ")
            .map(c => {
                if(c === '*') return c;
                return Number(c)
            })
            this.initialMatrix.push(currentColumns)
        }

        this.initialMatrix = this.initialMatrix[0].map((_, colIndex) => this.initialMatrix.map(row => row[colIndex]));

        //this.snakeMatrix = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));

        for(let currentRow = 2; currentRow < input_lines.length ; currentRow++){
            
            const currentColumns = input_lines[currentRow].split(" ")
            .map(c => {
                if(c === '*') return -1;
                return 0
            })
            this.snakeMatrix.push(currentColumns)
        }

        this.snakeMatrix = this.snakeMatrix[0].map((_, colIndex) => this.snakeMatrix.map(row => row[colIndex]));
    }
}

class Snake {
    constructor(length){
        this.length = length
        this.position = [0, 0]
        this.path = [] // [(0,0),(0,1),...]
        this.points = 0
    }
}

class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class fieldMap {
    constructor() {
        this.Position = new Point(0,0);
        this.value;
    }
}


const board = new Board(data);

// create Snakes
const snakeList = []
for(const length of data[1].split(" ")){
    const snake = new Snake(length)
    snakeList.push(snake)
}



/*
 * Export parsed and objectified input data
 */
export {data, filename, board, snakeList, fieldMap, Point};
