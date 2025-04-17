import { registerCommand } from "../commandManager"
import constants from "../util/constants"
import guis from "../guiManager"
import { registerWhen } from "../util/helperFunctions"
const subcommands = []
guis.forEach((gui) => {
    subcommands.push(gui.aliases[0])
})
done = false
i = 0
constants.data.guiGui = false
constants.data.save()
registerCommand({
    aliases: ["move"],
    description: "Move guis.",
    options: "(gui)",
    category: "miscellaneous",
    showInHelp: false,
    subcommands: [subcommands],
    execute: (args) => {
        if (args[1] == undefined) {ChatLib.chat(`${constants.PREFIX}&cNot enough arguments.`); return}
        if (args[1].toLowerCase() == 'all'){
            
            guis[i].open()
            constants.data.guiGui = true
            constants.data.save()
            done = true
            return
        }
        let found = false

        guis.forEach(gui => {
            if(gui.aliases.map(alias => alias.toLowerCase()).includes(args[1].toLowerCase()))
            {
                gui.open()
                found = true
            }
        })

        if(!found)
            ChatLib.chat(`${constants.PREFIX}&cNo such gui as '${args[1]}'.`)
    }
})

registerWhen(register('tick',()=>{
    if (!guis[i].isOpen() && done){
        constants.data.guiGui = false
        constants.data.save()
    }
}),() => {return constants.data.guiGui && done})

registerWhen(register('guiMouseClick',(x1,y1)=>{
    distances = []
    guis.forEach((gui) =>{
            name = gui.aliases[0]
            x2 = constants.data[name].x
            y2 = constants.data[name].y
            distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
            distances.push(distance)
    })
    done = false
    guis[i].close()
    i = distances.indexOf(Math.min(...distances));
    guis[i].open()
    done = true
}),() => {return constants.data.guiGui})