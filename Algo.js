//import {getRandomInt} from './utils.js'
import { board, snakeList } from "./Models.js";
import { randomInt } from "crypto";

export default function useTheAlgorithm() {
  console.log("start algorithm");




  const fullscore = 0
  console.log("fullscore", fullscore)
  return generateOutput(snakeList);
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
  return snakeList.map(snake => snake.getFullPath())

  /*
  const snake1 = "0 0 R R D 7 2 R R";
  const snake2 = "6 1 L U L D L U";
  const snake3 = "1 1 R 3 4 R R R";
  const snake4 = "7 1 D 3 4 L";
  const snake5 = "9 0 U L";

  return [snake1, snake2, snake3, snake4, snake5];
  */
}
