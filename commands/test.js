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
            if (!constants.data.miningtestgui.istestactive){
                resetTest()
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
                constants.data.miningtestgui.timer = timer
                constants.data.miningtestgui.maxtimer = timer
                constants.data.save()
                ChatLib.chat(`${constants.PREFIX}&bSet test timer to ${Math.floor(timer/60)}m ${Math.ceil(timer%60)}s`)
            } else {
            ChatLib.chat(`${constants.PREFIX}&bA test is already active to reset do "/cw test reset"`)
            }
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
    }
})

function resetpbs(){
    const collections = [
        "Coal", "Cobblestone", "Diamond", "Emerald", "End Stone", "Glacite",
        "Glossy Gemstone", "Glowstone Dust", "Gold Ingot", "Hard Stone", "Ice",
        "Iron Ingot", "Lapis Lazuli", "Mithril", "Mycelium", "Netherrack",
        "Nether Quartz", "Obsidian", "Red Sand", "Redstone", "Refined Mineral",
        "Sand", "Sludge Juice", "Titanium", "Tungsten", "Umber"
    ];

    collections.forEach(collection => {
        constants.pbs[collection] = 0;
    });

    constants.pbs.save()
}
