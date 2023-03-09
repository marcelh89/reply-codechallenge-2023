class Player {
    stamina: number;
    maxStamina: number;

    constructor(stamina: number, maxStamina: number) {
        this.stamina = stamina;
        this.maxStamina = maxStamina;
    }

}

class Demon {
    id: number;
    staminaRequired: number;
    waitTimeTillRecovery: number;
    staminaRecovered: number;
    fragmentReward: number[];

    constructor(id: number, staminaRequired: number, waitTimeTillRecovery: number, staminaRecovered: number, fragmentReward: number[]) {
        this.id = id;
        this.staminaRequired = staminaRequired;
        this.waitTimeTillRecovery = waitTimeTillRecovery;
        this.staminaRecovered = staminaRecovered;
        this.fragmentReward = fragmentReward;
    }

    toString(){
        return this.id;
    }
}

class DeadDemon {
    demon: Demon
    turnKilled: number

    constructor(demon: Demon, turnKilled: number) {
        this.demon = demon;
        this.turnKilled = turnKilled;
    }

    toString(){
        return this.demon.id
    }
}

class Game {
    player: Player;
    totalRounds: number;
    rewards: number[];
    //staminaRegain: StaminaRegain[];

    totalAwards: number;
    //demonKillOrder: number[];
    deadDemon: DeadDemon[];
    demonsAvailable: Demon[];

    constructor(player: Player, totalRounds: number, rewards: number[], demonsAvailable: Demon[], deadDemon: DeadDemon[]) {
        this.player = player;
        this.totalRounds = totalRounds;
        this.rewards = rewards;
        this.demonsAvailable = demonsAvailable
        this.deadDemon = deadDemon
        this.totalAwards = 0
    }

}

/*
class StaminaRegain {
    staminaToRegain: number;
    turnsTillRegain: number;
}
 */


export {Player, DeadDemon, Demon, Game, /*StaminaRegain*/}