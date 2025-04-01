import constants from "../util/constants"

register("chat", (Skymall) => {
    switch (Skymall){
        case "-20% Pickaxe Ability cooldowns":
        constants.data.currentSkymall = Skymall
        constants.data.save()
        break
        case "Gain +100⸕ Mining Speed":
        constants.data.currentSkymall = Skymall
        constants.data.save()
        break
        case "Gain +50☘ Mining Fortune":
        constants.data.currentSkymall = Skymall
        constants.data.save()
        break
        case "Gain +15% more Powder while mining":
        constants.data.currentSkymall = Skymall
        constants.data.save()
        break
        case "Gain 5x Titanium drops":
        constants.data.currentSkymall = Skymall
        constants.data.save()
        break
        case "10x chance to find Golden and Diamond Goblins":
        constants.data.currentSkymall = Skymall
        constants.data.save()
        break
    }
}).setCriteria(/New buff: (.*?)\.$/g)