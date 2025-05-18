import { registerGui } from "../../guiManager"
import settings from "../../settings"
import { gtChecker, dwarvenChecker, endChecker, hollowsChecker, Title } from "../../util/helperFunctions"
import { BaseGui } from "../BaseGui"
import constants from "../../util/constants"
import { registerWhen } from "../../util/helperFunctions"

abilitylist = ['Mining Speed Boost'
,'Pickobulus'
,'Maniac Miner'
,'Anomalous Desire'
,'Sheer Force'
,'Gemstone Infusion']

titleshown = true
blegg = false
tankCooldown = 1
start = true
findReduction(constants.data.currentAbility)
const miningAbilitiesGui = new BaseGui(["abilityGui", "Mining Ability Cooldowns"], () => {
    if(constants.data.guiGui){
            return `&eMining Speed Boost: &b95s\n&aActive! &7(20s)`
    }
    if(!checkAreas() || constants.data.currentAbility == "" || !settings.miningAbilitiesGui){
            return ''
    }
    let message = ``
    message = `&e${constants.data.currentAbility}: &b${cooldowntimer}s\n`
    if (activetimer > 0){
        message += `&aActive! &7(${activetimer}s)`
    }
    return message
}, () => { return miningAbilitiesGui.isOpen() || settings.miningAbilitiesGui || constants.data.guiGui})

function checkAreas()
{
    if(gtChecker.check() || dwarvenChecker.check() || hollowsChecker.check() || endChecker.check() ||dwarvenChecker.check()) return true
    return false
}

registerGui(miningAbilitiesGui)

let tittle = new Title({text: `&6[&3&kd&6] &b&l${constants.data.currentAbility}&6 [&3&kd&6]`})
registerWhen(register("step", () => {
        if(activetimer > 0){
            activetimer--
        }
        if(cooldowntimer > 0)
            cooldowntimer -= 1
        else if (settings.miningAbilities && cooldowntimer == 0 && !titleshown)
            tittle.draw()
            titleshown = true
}).setDelay(1),()=>{return settings.miningAbilitiesGui && constants.data.currentAbility != ""})


//gets ability through you used your {ability name} message
registerWhen(register("chat", (abilityName) =>{
    //get the held item first as any delay could mess things up
    heldPick = Player.getHeldItem()
    constants.data.currentAbility = abilityName
    checkDrillParts(heldPick)
    findReduction(abilityName)
    titleshown = false
    constants.data.save()
}).setCriteria(/&r&aYou used your &r&6(.+) &r&aPickaxe Ability!&r/g),()=>{return settings.miningAbilitiesGui})


//gets ability through hotm selection
registerWhen(register("chat", (abilityName) =>{
    constants.data.currentAbility = abilityName
    constants.data.save()
}).setCriteria(/&r&aYou selected &r&e(.+) &r&aas your Pickaxe Ability\. This ability will apply to all of your pickaxes!&r/g),()=>{return settings.miningAbilitiesGui})


//gets ability name through "{ability} is now available" message
registerWhen(register("chat", (abilityName) => {
    if (checkAreas() && abilitylist.includes(abilityName)){
        constants.data.currentAbility = abilityName
        constants.data.save()
    }
}).setCriteria(/&r&a&r&6([a-zA-Z ]+) &r&ais now available!&r/g),()=>{return settings.miningAbilitiesGui})


//this is innacurate pretty often so im getting rid of it for now till i test more
/*registerWhen(register("chat", (cooldown) =>{
    print('a')
    if (constants.data.currentAbility != "" && cooldown != cooldowntimer){
        cooldowntimer = cooldown
}
}).setCriteria(/&r&cYour pickaxe ability is on cooldown for ([0-9]+)s\.&r/g),()=>{return settings.miningAbilitiesGui})*/


function checkDrillParts(heldPick){
    blegg = false
    tank = ''
    currentPick = heldPick.getLore()
    //find the tank and check for Omelette in held item and set cooldown reduction accordingly
    currentPick.forEach((line) => {
        if (line.includes('Tank')){
            tank = line
        }
        if (line == '§5§o§7§aBlue Cheese Goblin Omelette Part'){
            blegg = true
        }
    })
    switch(tank){
        case '§5§o§7§aPerfectly-Cut Fuel Tank':
            tankCooldown = .9
            break;
        case '§5§o§7§aGemstone Fuel Tank': 
            tankCooldown = .94
            break;
        case '§5§o§7§aTitanium-Infused Fuel Tank':
            tankCooldown = .96
            break;
        case '§5§o§7§aMithril-Infused Fuel Tank':
            tankCooldown = .98
            break;
        default: 
            tankCooldown = 1
            break;
    }
}


function findReduction(abilityName){
        reduction = 1
        switch(abilityName){
        case "Mining Speed Boost":
            if (blegg){
                activetimer = 20
            } else{
                activetimer = 15
            }
                maxTimer = 120
            break;
        case "Pickobulus":
            if (blegg){
                maxTimer = 40
            } else{
                maxTimer = 50
            }
            activetimer = 0
            break;
        case "Anomalous Desire":
            if (blegg){
                maxTimer = 100
            } else{
                maxTimer = 110
            }
            activetimer = 30
            break;
        case "Maniac Miner":
            if (blegg){
                activetimer = 35
            } else{ 
                activetimer = 30
            }
            maxTimer = 120
            break;
        case "Gemstone Infusion" || "Sheer Force":
            if (blegg){
                activetimer = 30
            } else{
                activetimer = 25
            }
            maxTimer = 120
            break;
        default:
                maxTimer = 0
                activetimer = 0
            break;
        
    }
    if (start){
        activetimer = 0
        start = false
    }
    //checks active pet for bal
    if (constants.data.currentPet == "bal"){
        Bal = .9
    }else {
        Bal = 1
    }

    //checks if skymall has cooldown reduction
    if (constants.data.currentSkymall == "-20% Pickaxe Ability cooldowns" && !endChecker.check()){
        Skymall = .8
    } else{
        Skymall = 1
    }
    reduction = Bal * Skymall * tankCooldown
    cooldowntimer = Math.round(maxTimer * reduction)
}

/* All ability use messages
&r&aYou used your &r&6Mining Speed Boost &r&aPickaxe Ability!&r
&r&aYou used your &r&6Pickobulus &r&aPickaxe Ability!&r
&r&aYou used your &r&6Maniac Miner &r&aPickaxe Ability!&r
&r&aYou used your &r&6Anomalous Desire &r&aPickaxe Ability!&r
&r&aYou used your &r&6Sheer Force &r&aPickaxe Ability!&r
&r&aYou used your &r&6Gemstone Infusion &r&aPickaxe Ability!&r
*/

/*All ability swap messages
&r&aYou selected &r&eMining Speed Boost &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r
&r&aYou selected &r&ePickobulus &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r
&r&aYou selected &r&eAnomalous Desire &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r
&r&aYou selected &r&eManiac Miner &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r
&r&aYou selected &r&eGemstone Infusion &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r
&r&aYou selected &r&eSheer Force &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r
*/