import { registerGui } from "../../guiManager"
import { BaseGui } from "../BaseGui"
import constants from "../../util/constants"
import settings from "../../settings"
const skymallGui = new BaseGui(["skymallGui"], () =>
{
    message = `&bCurrent Skymall:\n&a${constants.data.currentSkymall}`

    return message
}, () => {return skymallGui.isOpen() || settings.skymallGui})

registerGui(skymallGui)