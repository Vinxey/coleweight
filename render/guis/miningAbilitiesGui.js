import { registerGui } from "../../guiManager"
import settings from "../../settings"
import { capitalizeFirst, dwarvenChecker, endChecker, hollowsChecker, isPlayerHoldingDrill, Title } from "../../util/helperFunctions"
import { BaseGui } from "../BaseGui"
import constants from "../../util/constants"


//initializes ability from data  
activeAbilities = undefined
blegg = false
tankCooldown = 1
activetimer = 0
addAbility(constants.data.currentAbility, 0)


const miningAbilitiesGui = new BaseGui(["abilityGui", "miningabilities"], () => {
    if(!checkAreas() || constants.data.currentAbility == ""){ // had to add currentAbility check otherwise on first time timer would just say 0 forever and give errors etc
        if(miningAbilitiesGui.isOpen())
        {
            return `&aMining Speed Boost: &b0s\n`
        }
            return
    }
    let message = ``
    message = `&e${activeAbilities.name}: &b${activeAbilities.timer}s\n`
    if (activetimer > 0){
        message += `&aActive! &7(${activetimer}s)`
    }
    return message
}, () => { return miningAbilitiesGui.isOpen() || settings.miningAbilitiesGui})
 
function checkAreas()
{
    if(dwarvenChecker.check() || hollowsChecker.check() || endChecker.check() ||dwarvenChecker.check()) return true
    return false
}

registerGui(miningAbilitiesGui)

register("step", () => {
    if (constants.data.currentAbility != ""){// had to add currentAbility check otherwise on first time timer would just say 0 forever and give errors etc
        if(activetimer > 0){ //check if ability is active
            activetimer--
        }
        if(activeAbilities.timer > 0)
            activeAbilities.timer -= 1
        else if (activeAbilities.title.drawState == 0 && settings.miningAbilities)
            activeAbilities.title.draw()
    }

}).setDelay(1)


//gets ability through you used your {ability name} message
register("chat", (abilityName) =>{
    //sets timer to 0 otherwise timer becomes undefined cause javascript is awsome and idc enough to fix it properly
    currentPick = Player.getHeldItem()
    //do this on a seperate line as if it takes too long the item will switch when drill swapping
    currentPick = currentPick.getLore()
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
            tankCooldown = .06
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
    constants.data.currentAbility = abilityName
    constants.data.save()
    addAbility(abilityName, 0)
    activetimer = maxActiveTimer
}).setCriteria(/&r&aYou used your &r&6([a-zA-Z ]+) &r&aPickaxe Ability!&r/g)


//gets ability through hotm selection
register("chat", (abilityName) =>{
    constants.data.currentAbility = abilityName
    constants.data.save()
    addAbility(abilityName, activeAbilities.timer)
}).setCriteria(/&r&aYou selected &r&e([a-zA-Z ]+) &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r/g)


//gets ability name through "{ability} is now available" message
register("chat", (abilityName) => {
    constants.data.currentAbility = abilityName
    constants.data.save()
}).setCriteria(/&r&a&r&6([a-zA-Z ]+) &r&ais now available!&r/g)


//gets cooldown from chat cause sometimes its more accurate
register("chat", (cooldown) =>{
    if (constants.data.currentAbility != ""){
    addAbility(constants.data.currentAbility, cooldown)
}
}).setCriteria(/&r&cYour pickaxe ability is on cooldown for ([0-9]+)s.&r/g)



function addAbility(abilityName, timer = 0)
{
    let found = false
    let maxTimer

    // finds cooldown and length of each ability
    switch(constants.data.currentAbility){
        case "Mining Speed Boost":
            if (blegg){
                maxActiveTimer = 20
            } else{
                maxActiveTimer = 15
            }
                maxTimer = 120
            break;
        case "Pickobulus":
            if (blegg){
                maxTimer = 40
            } else{
                maxTimer = 50
            }
            maxActiveTimer = 0
            break;
        case "Anomalous Desire":
            if (blegg){
                maxTimer = 100
            } else{
                maxTimer = 110
            }
            maxActiveTimer = 30
            break;
        case "Maniac Miner":
            if (blegg){
                maxActiveTimer = 35
            } else{ 
                maxActiveTimer = 30
            }
            maxTimer = 120
            break;
        case "Gemstone Infusion" || "Sheer Force":
            if (blegg){
                maxActiveTimer = 30
            } else{
                maxActiveTimer = 25
            }
            maxTimer = 120
            break;
        default:
            maxTimer = 0
            maxActiveTimer = 0
            break;
        
    }

    //checks active pet for bal
    if (constants.data.currentPet == "bal"){
        Bal = .9
    }else {
        Bal = 1
    }

    //checks if skymall has cooldown reduction
    if (constants.data.currentSkymall == "-20% Pickaxe Ability cooldowns"){
        Skymall = .8
    } else{
        Skymall = 1
    }

    //if the timer has finished set the new timer based on buffs
    if (timer <= 0) {

        //calc timer based on reductions
        timer = Math.round(maxTimer * (Bal * Skymall * tankCooldown))
    }
    
    
    //if ability is swapped change the name of the ability on the gui
    if (activeAbilities != undefined && abilityName != activeAbilities.name){
            found = true
            activeAbilities.name = abilityName
            activeAbilities.title = new Title({text: `&6[&3&kd&6] &b&l${abilityName}&6 [&3&kd&6]`})
    }

    //if this is first check apply default attributes and create object
    if (!found)
    {
        let object = {timer, name: abilityName, title: new Title({text: `&6[&3&kd&6] &b&l${abilityName}&6 [&3&kd&6]`})}
        activeAbilities = (object)
        drawTimestamp = timer
        activeAbilities.title.drawState = 0
        activeAbilities.timer = timer
        print(timer)
    }
    blegg = false
    
}
