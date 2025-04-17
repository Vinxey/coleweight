import { registerGui } from "../../guiManager"
import settings from "../../settings"
import { BaseGui } from "../BaseGui"
import constants from "../../util/constants"

let ffCountdownTo = 0


const ffGui = new BaseGui(["ffGui", "Fire Freeze Cooldown Tracker", "firefreeze"], () => {
    let message = ""
    if (!settings.m3timer && !constants.data.guiGui) return ''
    if (ffCountdownTo && ffCountdownTo > 0){
        message = ("&aFire freeze in: &b" + (Math.max(0, ffCountdownTo - Date.now()) / 1000).toFixed(2) + "s")
    } else if (ffGui.isOpen()  || constants.data.guiGui){
        return `&aFire freeze in: &b4.56s`
    }
    return message
}, () => { return settings.m3timer || constants.data.guiGui})
registerGui(ffGui)


register("chat", () => {
    ffCountdownTo = Date.now() + 5000

    setTimeout(() => {
        ffCountdownTo = 0
    }, 5000)
}).setChatCriteria("[BOSS] The Professor: Oh? You found my Guardians' one weakness?")