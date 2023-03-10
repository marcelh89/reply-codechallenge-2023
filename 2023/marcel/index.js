// get input and parse
import {filename, board, snakeList} from "./Models.js";
import {writeOutput} from "./utils.js";
import useTheAlgorithm from "./Algo.js";

//console.log("input", board, snakeList);

// use the algorithm
const calculatedData = useTheAlgorithm()

// write to output
const output = calculatedData.join("\n")
writeOutput(`outputs/${filename}`, output)

