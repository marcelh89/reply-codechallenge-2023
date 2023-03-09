import { Demon, Player, Game } from './Definitions'
import {readFile} from './File'
import * as fs from "fs";

/*
 * read input
 */

// read all files in inputs folder
var files = fs.readdirSync('./inputs');
const filename =  files[5]

const content = readFile('./inputs/' + filename)
const data = content.split("\n")

// parse input
const player_stats = data[0].split(' ')
const Stamina_current = player_stats[0]
const Stamina_max     = player_stats[1]
const Turns_max       = player_stats[2]
const enemy_amount    = player_stats[3]

console.log('Stamina_current: ' + Stamina_current)
console.log('Stamina_max: ' + Stamina_max)
console.log('Turns_max: ' + Turns_max)
console.log('enemy_amount: ' + enemy_amount)

// create player from parsed input
let player = new Player(parseInt(Stamina_current), parseInt(Stamina_max));
//console.log(player)

const amount_demons = data.length

const List_of_Enemies = []

for (let i = 1 ; i < amount_demons; i++){
        const deamon_stats = data[i].split(' ')
        const Stamina_cost = parseInt(deamon_stats[0])
        const Turn_recover = parseInt(deamon_stats[1])
        const Stamina_gain = parseInt(deamon_stats[2])
        const amount_of_turns_gain_fragments = parseInt(deamon_stats[3])
        //fragments_list_length = len(deamon_stats)
        const fragments_list_length = deamon_stats.length
        //console.log(fragments_list_length)
        const list_of_fragments = []
        for (let j = 4 ; j < fragments_list_length; j++){
            list_of_fragments.push(parseInt(deamon_stats[j]))
        }

        let demon = new Demon(i, Stamina_cost, Turn_recover, Stamina_gain, list_of_fragments);
        List_of_Enemies.push(demon);

}

// create game
let game = new Game(player, parseInt(Turns_max), [], List_of_Enemies, []);

export {
    game,
    List_of_Enemies,
    filename
}

