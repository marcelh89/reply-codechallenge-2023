// Include fs module 
const fs = require('fs');

module.exports = {
    readFile, writeOutput
}

/**
 * read from file (in sync mode)
 * @param {*} path 
 */
function readFile(path) {

    const data = fs.readFileSync(path,
        { encoding: 'utf8', flag: 'r' });

    return data;

}

/**
 * write to a file (in sync mode)
 * @param {*} path 
 * @param {*} data 
 */
function writeOutput(path, data) {

    try {
        fs.writeFileSync(path, data, {  encoding: 'utf8', flag: 'w' }); 
        console.log("File written successfully");
    } catch (err) {
        console.error(err);
    }

}