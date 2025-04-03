import { registerCommand } from "../../commandManager"
import constants from "../../util/constants"
import { waypointRender } from "../../util/helperFunctions"

const PREFIX = constants.PREFIX
let waypoints = []

register("renderWorld", () => {
    if(waypoints.length < 1) return
    waypointRender(waypoints)
})

register("worldLoad", () => {
    waypoints = []
})

registerCommand({
    aliases: ["automatons", "automaton"],
    description: "Automaton waypoints for precursor city.",
    options: "[toggle]",
    showInHelp: false,
    category: "waypoints",
    execute: (args) => {
        const WAYPOINTNAME = "Automatons"

        if(args[1] != "toggle")
        {
            new TextComponent(`${PREFIX}&bStand in the pot in &3this&b picture and do /cw ${WAYPOINTNAME} toggle`)
            .setClickAction("open_url")
            .setClickValue("https://i.imgur.com/i4V5tzU.png")
            .chat()
        }
        else
        {
            if(waypoints[0] == undefined)
            {
                let startPos = [Player.getX(), Player.getY(), Player.getZ()],
                x = startPos[0],
                y = startPos[1],
                z = startPos[2]

                waypoints = [
                    [x-8, y-3, z-3],
                    [x+38, y-4, z+45],
                    [x-5, y+17, z-25],
                    [x+45, y+8, z+53],
                    [x+43, y+22, z-8],
                    [x+13, y+14, z+53],
                    [x+59, y+8, z-5],
                    [x+10, y-22, z-27],
                    [x+30, y+15, z-33],
                    [x+35, y-28, z+16],
                    [x+5, y+40, z+56],
                    [x-14, y+8, z+11],
                    [x+45, y+43, z+55],
                    [x-18, y-3, z-25],
                    [x+2, y+8, z+16],
                    [x+18, y-11, z+0],
                    [x+39, y+8, z+52],
                    [x+56, y+34, z+6],
                    [x+17, y+36, z+53],
                    [x-15, y+17, z-9],
                    [x+56, y-28, z+19],
                    [x+45, y+43, z+53],
                    [x+28, y+36, z+45],
                    [x+24, y-3, z+19],
                    [x+57, y+8, z+1],
                    [x+38, y-18, z+40],
                    [x+14, y-18, z+36],
                    [x+40, y+8, z-24],
                    [x+35, y+8, z-15],
                    [x+37, y-28, z+8],
                    [x-13, y-27, z+5],
                    [x-15, y-27, z+22]
                ];
                
                ChatLib.chat(`${PREFIX}&b${WAYPOINTNAME} waypoints turned on!`)
            }
            else
            {
                waypoints = []
                ChatLib.chat(`${PREFIX}&b${WAYPOINTNAME} waypoints turned off!`)
            }
        }
    }
})
