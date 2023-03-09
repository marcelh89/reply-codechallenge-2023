import {Demon, Player} from "./Definitions";

class DemonData{
    demon:Demon;
    fragementsPerStamina:number;
}

function chooseNextDemon(demonsAvailable:Demon[], player:Player, remainingTurns:number){

    console.log("chooseNextDemon")

    let demonsData:DemonData[] = [];
    for(let demon of demonsAvailable){

        if(demon.staminaRequired > player.stamina){
            continue;
        }
        let fragementsGained = demon.fragmentReward.slice(0, remainingTurns).reduce((partialSum, a) => partialSum + a, 0);

        let fragementsPerStamina = remainingTurns > demon.waitTimeTillRecovery ? fragementsGained / (demon.staminaRequired - demon.staminaRecovered) : fragementsGained / demon.staminaRequired;
        
        let demonData = new DemonData();
        demonData.demon = demon;
        demonData.fragementsPerStamina = fragementsPerStamina;
        demonsData.push(demonData);
    }

    if(demonsData.length === 0) return demonsData

    return demonsData.sort((a, b) => (a.fragementsPerStamina > b.fragementsPerStamina) ? 1 : (a.fragementsPerStamina === b.fragementsPerStamina) ? ((a.fragementsPerStamina > b.fragementsPerStamina) ? 1 : -1) : -1 )[0].demon.id;
}

export default chooseNextDemon