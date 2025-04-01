import settings from "../settings";
import { dwarvenChecker, hollowsChecker, registerWhen } from "../util/helperFunctions";
import { drawInnerEspBox } from "../util/renderUtil";

let blockStates = ["minecraft:clay", "minecraft:double_stone_slab2[seamless=true,variant=red_sandstone]"]
let waypoints = [];
let pMiner = {};

registerWhen(register("tick", () => {
    waypoints = [];
    let [pX, pY, pZ] = [Math.floor(Player.getX())+0.5, Math.floor(Player.getY()), Math.floor(Player.getZ())+0.5]

    for(let x = pX-6; x <= pX+6; x++)
    {
        for(let y = pY-6; y <= pY+6; y++)
        {
            for(let z = pZ-6; z <= pZ+6; z++)
            {
                if(!blockStates.includes(World.getBlockAt(x, y, z).getState().toString()) || !isVisible(x, y, z))
                    continue
                waypoints.push({x, y, z, prio: findPrio(x, y, z)})
            }
        }
    }
}), () => { return settings.efficientMinerOverlay && dwarvenChecker.check() })


registerWhen(register("renderWorld", () => {
    for(let i = 0; i < waypoints.length; i++)
    {
        let waypoint = waypoints[i];
        let [x,y,z] = [waypoint.x, waypoint.y, waypoint.z]
        if(waypoint.x < 0)
            x += 1;
        if(waypoint.z < 0)
            z += 1;

        let r,g,b;
        if(waypoint.prio >= 10)
            waypoint.prio = 1;
        
        if(settings.oldHeatmap)
        {
            switch(waypoint.prio)
            {
            case 1:
                [r,g,b] = [20/255, 90/255, 38/255]
                break;
            case 2:
                [r,g,b] = [42/255, 230/255, 92/255]
                break;
            case 3:
                [r,g,b] = [180/255, 252/255, 69/255]
                break;
            case 4:
                [r,g,b] = [180/255, 177/255, 31/255]
                break;
            case 5:
                [r,g,b] = [180/255, 31/255, 45/255]
                break;
            case 6:
                [r,g,b] = [212/255, 57/255, 229/255]
                break;
            case 7:
                [r,g,b] = [89/255, 33/255, 95/255]
                break;
            case 8:
                [r,g,b] = [62/255, 56/255, 216/255]
                break;
            default:
                [r,g,b] = [0,0,0];
            }
        }
        else
        {
            if(waypoint.prio < 3)
                [r,g,b] = [20/255, 90/255, 38/255];
            else if(waypoint.prio < 5)
                [r,g,b] = [145/255, 23/255, 23/255]; // red
            else if (waypoint.prio < 7)
                [r,g,b] = [104/255, 210/255, 249/255]; // sky blue
            else
                [r,g,b] = [49/255, 41/255, 165/255]; // dark blue
        }
        
        drawInnerEspBox(x, y-0.001, z, 1.001, 1.002, r, g, b, 0.1+waypoint.prio/10, false)
    }

    if(pMiner.exists !== undefined)
    {
        let [r,g,b] = [pMiner.found ? 0 : 1, pMiner.found ? 1 : 0, 0];
        drawInnerEspBox(pMiner.x, pMiner.y, pMiner.z, 0.25, 0.25, r, g, b, 1, false);
        if(Date.now() > pMiner.startTime+500)
            pMiner = {};
    }
}), () => { return settings.pMinerOverlay || settings.efficientMinerOverlay })


registerWhen(register("spawnParticle", (particle, type, event) => {
    pMiner.exists = true;
    if(particle.getClassName() == "EntityCrit2FX") // pminer not found
        pMiner.found = false;
    else if (particle.getClassName() == "EntityAuraFX") // pminer found
        pMiner.found = true;
    
    pMiner.x = particle.getX();
    pMiner.y = particle.getY() - 0.12;
    pMiner.z = particle.getZ();
    pMiner.startTime = Date.now();
}), () => { return settings.pMinerOverlay && (dwarvenChecker.check() || hollowsChecker.check())})


function findPrio(x, y, z)
{
    let prio = 0;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dz = -1; dz <= 1; dz++) {
                if(blockStates.includes(World.getBlockAt(x+dx, y+dy, z+dz).getState().toString()))
                    prio++;
            }
        }
    }

    return prio;
}

function isVisible(x, y, z)
{
    let airTypes = ["minecraft:air", "minecraft:snow_layer"]

    if(World.getBlockAt(x, y, z).type.getRegistryName() === "minecraft:bedrock") return false
    if (airTypes.includes(World.getBlockAt(x, y+1, z).type.getRegistryName())) return true // above
    if (airTypes.includes(World.getBlockAt(x, y-1, z).type.getRegistryName())) return true // below
    if (airTypes.includes(World.getBlockAt(x+1, y, z).type.getRegistryName())) return true // east
    if (airTypes.includes(World.getBlockAt(x-1, y, z).type.getRegistryName())) return true // west
    if (airTypes.includes(World.getBlockAt(x, y, z+1).type.getRegistryName())) return true // north
    if (airTypes.includes(World.getBlockAt(x, y, z-1).type.getRegistryName())) return true // south

    return false
}
