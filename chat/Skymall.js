import constants from "../util/constants"

register("chat", (Skymall) => {
    let possible_perks = [
        "-20% Pickaxe Ability cooldowns",
        "Gain +100⸕ Mining Speed",
         "Gain +50☘ Mining Fortune",
         "Gain +15% more Powder while mining",
         "Gain 5x Titanium drops",
        "10x chance to find Golden and Diamond Goblins",
    ]
    if (!possible_perks.includes(Skymall)) return
    constants.data.currentSkymall = Skymall
}).setCriteria(/New buff: (.*?)\.$/g)
