import settings from "../settings";
import { gunpowderCheck, registerWhen } from "../util/helperFunctions";
import { drawEspBox } from "../util/renderUtil"

waypoints=
[
[-10,152,27],[-11,154,4],[4,151,-14],[24,156,-35],[-10,153,-31],[26,151,-6],[6,157,8],[-35,155,9],[-26,154,-12]
]
registerWhen(register("renderWorld", () => {
    waypoints.forEach(wp => {
        drawEspBox(wp[0], wp[1], wp[2], 1, 1, 0, 0.7, 0.7, 1, true)
    })
}), () => { return settings.creeperWaypoints && gunpowderCheck.check() })