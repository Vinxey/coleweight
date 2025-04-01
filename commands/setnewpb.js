import { registerCommand } from "../commandManager"
import constants from "../util/constants"

registerCommand({
    aliases: ["setnewpb"],
    description: "confirms to set new pb",
    options: "(yes, no)",
    category: "miscellaneous",
    showInHelp: false,
    subcommands: [["yes", "no"]],
    execute: (args) => {
        if (args[1] == undefined)   {return ChatLib.chat(`${constants.PREFIX}&bOptions are: &3yes &b, &3no`)}
        else if (args[1] == "yes" && constants.data.miningtestgui.istestactive){
            constants.pbs.setnewpb = "yes"
             constants.pbs.save()
            }
        else if(args[1] == "no" && constants.data.miningtestgui.istestactive){
            constants.pbs.setnewpb = "no"
            constants.pbs.save()
            }
        else if (!constants.data.miningtestgui.istestactive){
            ChatLib.chat(`${constants.PREFIX}&bNo active test`)
        }else {return ChatLib.chat(`${constants.PREFIX}&bOptions are: &3yes &b, &3no`)}
        
        
    }
})