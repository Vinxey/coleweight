import { registerGui } from "../../guiManager"
import settings from "../../settings"
import { capitalizeFirst, dwarvenChecker, endChecker, hollowsChecker, isPlayerHoldingDrill, Title } from "../../util/helperFunctions"
import { BaseGui } from "../BaseGui"

//initializes ability from data  
activeAbilities = undefined
addAbility(constants.data.currentAbility, 0)


//initializes ability from data  
activeAbilities = undefined
addAbility(constants.data.currentAbility, 0) 
const miningAbilitiesGui = new BaseGui(["abilityGui", "miningabilities"], () => {
    if(!checkAreas())
        return
    let leftValues = [],
     rightValues = []

    activeAbilities.forEach(ability => {
        if(settings.miningAbilitiesSelectedIndicator && ability.name == selectedAbility)
            leftValues.push(`&e${ability.name} CD`)
        else
            leftValues.push(`${ability.name} CD`)
        rightValues.push(ability.timer + "s")
    })

    if(miningAbilitiesGui.isOpen() && leftValues.length < 1)
    {
        leftValues.push("Mining Speed Boost")
        rightValues.push("0")
    }
    let message = ""

    leftValues.forEach((value, i) => {
        message += "&a" + value + ": &b" + rightValues[i] + "\n"
    })

    return message
}, () => { return miningAbilitiesGui.isOpen() || settings.miningAbilitiesGui})
let activeAbilities = [],
 selectedAbility

function checkAreas()
{
    if(dwarvenChecker.check() || hollowsChecker.check() || endChecker.check()) return true
    return false
}

registerGui(miningAbilitiesGui)

register("step", () => {
    activeAbilities.forEach(ability => {
        if(ability.timer > 0)
            ability.timer -= 1
        else if (ability.title.drawState == 0 && settings.miningAbilities)
            ability.title.draw()
    })
}).setDelay(1)


//gets skymall and saves it to data could be used for other things also but mainly just doing for 20% cooldown reduction thing


//gets ability through you used your {ability name} message
register("chat", (abilityName) =>{
    //sets timer to 0 otherwise timer becomes undefined cause javascript is awsome and idc enough to fix it properly
    constants.data.currentAbility = abilityName
    constants.data.save()
    addAbility(abilityName, 0)
}).setCriteria(/&r&aYou used your &r&6([a-zA-Z ]+) &r&aPickaxe Ability!&r/g)

//gets ability through hotm selection
register("chat", (abilityName) =>{
    constants.data.currentAbility = abilityName
    constants.data.save()
    addAbility(abilityName)
}).setCriteria(/&r&aYou used your &r&6(.+) &r&aPickaxe Ability!&r/g)


register("worldLoad", () => {
    activeAbilities.forEach(ability => {
        ability.timer = ability.maxTimer/2
    })
})


register("chat", (abilityName, event) => {
    selectedAbility = capitalizeFirst(abilityName)
}).setCriteria(/&r&aYou selected &r&e(.+) &r&aas your Pickaxe Ability. This ability will apply to all of your pickaxes!&r/g)


register("chat", (cdSeconds, event) => {
    if(selectedAbility == undefined || !isPlayerHoldingDrill()) return
    addAbility(selectedAbility, cdSeconds)
}).setCriteria(/&r&cThis ability is on cooldown for (.+)s.&r/g)


function addAbility(abilityName, timer = 0)
{
    let found = false
    let maxTimer

    switch(capitalizeFirst(abilityName))
    {
        case "Pickobulus":
            maxTimer = 110
            break
        case "Vein seeker":
            maxTimer = 60
            break
        case "Gemstone Infusion":
        case "Hazardous Miner":
            maxTimer = 140
            break
        default:
            maxTimer = 120
    }

    //checks for active pet for bal
    if (constants.data.currentPet == "bal"){
        Bal = true
    }else {
        Bal = false
    }

    //checks if skymall has cooldown reduction
    if (constants.data.currentSkymall == "-20% Pickaxe Ability cooldowns"){
        Skymall = true
    } else{
        Skymall = false
    }
    //if the timer has finished set the new timer based on buffs
    if (timer <= 0) {
        let multiplier = 1
        
        //if only perf tank 10% reduction
        if (settings.PerfectFuelTank) multiplier *= 0.9

        //if only bal tank 10% reduction
        if (Bal) multiplier *= 0.9

        //if only skymall tank 20% reduction
        if (Skymall) multiplier *= 0.8
    
        //if all buffs ~35% reduction
        if (settings.PerfectFuelTank && Bal && Skymall) multiplier = 0.648

        //if Skymall + other 28% reduction
        else if ((settings.PerfectFuelTank && Skymall) || (Bal && Skymall)) multiplier = .72

        //if tank + Bal 19% reduction
        else if (settings.PerfectFuelTank && Bal) multiplier = 0.81        
        timer = Math.round(maxTimer * multiplier)
    }
    
    
    //if ability is swapped change the name of the ability on the gui
    if (activeAbilities != undefined && abilityName != activeAbilities.name){
            found = true
            drawTimestamp = undefined
            ability.title.drawState = 0
            ability.timer = timer
        }
    

    if (!found)
    {
        let object = {timer, name: abilityName, title: new Title({text: `&6[&3&kd&6] &b&l${abilityName}&6 [&3&kd&6]`})}
        activeAbilities = (object)
        drawTimestamp = timer
        activeAbilities.title.drawState = 0
        activeAbilities.timer = timer
    }
}