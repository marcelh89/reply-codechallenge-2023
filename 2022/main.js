"use strict";
exports.__esModule = true;
var algo_1 = require("./algo");
var Definitions_1 = require("./Definitions");
var Data_Manager_1 = require("./Data_Manager");
var File_1 = require("./File");
function get_fragments(game, turn) {
    var reward = 0;
    for (var _i = 0, _a = game.deadDemon; _i < _a.length; _i++) {
        var d = _a[_i];
        reward += d.demon.fragmentReward[turn - d.turnKilled];
    }
    return reward;
}
function get_stamina(game, turn) {
    var recovery = 0;
    for (var _i = 0, _a = game.deadDemon; _i < _a.length; _i++) {
        var d = _a[_i];
        if (turn - d.turnKilled == d.demon.waitTimeTillRecovery) {
            recovery += d.demon.staminaRecovered;
        }
    }
    return recovery;
}
var _loop_1 = function () {
    console.log("------------");
    console.log("Game Round " + i);
    /*
    1. stamina vom spieler - comsumption per round
    2. suche deamon raus
    3. töte deamon, adde in tote_deamon liste
    4. get_rewards aus liste der toten deamons
    */
    /*
     for(let regain of game.staminaRegain){
         regain.turnsTillRegain =- 1;
         if(regain.turnsTillRegain == 0){
             game.player.stamina += regain.staminaToRegain
         }
     }
     */
    Data_Manager_1.game.player.stamina += get_stamina(Data_Manager_1.game, i);
    console.log("game.player.stamina " + Data_Manager_1.game.player.stamina);
    /*
    for(let reward of game.rewards){
        console.log(reward)
        game.totalAwards += reward.pop();
    }
    */
    Data_Manager_1.game.totalAwards += get_fragments(Data_Manager_1.game, i);
    console.log("game.totalAwards " + Data_Manager_1.game.totalAwards);
    // calculate demons available by removing
    var deadDemonIds = Data_Manager_1.game.deadDemon.length ? Data_Manager_1.game.deadDemon.map(function (dd) { return dd.demon.id; }) : [];
    console.log("deadDemonIds " + deadDemonIds);
    var demonsLeft = Data_Manager_1.game.demonsAvailable.filter(function (demon) { return !deadDemonIds.includes(demon.id); });
    console.log("demonsLeft " + demonsLeft);
    // if no demons are left to kill -- end loop
    if (!demonsLeft.length)
        return "break";
    // chooseNextDemon
    var nextDemon = (0, algo_1["default"])(demonsLeft, Data_Manager_1.game.player, Data_Manager_1.game.totalRounds - i);
    console.log("nextDemon " + nextDemon);
    var demon = Data_Manager_1.game.demonsAvailable.find(function (demon) { return demon.id === nextDemon; });
    if (!demon)
        return "continue";
    var deadDemon = new Definitions_1.DeadDemon(demon, i);
    console.log("deadDemon " + deadDemon);
    Data_Manager_1.game.deadDemon.push(deadDemon);
};
for (var i = 0; i < Data_Manager_1.game.totalRounds; i++) {
    var state_1 = _loop_1();
    if (state_1 === "break")
        break;
}
// write output file
console.log(Data_Manager_1.game.deadDemon.length);
var output = Data_Manager_1.game.deadDemon.map(function (dd) { return dd.demon.id; }).join('\n');
(0, File_1.writeOutput)("outputs/".concat(Data_Manager_1.filename), output);
