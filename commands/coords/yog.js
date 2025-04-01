import { registerCommand } from "../../commandManager"
import constants from "../../util/constants"
import { waypointRender } from "../../util/helperFunctions"

const PREFIX = constants.PREFIX
let yogWaypoints = []


register("renderWorld", () => {
    if(yogWaypoints.length < 1) return
    waypointRender(yogWaypoints)
})


register("worldLoad", () => {
    yogWaypoints = []
})


registerCommand({
    aliases: ["yog"],
    description: "Yog waypoints for bal.",
    options: "[toggle]",
    category: "waypoints",
    execute: (args) => {
        const WAYPOINTNAME = "Yog"

        if(args[1] != "toggle")
        {
            new TextComponent(`${PREFIX}&bGo to the leftmost corner of the topaz crystal facing bal close to bal then do /cw coords yog toggle.`)
            .chat()
        }
        else
        {
            if(yogWaypoints[0] == undefined)
            {
                let startPos = [Player.getX(), Player.getY(), Player.getZ()],
                x = startPos[0],
                y = startPos[1],
                z = startPos[2]

                yogWaypoints = [
                    [x+10, y-7, z-27],
                    [x+10, y-7, z-27],
                    [x+28, y-8, z+15],
                    [x-41, y-3, z+26],
                    [x-32, y-3, z+45],
                    [x-22, y-3, z-34],
                    [x+28, y-8, z+36],
                    [x-47, y-3, z+32],
                    [x-43, y-1, z+4],
                    [x-47, y+2, z-20],
                    [x+11, y-13, z+40],
                    [x+15, y-13, z+43],
                    [x-44, y+2, z-29],
                    [x+33, y-4, z-15],
                    [x-6, y-4, z-34],
                    [x+19, y-12, z+35],
                    [x+16, y-9, z-15]
                ];
                ChatLib.chat(`${PREFIX}&b${WAYPOINTNAME} waypoints turned on!`)
            }
            else
            {
                yogWaypoints = []
                ChatLib.chat(`${PREFIX}&b${WAYPOINTNAME} waypoints turned off!`)
            }
        }
    }
})
