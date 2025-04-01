import { registerGui } from "../../guiManager"
import { BaseGui } from "../BaseGui"
import constants from "../../util/constants"
import settings from "../../settings"
import {dwarvenChecker, hollowsChecker, mineshaftCheck} from "../../util/helperFunctions"

function checkAreas()
{
    if(dwarvenChecker.check() || hollowsChecker.check() || mineshaftCheck.check()) return true
    return false
}
const skymallGui = new BaseGui(["skymallGui"], () =>
{
    if (!checkAreas()){return}
    return `&bCurrent Skymall:\n&a${constants.data.currentSkymall}`
}, () => {return skymallGui.isOpen() || settings.skymallGui})

registerGui(skymallGui)