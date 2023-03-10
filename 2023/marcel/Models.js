import { randomInt } from "crypto";
import fs from "fs";
import { readFile } from "./utils.js";

/*
 * Read input
 */

const files = fs.readdirSync("../inputs");
const filename = files[0];

const content = readFile("../inputs/" + filename);
const data = content.split("\n").map((e) => e.trim());

class Field {
  constructor(r, c, value) {
    this.r = r;
    this.c = c;
    this.value = value; // the original value from input
    this.score = value === "*" ? -1 : Number(value); // skip wormhole
    this.used = false; // can be set to Snake
  }
}

/*
 * Create models
 */
class Board {
  constructor(input_lines) {
    const [columns, rows, numberOfSnakes] = input_lines[0].split(" ");
    this.columns = Number(columns);
    this.rows = Number(rows);
    this.numberOfSnakes = Number(numberOfSnakes);

    // use a map with key 'row,col' as string
    this.initialMatrix = new Map(); // TODO init 2d matrix from input lines
    this.snakeMatrix = new Map();

    for (let currentRow = 2; currentRow < input_lines.length; currentRow++) {
      const currentColumns = input_lines[currentRow]
        .split(" ")
        .map((c, columnIndex) => new Field(currentRow - 2, columnIndex, c));

      for (let colKey in currentColumns) {
        this.initialMatrix.set(
          currentRow - 2 + "," + colKey,
          currentColumns[colKey]
        );
      }
    }

    this.printBoard("score");
    this.printBoard("value");
  }

  printBoard(prop) {
    console.log(`-------${prop}Board--------->`);
    for (let row = 0; row < this.rows; row++) {
      const colPrint = [];
      for (let col = 0; col < this.columns; col++) {
        const key = `${row},${col}`;
        colPrint.push(this.initialMatrix.get(key)[prop]);
      }
      console.log(colPrint.join(" "));
    }
    console.log(`<-------${prop}Board---------`);
  }
}

class Snake {
  constructor(length, snakeList) {
    this.length = Number(length);
    this.startingPosition = this.getFreeStartingPosition(snakeList);
    this.startingPosition.used = true;

    this.currentPosition = this.startingPosition;
    this.path = []; // [R,D,L]
    this.score = this.startingPosition.score;
  }

  pathfinding() {
    const current_c = this.startingPosition.c;
    const current_r = this.startingPosition.r;
    let possibleNextPositions = [];

    // left
    if (current_c > 0) {
      // can move left
      const nextLeft = board.initialMatrix.get(`${current_r},${current_c - 1}`);
      //and is no wormhole and field is not used by another snake
      if (nextLeft.value !== "*" && !nextLeft.used)
        possibleNextPositions.push(nextLeft);
    }

    // right
    if (current_c < board.columns - 1) {
      // can move left
      const nextRight = board.initialMatrix.get(
        `${current_r},${current_c + 1}`
      );
      //and is no wormhole and field is not used by another snake
      if (nextRight.value !== "*" && !nextRight.used)
        possibleNextPositions.push(nextRight);
    }

    // up
    if (current_r > 0) {
      // can move left
      const nextUp = board.initialMatrix.get(`${current_r - 1},${current_c}`);
      //and is no wormhole and field is not used by another snake
      if (nextUp.value !== "*" && !nextUp.used)
        possibleNextPositions.push(nextUp);
    }

    // down
    if (current_r < board.rows - 1) {
      // can move left
      const nextDown = board.initialMatrix.get(`${current_r + 1},${current_c}`);
      //and is no wormhole and field is not used by another snake
      if (nextDown.value !== "*" && !nextDown.used)
        possibleNextPositions.push(nextDown);
    }

    possibleNextPositions.sort((a,b) => a.score > b.score ? -1 : 1)
    console.log("possibleNextPositions", possibleNextPositions);
  }

  getFreeStartingPosition(snakeList) {
    let positionTaken = true;
    let r, c;
    do {
      r = randomInt(0, board.rows - 1);
      c = randomInt(0, board.columns - 1);

      // should not be wormhole
      if (board.initialMatrix.get(`${r},${c}`).value === "*") {
        //console.log("position is wildcard -skipping", r, c);
        continue;
      }

      // should not be taken by another snake
      else if (board.initialMatrix.get(`${r},${c}`).used) {
        //console.log("position is already taken", r, c);
        continue;
      } else {
        positionTaken = false;
      }
    } while (positionTaken);

    //console.log("using ", r, c, board.initialMatrix.get(`${r},${c}`));
    return board.initialMatrix.get(`${r},${c}`);
  }

  resetStartingPosition(startingPosition) {
    this.startingPosition = board.initialMatrix.get(startingPosition);
    this.currentPosition = board.initialMatrix.get(startingPosition);
  }

  getFullPath() {
    return [this.startingPosition.r, this.startingPosition.c]
      .concat(this.path)
      .join(" ");
  }

  moveLeft() {
    this.currentPosition = board.initialMatrix.get(
      `${this.currentPosition.r - 1},${this.currentPosition.c}`
    );
    this.path.push("L");
    console.log("moveLeft to " + this.currentPosition)
    this.score += this.currentPosition.score;
  }

  moveRight() {
    this.currentPosition = board.initialMatrix.get(
      `${this.currentPosition.r + 1},${this.currentPosition.c}`
    );
    this.path.push("R");
    console.log("moveRight to " + this.currentPosition.r, this.currentPosition.c + 1)
    this.score += this.currentPosition.score;
  }

  moveUp() {
    this.currentPosition = board.initialMatrix.get(
      `${this.currentPosition.r},${this.currentPosition.c - 1}`
    );
    this.path.push("U");
    console.log("moveUp to " + this.currentPosition.r, this.currentPosition.c + 1)
    this.score += this.currentPosition.score;
  }

  moveDown() {
    this.currentPosition = board.initialMatrix.get(
      `${this.currentPosition.r},${this.currentPosition.c + 1}`
    );
    this.path.push("D");
    console.log("moveDown to " + this.currentPosition.r, this.currentPosition.c + 1)
    this.score += this.currentPosition.score;
  }
}

const board = new Board(data);

// create Snakes
const snakeList = [];
for (const length of data[1].split(" ")) {
  const snake = new Snake(length, snakeList);
  snakeList.push(snake);
}

//console.log(snakeList)

/*
 * Export parsed and objectified input data
 */
export { data, filename, board, snakeList };
