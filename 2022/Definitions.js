"use strict";
exports.__esModule = true;
exports.Game = exports.Demon = exports.DeadDemon = exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(stamina, maxStamina) {
        this.stamina = stamina;
        this.maxStamina = maxStamina;
    }
    return Player;
}());
exports.Player = Player;
var Demon = /** @class */ (function () {
    function Demon(id, staminaRequired, waitTimeTillRecovery, staminaRecovered, fragmentReward) {
        this.id = id;
        this.staminaRequired = staminaRequired;
        this.waitTimeTillRecovery = waitTimeTillRecovery;
        this.staminaRecovered = staminaRecovered;
        this.fragmentReward = fragmentReward;
    }
    Demon.prototype.toString = function () {
        return this.id;
    };
    return Demon;
}());
exports.Demon = Demon;
var DeadDemon = /** @class */ (function () {
    function DeadDemon(demon, turnKilled) {
        this.demon = demon;
        this.turnKilled = turnKilled;
    }
    DeadDemon.prototype.toString = function () {
        return this.demon.id;
    };
    return DeadDemon;
}());
exports.DeadDemon = DeadDemon;
var Game = /** @class */ (function () {
    function Game(player, totalRounds, rewards, demonsAvailable, deadDemon) {
        this.player = player;
        this.totalRounds = totalRounds;
        this.rewards = rewards;
        this.demonsAvailable = demonsAvailable;
        this.deadDemon = deadDemon;
        this.totalAwards = 0;
    }
    return Game;
}());
exports.Game = Game;
