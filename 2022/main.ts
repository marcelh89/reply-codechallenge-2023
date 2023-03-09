import chooseNextDemon from "./algo";
import {Player, Game, Demon, DeadDemon} from "./Definitions";
import {game, List_of_Enemies, filename} from "./Data_Manager"
import {writeOutput} from "./File";

function get_fragments(game: Game, turn: number): number {
    let reward = 0
    for (let d of game.deadDemon) {
        reward += d.demon.fragmentReward[turn-d.turnKilled]
    }

    return reward
}

function get_stamina(game: Game, turn: number): number {
    let recovery = 0
    for (let d of game.deadDemon) {
        if (turn-d.turnKilled == d.demon.waitTimeTillRecovery) {
            recovery += d.demon.staminaRecovered
        }
    }
    return recovery
}

for (var i = 0; i < game.totalRounds; i++) {

    console.log("------------")
    console.log("Game Round " + i)


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

    game.player.stamina += get_stamina(game,i);
    console.log("game.player.stamina " + game.player.stamina)

    /*
    for(let reward of game.rewards){
        console.log(reward)
        game.totalAwards += reward.pop();
    }
    */

    game.totalAwards += get_fragments(game,i);
    console.log("game.totalAwards " + game.totalAwards)


    // calculate demons available by removing
    const deadDemonIds = game.deadDemon.length ? game.deadDemon.map(dd => dd.demon.id) : [];
    console.log("deadDemonIds " + deadDemonIds)
    const demonsLeft = game.demonsAvailable.filter(demon => !deadDemonIds.includes(demon.id))
    console.log("demonsLeft " + demonsLeft)


    // if no demons are left to kill -- end loop
    if(!demonsLeft.length)
        break;

    // chooseNextDemon
    let nextDemon = chooseNextDemon(demonsLeft, game.player, game.totalRounds-i);
    console.log("nextDemon " + nextDemon)

    const demon = game.demonsAvailable.find(demon => demon.id === nextDemon);
    if(!demon) continue

    const deadDemon = new DeadDemon(demon, i)
    console.log("deadDemon " + deadDemon)
    game.deadDemon.push(deadDemon);

}


// write output file
console.log(game.deadDemon.length)
let output = game.deadDemon.map(dd => dd.demon.id).join('\n');
writeOutput(`outputs/${filename}`, output)
