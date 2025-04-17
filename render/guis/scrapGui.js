import { registerGui } from "../../guiManager";
import settings from "../../settings";
import { addCommas, secondsToMessage } from "../../util/helperFunctions";
import { BaseGui } from "../BaseGui";
import constants from "../../util/constants"

let scrap = 0;
let startTime = undefined
const scrapGui = new BaseGui(["scrapGui", "Scrap Tracker"], () => {
    if (constants.data.guiGui)return `&aScrap/hr: &b60\n&aScrap made: &b60&b\n&aUptime: &b1hr 0m`

    if(scrap <= 0 || !settings.scrapGui) return ''
    let scrapPerHour = Math.floor(scrap / ((Date.now() - startTime) / (1000 * 60 * 60)));
    return `&aScrap/hr: &b${scrapPerHour}\n&aScrap made: &b${addCommas(scrap)}&b\n&aUptime: &b${secondsToMessage((Date.now()-startTime)/1000)}`;
}, () => { return scrapGui.isOpen() || settings.scrapGui || constants.data.guiGui}, () => {
    scrap = 0;
    startTime = undefined;
})
registerGui(scrapGui)


register("chat", () => {
    if(startTime == undefined)
        startTime = Date.now()
    scrap++
}).setChatCriteria("EXCAVATOR! You found a Suspicious Scrap!")