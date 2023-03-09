// get input and parse
import {data, dummyModel, filename} from "./DataManager.js";
import {writeOutput} from "./utils.js";
import useTheAlgorithm from "./Algo.js";

console.log("input", data, dummyModel, filename);

// use the algorithm
const calculatedData = useTheAlgorithm()

// write to output
const output = calculatedData.join("\n")
writeOutput(`outputs/${filename}`, output)

