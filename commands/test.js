import { registerCommand } from "../commandManager"
import { trackCollection, resetTest } from "../render/guis/miningtestGui"
import constants from "../util/constants"


export default registerCommand({
    aliases: ["test"],
    description: "Manages mining test",
    category: "miscellaneous",
    options: ["(start, reset, set, resetpbs)"],
    subcommands: [["start", "reset","set","resetpbs"]],
    execute: (args) => {
        let timer = constants.data.timerGui.timer
        if(args[1] == undefined)
            return ChatLib.chat(`${constants.PREFIX}&bOptions are: &3start&b, &3reset&b, &3set&b, &3resetpbs&b.`)
        if (args[1].toLowerCase() == "set"){
            trackCollection(args[2])
            resetTest()
        }
        else if(constants.data.tracked.collectionName == undefined){
            ChatLib.chat(`${constants.PREFIX}&bNo collection selected please run "/cw test set" first`)
        }
        else if(args[1].toLowerCase() == "start")
        {   
            if(args[2] == undefined)
                timer = 1800
            else if(args[2].includes("h"))
                timer = parseInt(args[2])*60*60 ?? 0
            else if(args[2].includes("m"))
                timer = parseInt(args[2])*60 ?? 0
            else
                timer = parseInt(args[2]) ?? 0
            
            constants.data.testTitlePlay = true
            constants.data.miningtestgui.istestactive = true
            constants.data.save()
            ChatLib.chat(`${constants.PREFIX}&bSet timer to ${Math.floor(timer/60)}m ${Math.ceil(timer%60)}s`)
        }
        else if (args[1].toLowerCase() == "reset"){
            resetTest()
        ChatLib.chat(`${constants.PREFIX}&bTest has been reset!`)
    }
        else if(args[1].toLowerCase() == "resetpbs"){
            if (args[2] == undefined){
                ChatLib.chat(`${constants.PREFIX}&bAre you sure you want to delete all pb's this is irreversible!`)
                const confirmreset = new Message(
                    new TextComponent("&a[Yes]  ").setClick("run_command", "/cw test resetpbs confirm"),
                    new TextComponent("    &4[No]").setClick("run_command", "/cw test resetpbs cancel")
                );
                canceling = true
                ChatLib.chat(confirmreset)
            }
            else if (args[2].toLowerCase() == "confirm" && canceling){
                resetpbs()
                ChatLib.chat(`${constants.PREFIX}&bPb's reset`)
            } else if (args[2].toLowerCase() == "cancel" && canceling){
                ChatLib.chat(`${constants.PREFIX}&bReset canceled :D`)
            }
        }
        else
            return ChatLib.chat(`${constants.PREFIX}&bOptions are: &3start&b, &3reset&b, &3set&b, &3resetpbs&b.`)
        constants.data.miningtestgui.timer = timer
        constants.data.miningtestgui.maxtimer = timer
        constants.data.save()
    }
})

function resetpbs(){
    constants.pbs["Coal"] = 0
    constants.pbs["Cobblestone"] = 0
    constants.pbs["Diamond"] = 0
    constants.pbs["Emerald"] = 0
    constants.pbs["End Stone"] = 0
    constants.pbs["Glacite"] = 0
    constants.pbs["Glossy Gemstone"] = 0
    constants.pbs["Glowstone Dust"] = 0
    constants.pbs["Gold Ingot"] = 0
    constants.pbs["Hard Stone"] = 0
    constants.pbs["Ice"] = 0
    constants.pbs["Iron Ingot"] = 0
    constants.pbs["Lapis Lazuli"] = 0
    constants.pbs["Mithril"] = 0
    constants.pbs["Mycelium"] = 0
    constants.pbs["Netherrack"] = 0
    constants.pbs["Nether Quartz"] = 0
    constants.pbs["Obsidian"] = 0
    constants.pbs["Red Sand"] = 0
    constants.pbs["Redstone"] = 0
    constants.pbs["Refined Mineral"] = 0
    constants.pbs["Sand"] = 0
    constants.pbs["Sludge Juice"] = 0
    constants.pbs["Titanium"] = 0
    constants.pbs["Tungsten"] = 0
    constants.pbs["Umber"] = 0
    constants.pbs.save()

}