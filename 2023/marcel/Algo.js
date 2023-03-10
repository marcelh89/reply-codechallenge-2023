//import {getRandomInt} from './utils.js'
import { board, snakeList } from "./Models.js";
import { randomInt } from "crypto";

export default function useTheAlgorithm() {
  console.log("start algorithm");

  //sort snakes by length and begin with the biggest
  snakeList.sort((a, b) => (a.length > b.length ? -1 : 1));
  //console.log(snakeList);

  let totalScore = 0;

  for (let snake of snakeList) {

    //const breakCondition = snake.path.length - 1 == snake.length; // TODO add wormhole extra condition here
    
    //do  {
      const nextPath = findNextPath(snake);
      console.log("nextPath", nextPath);
      snake[nextPath.action]();
      console.log(snake);

      console.log("breakCondition", snake.path.length - 1, snake.length)

    //} while (!breakCondition)

    totalScore += snake.score;

  }

  console.log("totalScore", totalScore);
  return generateOutput(snakeList);
}

function findNextPath(snake) {
  const current_c = snake.currentPosition.c;
  const current_r = snake.currentPosition.r;
  let possibleNextPositions = [];

  // left
  if (current_c > 0) {
    // can move left
    const nextLeft = board.initialMatrix.get(`${current_r},${current_c - 1}`);
    nextLeft.action = "moveLeft";

    //and is no wormhole and field is not used by another snake
    if (nextLeft.value !== "*" && !nextLeft.used)
      possibleNextPositions.push(nextLeft);
  }

  // right
  if (current_c < board.columns - 1) {
    // can move right
    const nextRight = board.initialMatrix.get(`${current_r},${current_c + 1}`);
    nextRight.action = "moveRight";
    //and is no wormhole and field is not used by another snake
    if (nextRight.value !== "*" && !nextRight.used)
      possibleNextPositions.push(nextRight);
  }

  // up
  if (current_r > 0) {
    // can move up
    const nextUp = board.initialMatrix.get(`${current_r - 1},${current_c}`);
    nextUp.action = "moveUp";
    //and is no wormhole and field is not used by another snake
    if (nextUp.value !== "*" && !nextUp.used)
      possibleNextPositions.push(nextUp);
  }

  // down
  if (current_r < board.rows - 1) {
    // can move down
    const nextDown = board.initialMatrix.get(`${current_r + 1},${current_c}`);
    nextDown.action = "moveDown";
    //and is no wormhole and field is not used by another snake
    if (nextDown.value !== "*" && !nextDown.used)
      possibleNextPositions.push(nextDown);
  }

  possibleNextPositions.sort((a, b) => (a.score > b.score ? -1 : 1));
  //console.log("possibleNextPositions", possibleNextPositions);
  return possibleNextPositions[0];
}

/**
 * 0 0 R R D 7 2 R R
 * 6 1 L U L D L U
 * 1 1 R 3 4 R R R
 * 7 1 D 3 4 L
 * 9 0 U L
 */
export function generateOutput(snakeList) {
  // TODO use snakeList to generate output
  return snakeList.map((snake) => snake.getFullPath());

  /*
  const snake1 = "0 0 R R D 7 2 R R";
  const snake2 = "6 1 L U L D L U";
  const snake3 = "1 1 R 3 4 R R R";
  const snake4 = "7 1 D 3 4 L";
  const snake5 = "9 0 U L";

  return [snake1, snake2, snake3, snake4, snake5];
  */
}
