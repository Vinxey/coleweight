import constants from "../util/constants"
import { calcSpeed } from "./calculate/calcSpeed"
import { tickCommand } from "./calculate/tick"
import { registerCommand } from "../commandManager"
import { helpCommand } from "./help"


registerCommand({
    aliases: ["calc", "calculate"],
    description: "Commands for calculating things. Do '/cw calc help'.",
    options: "[help]",
    category: "info",
    subcommands: [["tick", "speed"]],
    execute: (args) => {
        switch((args[1] ?? "").toLowerCase())
        {
            case "tick":
                tickCommand(args[2], args[3])
                break
            case "calcspeed":
            case "speed":
                calcSpeed(args[2])
                break
            case "help":
                ChatLib.chat("&b--------------[ &a&l/cw calculate &b]------------")
                ChatLib.chat("&7(Hover over command to see usage.)")
                helpCommand("calculate tick", "Calculates tick data.", "(mining speed) (('r','jade', etc) || breaking power of block))")
                helpCommand("calculate speed", "Calculates the ratio of mining speed 2 to professional with a certain amount of powder.", "(powder)")
                ChatLib.chat("&b------------------------------------------")
                return
            default:
                return ChatLib.chat(constants.CALCULATEERRORMESSAGE)
       }
    }
})