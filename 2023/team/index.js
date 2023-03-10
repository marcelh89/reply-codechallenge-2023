// get input and parse
import {filename, board, snakeList} from "./DataManager.js";
import {writeOutput} from "./utils.js";
import useTheAlgorithm from "./Algo.js";

console.log("input", board, snakeList, filename);

// use the algorithm
const calculatedData = useTheAlgorithm(board,snakeList)

// write to output
//const output = calculatedData.join("\n")
//writeOutput(`outputs/${filename}`, output)

