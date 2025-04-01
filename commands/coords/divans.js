import { registerCommand } from "../../commandManager"
import constants from "../../util/constants"
import { waypointRender } from "../../util/helperFunctions"

const PREFIX = constants.PREFIX
let divanWaypoints = []


register("renderWorld", () => {
    waypointRender(divanWaypoints)
})


register("worldLoad", () => {
    divanWaypoints = []
})


registerCommand({
    aliases: ["divans", "divan"],
    description: "Divan treasure waypoints for Mines of Divan.",
    options: "[toggle]",
    category: "waypoints",
    execute: (args) => {
        const WAYPOINTNAME = "Divan"

        if(args[1] != "toggle")
        {
            new TextComponent(`${PREFIX}&bGo to the middle of jade crystal then do /cw coords divans toggle.`)
            .chat()
        }
        else
        {
            if(divanWaypoints[0] == undefined)
            {
                let startPos = [Player.getX(), Player.getY(), Player.getZ()],
                x = startPos[0],
                y = startPos[1],
                z = startPos[2]

                console.log(x + " " + y + " " + z)
                divanWaypoints = [
                    [x+1, y-40, z-20],
                    [x+30, y-39, z-25],
                    [x-31, y-39, z-12],
                    [x+1, y-39, z+20],
                    [x-14, y-39, z+43],
                    [x-12, y-39, z-44],
                    [x-20, y-40, z+0],
                    [x+22, y-39, z-14],
                    [x+29, y-39, z-44],
                    [x+12, y-39, z+7],
                    [x+23, y-40, z-39],
                    [x-37, y-39, z+11],
                    [x+7, y-39, z+11],
                    [x+6, y-39, z+11],
                    [x-38, y-40, z+26],
                    [x+12, y-40, z-22],
                    [x-5, y-39, z+16],
                    [x+40, y-40, z-30],
                    [x+42, y-37, z-41],
                    [x-23, y-40, z+40],
                    [x+20, y-40, z+0],
                    [x-24, y-40, z+12],
                    [x+38, y-40, z-26],
                    [x+43, y-39, z-16],
                    [x-40, y-40, z+18],
                    [x-17, y-39, z+20],
                    [x+19, y-40, z+29],
                    [x-37, y-39, z-14],
                    [x-14, y-39, z+22],
                    [x-42, y-38, z-28],
                    [x-43, y-40, z-40],
                    [x+25, y-40, z+17],
                    [x+12, y-40, z+31],
                    [x-31, y-39, z-40],
                    [x-36, y-38, z+42],
                    [x+7, y-39, z+22],
                    [x+20, y-39, z-26],
                    [x+12, y-39, z-43]
                ];
                ChatLib.chat(`${PREFIX}&b${WAYPOINTNAME} waypoints turned on!`)
            }
            else
            {
                divanWaypoints = []
                ChatLib.chat(`${PREFIX}&b${WAYPOINTNAME} waypoints turned off!`)
            }
        }
    }
})
