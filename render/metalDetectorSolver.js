// almost all of this copied from soopy (just reformatted)
import settings from "../settings"
import constants from "../util/constants"
import { drawCoolWaypoint, trace } from "../util/renderUtil"
import constants from "../util/constants"
const PREFIX = constants.PREFIX

let chestCoords = JSON.parse(FileLib.read("Coleweight", "data/treasureChestCoords.json"))
let lastLoc = [0, 0, 0]
let baseCoordinates = undefined
let lastSearchedForBase = 0
let ignoreLocation = undefined
let predictedChestLocations = []
let playedPling = false

register("worldLoad", () => {
    lastLoc = [0, 0, 0]
    baseCoordinates = undefined
    lastSearchedForBase = 0
    predictedChestLocations = []
    ignoreLocation = undefined
})

register("actionBar", (dist) => {
    let lapis = false
    let diamond = false
    let emerald = false
    let gold = false
    Player.getInventory().getItems().forEach(i => {
        if (i && i.getName().includes("Scavenged Lapis"))
            lapis = true
        if (i && i.getName().includes("Scavenged Diamond"))
            diamond = true
        if (i && i.getName().includes("Scavenged Emerald"))
            emerald = true
        if (i && i.getName().includes("Scavenged Golden"))
            gold = true
    })

    if (settings.alertTools && lapis && diamond && gold && emerald) Client.showTitle("§cALL TOOLS", "", 10, 40, 20)

    if (!settings.metalDetectorSolver)
        return
    let distance = parseFloat(dist)
    if (!baseCoordinates) {
            Client.showTitle("&cCenter of MoD not set","&aGo to center of the crystal on top to set",0,40,0)
            let x = ~~(Player.getX());
            let y = ~~(Player.getY());
            let z = ~~(Player.getZ());
        if (World.getBlockAt(x+1,y-14,z+1).getType().getID() == 169 && World.getBlockAt(x-1,y-14,z-1).getType().getID() == 169){
            baseCoordinates = [x+5,y-13,z+5]
            print(baseCoordinates)
        }
        return;
}
    if (lastLoc[0] !== Player.getX() || lastLoc[1] !== Player.getY() || lastLoc[2] !== Player.getZ()) {
        lastLoc = [Player.getX(), Player.getY(), Player.getZ()]
        playedPling = false;
        return
    }

    predictedChestLocations = []

    chestCoords.forEach((coordinates) => {
        let currentDistance = Math.hypot(Player.getX() - (baseCoordinates[0] - coordinates[0]), Player.getY() - (baseCoordinates[1] - coordinates[1] + 1), Player.getZ() - (baseCoordinates[2] - coordinates[2]))
        //print(`${Math.hypot(Player.getX())}-(${Math.hypot(baseCoordinates[0])}-${Math.hypot(coordinates[0])}),-${Math.hypot(Player.getY())}-${Math.hypot(baseCoordinates[1])}-${Math.hypot(coordinates[1] + 1)})-${Math.hypot(Player.getZ())}-${Math.hypot(baseCoordinates[2])}-${Math.hypot(coordinates[2])})`)
        if (Math.round(currentDistance * 10) / 10 === distance) {

            if ([baseCoordinates[0] - coordinates[0], baseCoordinates[1] - coordinates[1], baseCoordinates[2] - coordinates[2]].join(",") === ignoreLocation) {
                ignoreLocation = undefined
                return
            }

            if (predictedChestLocations.length === 0 && !playedPling)
            {
                World.playSound("note.pling", 100, 2)
                playedPling = true;
                
            }

            predictedChestLocations.push([baseCoordinates[0] - coordinates[0], baseCoordinates[1] - coordinates[1], baseCoordinates[2] - coordinates[2]])
        }
    });
}).setCriteria('TREASURE: ${rest}').setParameter('contains');

register("renderWorld", () => {
    predictedChestLocations.forEach(loc => {
        drawCoolWaypoint(loc[0], loc[1], loc[2], 0, 255, 0, { name: "TREASURE", phase: true })
        trace(loc[0] + 0.5, loc[1] + 0.5, loc[2] + 0.5, 0, 1, 0, 1, settings.orderedLineThickness)
    })
})


register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if(!settings.muteMetalDetectorSound || event == undefined)
        return;
    let heldItem = Player.getHeldItem()?.getItemNBT()?.getTag("tag")?.getTag("ExtraAttributes")?.getTag("id")?.toString();
    if(heldItem == "\"DWARVEN_METAL_DETECTOR\"" &&
        name == "note.harp"
    )
        cancel(event);
})