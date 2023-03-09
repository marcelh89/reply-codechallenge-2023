"use strict";
exports.__esModule = true;
exports.filename = exports.List_of_Enemies = exports.game = void 0;
var Definitions_1 = require("./Definitions");
var File_1 = require("./File");
var fs = require("fs");
/*
 * read input
 */
// read all files in inputs folder
var files = fs.readdirSync('./inputs');
var filename = files[5];
exports.filename = filename;
var content = (0, File_1.readFile)('./inputs/' + filename);
var data = content.split("\n");
// parse input
var player_stats = data[0].split(' ');
var Stamina_current = player_stats[0];
var Stamina_max = player_stats[1];
var Turns_max = player_stats[2];
var enemy_amount = player_stats[3];
console.log('Stamina_current: ' + Stamina_current);
console.log('Stamina_max: ' + Stamina_max);
console.log('Turns_max: ' + Turns_max);
console.log('enemy_amount: ' + enemy_amount);
// create player from parsed input
var player = new Definitions_1.Player(parseInt(Stamina_current), parseInt(Stamina_max));
//console.log(player)
var amount_demons = data.length;
var List_of_Enemies = [];
exports.List_of_Enemies = List_of_Enemies;
for (var i = 1; i < amount_demons; i++) {
    var deamon_stats = data[i].split(' ');
    var Stamina_cost = parseInt(deamon_stats[0]);
    var Turn_recover = parseInt(deamon_stats[1]);
    var Stamina_gain = parseInt(deamon_stats[2]);
    var amount_of_turns_gain_fragments = parseInt(deamon_stats[3]);
    //fragments_list_length = len(deamon_stats)
    var fragments_list_length = deamon_stats.length;
    //console.log(fragments_list_length)
    var list_of_fragments = [];
    for (var j = 4; j < fragments_list_length; j++) {
        list_of_fragments.push(parseInt(deamon_stats[j]));
    }
    var demon = new Definitions_1.Demon(i, Stamina_cost, Turn_recover, Stamina_gain, list_of_fragments);
    List_of_Enemies.push(demon);
}
// create game
var game = new Definitions_1.Game(player, parseInt(Turns_max), [], List_of_Enemies, []);
exports.game = game;
