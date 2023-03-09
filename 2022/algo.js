"use strict";
exports.__esModule = true;
var DemonData = /** @class */ (function () {
    function DemonData() {
    }
    return DemonData;
}());
function chooseNextDemon(demonsAvailable, player, remainingTurns) {
    console.log("chooseNextDemon");
    var demonsData = [];
    for (var _i = 0, demonsAvailable_1 = demonsAvailable; _i < demonsAvailable_1.length; _i++) {
        var demon = demonsAvailable_1[_i];
        if (demon.staminaRequired > player.stamina) {
            continue;
        }
        var fragementsGained = demon.fragmentReward.slice(0, remainingTurns).reduce(function (partialSum, a) { return partialSum + a; }, 0);
        var fragementsPerStamina = remainingTurns > demon.waitTimeTillRecovery ? fragementsGained / (demon.staminaRequired - demon.staminaRecovered) : fragementsGained / demon.staminaRequired;
        var demonData = new DemonData();
        demonData.demon = demon;
        demonData.fragementsPerStamina = fragementsPerStamina;
        demonsData.push(demonData);
    }
    if (demonsData.length === 0)
        return demonsData;
    return demonsData.sort(function (a, b) { return (a.fragementsPerStamina > b.fragementsPerStamina) ? 1 : (a.fragementsPerStamina === b.fragementsPerStamina) ? ((a.fragementsPerStamina > b.fragementsPerStamina) ? 1 : -1) : -1; })[0].demon.id;
}
exports["default"] = chooseNextDemon;
