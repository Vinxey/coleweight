import { registerCommand } from "../commandManager"
import constants from "../util/constants"
const PREFIX = constants.PREFIX


registerCommand({
    aliases: ["credits"],
    description: "Credits.",
    options: "",
    category: "miscellaneous",
    showInHelp: false,
    execute: (args) => {
        ChatLib.chat(`${PREFIX}&bCW is maintained by Vinxey and was made by Ninjune.`)
    }
})