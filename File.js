"use strict";
exports.__esModule = true;
exports.writeOutput = exports.readFile = void 0;
exports.__esModule = true;
var fs = require("fs");
/**
 * read from file (in sync mode)
 * @param {*} path
 */
function readFile(path) {
    var data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    return data;
}
exports.readFile = readFile;
/**
 * write to a file (in sync mode)
 * @param {*} path
 * @param {*} data
 */
function writeOutput(path, data) {
    try {
        fs.writeFileSync(path, data, { encoding: 'utf8', flag: 'w' });
        console.log("File written successfully");
    }
    catch (err) {
        console.error(err);
    }
}
exports.writeOutput = writeOutput;
