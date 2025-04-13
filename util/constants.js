import PogObject from "PogData"
import axios from "../../axios"
import settings from "../settings"
import { updateRegisters } from "./helperFunctions"


let PogData = new PogObject("Coleweight", {
    "miningXP": 0,
    "professional": 0,
    "jungle_amulet": true,
    "first_time": true,
    "tracked": {},
    "itemStringed": "",
    "museum": [],
    "skymallDuringTest": [],
    "currentPet": "",
    "currentAbility":"",
    "currentSkymall":"",
    "effMinerEnabled": false,
    "lobbyswaps": 0,
    "fishExperation": 0,
    "powderPumpkinExperation": 0,
    "pristinePotatoExperation": 0,
    "truffleExperation": 0,
    "logoutTime": 0,
    "coleweightGui": {
        "x": 0.5,
        "y": 141,
        "alignment": 0,
        "scale": 1.0
    },
    "commissionGui": {
        "x": 0.5,
        "y": 141,
        "alignment": 0,
        "scale": 1.0
    },
    "powdertrackerGui": {
        "chests": 0,
        "gemstonePowder": 0,
        "mithrilPowder": 0,
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "timerGui": {
        "x": 0,
        "y": 0,
        "timer": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "alloyGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "stopwatchGui": {
        "x": 0,
        "y": 0,
        "stopwatch": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "downtimeGui" : {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "collectionGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "abilityGui": {
        "x": 0,
        "y": 0,
        "alignment": 1,
        "scale": 1.0
    },
    "miningtestgui": {
        "istestactive": false,
        "collectionName": '',
        "collectionGained": 0,
        "maxtimer": 0,
        "timer": 0,
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "skymallGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "consumablesGui":{
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "gyroGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "coinGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "ffGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "danceGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    },
    "scrapGui": {
        "x": 0,
        "y": 0,
        "alignment": 0,
        "scale": 1.0
    }
}, "config/data.json")


let PBs = new PogObject("Coleweight", {
        "setnewpb": "",
        "XP": 0,
        "Coal": 0,
        "Cobblestone": 0,
        "Diamond": 0,
        "Emerald": 0,
        "End Stone": 0,
        "Glacite": 0,
        "Glossy Gemstone": 0,
        "Glowstone Dust": 0,
        "Gold Ingot": 0,
        "Hard Stone": 0,
        "Ice": 0,
        "Iron Ingot": 0,
        "Lapis Lazuli": 0,
        "Mithril": 0,
        "Mycelium": 0,
        "Netherrack": 0,
        "Nether Quartz": 0,
        "Obsidian": 0,
        "Red Sand": 0,
        "Redstone": 0,
        "Refined Mineral": 0,
        "Sand": 0,
        "Sludge Juice": 0,
        "Titanium": 0,
        "Tungsten": 0,
        "Umber": 0,
}, "config/pbs.json")



const PREFIX = "&2[CW] "
export default constants = {
    PREFIX: PREFIX,
    CALCULATEERRORMESSAGE: `${PREFIX}&cInvalid arguments. '/cw calculate help' for more information.`,
    INVALIDARGS: `${PREFIX}&cInvalid arguments. '/cw help' for more information.`,
    VERSION: (JSON.parse(FileLib.read("Coleweight", "metadata.json"))).version,
    CWINFO: undefined,
    data: PogData,
    pbs: PBs,
    beta: false,
    checkedGemstoneStats: false,
    settings,
    isFiesta: false
}

let skymallPerkIndices = [10,19,28,37]

register("gameLoad", () => {
    axios.get("https://ninjune.dev/api/cwinfo?new=true")
    .then((res) => {
        constants.CWINFO = res.data
    })
    .catch((e) => {
    })
})


register("chat", (lvl, pet, skin, event) => {
    constants.data.currentPet = pet.toLowerCase()
    constants.data.save()
}).setCriteria(/&cAutopet &eequipped your &.\[Lvl ([0-9]+)] &.([a-zA-Z ]+)([a-z0-9 ✦&]+e!) &a&lVIEW RULE&r/g)


register("chat", (message, pet, event) => {
    if(message == "summoned")
        constants.data.currentPet = pet.toLowerCase()
    else if (message == "despawned")
        constants.data.currentPet = "N/A"

    constants.data.save()
}).setCriteria(/&r&aYou ([a-zA-Z]+) your &r&.([a-zA-Z✦ ]+)&r&a!&r/g)


register("chat", (state, event) => {
    constants.data.effMinerEnabled = state == "Enabled"
    constants.data.save()
}).setCriteria(/&r&.([a-zA-Z]+) Efficient Miner&r/g)


register("step", () => {
    let inventoryName = Player?.getContainer()?.getName()?.toString()
    if(inventoryName == undefined || (!inventoryName.includes("Heart of the Mountain") && !inventoryName.includes("SkyBlock Menu"))) return

    for (i = 0; i < skymallPerkIndices.length; i++)
    {
        let item = Player.getContainer().getStackInSlot(skymallPerkIndices[i])
        if (item == null) continue

        let itemName = item.getName().removeFormatting()
        let lore = item?.getLore()
        if(lore == undefined) return
        
        if(itemName.includes("Sky Mall")){
            let skymallPerk = lore[15]?.removeFormatting()
            skymallPerk = skymallPerk.substring(3, skymallPerk.length - 1)
            let skymallEnabled = lore[17]?.removeFormatting()

            if (!skymallEnabled.includes("ENABLED")) { 
                constants.data.currentSkymall = ""
                constants.data.save()
                return 
            }

            let possible_perks = [
                "-20% Pickaxe Ability cooldowns",
                "Gain +100⸕ Mining Speed",
                "Gain +50☘ Mining Fortune",
                "Gain +15% more Powder while mining",
                "Gain 5x Titanium drops",
                "10x chance to find Golden and Diamond Goblins",
            ]

            if (!possible_perks.includes(skymallPerk)) {
                return
            }
            constants.data.currentSkymall = skymallPerk
            constants.data.save()
            return
        }
    }
}).setFps(2) // @CrazyTech4

register("worldLoad", () => {
    Client.scheduleTask(20, updateRegisters);
    Client.scheduleTask(60, updateRegisters);
})


// ct load
updateRegisters()

// Event handler for GUI settings close.
register("guiClosed", (event) => {
    updateRegisters();
});


register("guiOpened", (event) => {
    updateRegisters();
});
