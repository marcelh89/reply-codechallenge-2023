import fs from "fs";
import {readFile} from "./utils.js";

/*
 * Read input
 */

const files = fs.readdirSync("./inputs");
const filename = files[0];

const content = readFile("./inputs/" + filename);
const data = content.split("\n");

/*
 * Create models
 */
class Player {
    constructor(name, player_stats) {
        this.name = name;
        this.staminaCurrent = player_stats[0];
        this.staminaMax = player_stats[1];
        this.turnsMax = player_stats[2];
        this.enemyAmount = player_stats[3];

        console.log("name: " + this.name);
        console.log("staminaCurrent: " + this.staminaCurrent);
        console.log("staminaMax: " + this.staminaMax);
        console.log("turnsMax: " + this.turnsMax);
        console.log("enemyAmount: " + this.enemyAmount);
    }
}

const dummyModel = new Player("fancyModel", data[0].split(" "));


/*
 * Export parsed and objectified input data
 */
export {data, dummyModel, filename};
