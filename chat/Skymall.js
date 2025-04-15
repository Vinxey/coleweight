import constants from "../util/constants"
let possible_perks = [
    "-20% Pickaxe Ability cooldowns",
    "Gain +100⸕ Mining Speed",
     "Gain +50☘ Mining Fortune",
     "Gain +15% more Powder while mining",
     "Gain 5x Titanium drops",
    "10x chance to find Golden and Diamond Goblins",
]

let possible_hotmperks = [
    "§5§o§8 ■ §7§a-20%§7 Pickaxe Ability cooldowns.",
    "§5§o§8 ■ §7Gain §6+100⸕ Mining Speed§7.",
    "§5§o§8 ■ §7Gain §6+50☘ Mining Fortune§7.",
    "§5§o§8 ■ §7Gain §a+15% §7more Powder while mining.",
    "§5§o§8 ■ §7Gain §a5x §9Titanium §7drops.",
    "§5§o§8 ■ §7§a10x §7chance to find Golden and"
]
let skymallIndexes = [10,19,28,37]


register("chat", (Skymall) => {
    if (!possible_perks.includes(Skymall)) return
    constants.data.currentSkymall = Skymall
    constants.data.save()
}).setCriteria(/New buff: (.*?)\.$/g)

register("chat", () => {
    constants.data.currentSkymall = possible_perks[4]
    constants.data.save()
}).setCriteria(/&r&eNew buff&r&r&r: &r&fGain &r&a5x &r&9Titanium &r&fdrops&r/g)

register("chat", (skymalltext) =>{
    if (skymalltext == "aEnabled"){
        found = false
        //delay so that the person isnt holding the skymall diamond making it null
        setTimeout(()=>{
            hotmMenu = Player.getContainer()
            skymallIndexes.forEach(i => {
                item = hotmMenu.getStackInSlot(i)
                if(item == '1xitem.diamond@0'){
                    name = item.getLore()[15]
                    if(possible_hotmperks.includes(name)){
                        constants.data.currentSkymall = possible_perks[possible_hotmperks.indexOf(name)]
                        constants.data.save() 
                        found = true
                    }
                }
            });
            if (!found){
                constants.data.currentSkymall = "&cSkymall couldnt be found \n&c/ctry turning it off and on again" 
            }
                   
        },100)
    }else{
        constants.data.currentSkymall = "&cSkymall is Disabled!"
    }
    constants.data.save() 
}).setCriteria(/&r&(aEnabled|cDisabled) Sky Mall&r/g)

register("chat",()=>{
    constants.data.currentSkymall = "&cSkymall is Disabled!"
    constants.data.save() 
}).setCriteria(/&r&aReset your &r&5Heart of the Mountain&r&a! Your Perks and Abilities have been reset.&r/g)