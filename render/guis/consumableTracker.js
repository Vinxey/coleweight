import constants from "../../util/constants"
import { registerGui } from "../../guiManager"
import { BaseGui } from "../BaseGui"
import settings from "../../settings"

constants.data.save()
i = 0
const consumablesGui = new BaseGui(["consumablesGui","Consumable Tracker","consumablestracker"], ()=>{
    let message = ''
    if (constants.data.guiGui)return `&aPowder Pumpkin: &cExpired!\n&aFillet O\' Fortune: &cExpired!\n&aPristine Potato: &b19m 38s\n&aCacao Truffle: &b57m 26s`
    if (!settings.consumablesGui)return ''
    //Powder Pumpkin
    if(settings.hideConsumables && !settings.showPowderPumpkin){
        message += ''
    }else if (constants.data.powderPumpkinExperation > 0){
        message+= `&aPowder Pumpkin: &b${Math.floor(constants.data.powderPumpkinExperation/60)}m ${Math.floor(constants.data.powderPumpkinExperation%60)}s\n`
    }   else  message+= `&aPowder Pumpkin: &cExpired!\n`

    //Fillet O' Fortune
    if(settings.hideConsumables && !settings.showFish){
        message += ''
    }else if (constants.data.fishExperation > 0){
        message+= `&aFillet O\' Fortune: &b${Math.floor(constants.data.fishExperation/60)}m ${Math.floor(constants.data.fishExperation%60)}s\n`
    }else message+= `&aFillet O\' Fortune: &cExpired!\n`

    //PristinePotato
    if(settings.hideConsumables && !settings.showPristinePotato){
        message += ''
    }else if (constants.data.pristinePotatoExperation > 0){
        message+= `&aPristine Potato: &b${Math.floor(constants.data.pristinePotatoExperation/60)}m ${Math.floor(constants.data.pristinePotatoExperation%60)}s\n`
    }else message+= `&aPristine Potato: &cExpired!\n`

    //Truffle
    if(settings.hideConsumables && !settings.showTruffle){
        message += ''
    }else if (constants.data.truffleExperation > 0){
        message+= `&aCacao Truffle: &b${Math.floor(constants.data.truffleExperation/60)}m ${Math.floor(constants.data.truffleExperation%60)}s\n`
    }else message+= `&aCacao Truffle: &cExpired!`

    return message
}, () => {return consumablesGui.isOpen()  || settings.consumablesGui||constants.data.guiGui})

register('step',() =>{
    if (constants.data.powderPumpkinExperation > 0){
        constants.data.powderPumpkinExperation -= 1
        if (constants.data.powderPumpkinExperation == 0 && settings.showConsumableTitle){
            Client.showTitle("§cPowder Pumpkin Expired", "", 0, 40 ,0)
            World.playSound("note.pling", 100, 2)
        }
        
    }
    if (constants.data.fishExperation > 0){
        constants.data.fishExperation -= 1
        if (constants.data.fishExperation == 0 && settings.showConsumableTitle){
            Client.showTitle("§cFillet O' Fish Expired", "", 0, 40 ,0)
            World.playSound("note.pling", 100, 2)
        }
    }
    if (constants.data.pristinePotatoExperation > 0){
        constants.data.pristinePotatoExperation -= 1
        if (constants.data.pristinePotatoExperation == 0 && settings.showConsumableTitle){
            Client.showTitle("§cPristine Potato Expired", "", 0, 40 ,0)
            World.playSound("note.pling", 100, 2)
        }
    }
    if (constants.data.truffleExperation > 0){
        constants.data.truffleExperation -= 1
        if (constants.data.truffleExperation == 0 && settings.showConsumableTitle){
            Client.showTitle("§cCacao Truffle Expired", "", 0, 40 ,0)
            World.playSound("note.pling", 100, 2)
        }
    }
    constants.data.save()
}).setDelay(1)

registerGui(consumablesGui)
register('soundPlay', () =>{
    if (i == 0){
    item = Player.getHeldItem()
    if (item != null){
        item = item.getName()
        switch(item){
            case '§aPowder Pumpkin':
                constants.data.powderPumpkinExperation = 3600
                break;
            case '§9Filet O\' Fortune':
                constants.data.fishExperation = 3600
                break;
            case '§5Chilled Pristine Potato':
                constants.data.pristinePotatoExperation = 3600
                break;
            default:
                break;
        }
        constants.data.save()
    }
    i++
}
else {
    i += 1
}
if(i >= 5){i=0}
}).setCriteria('random.eat')

register('chat', () => {
    constants.data.truffleExperation = 3600
    constants.data.save()
}).setCriteria('&r&7You consumed a &r&6Refined Dark Cacao Truffle &r&7and gained &r&6+30&r&6☘ Global Fortune &r&7for &r&a60m&r&7!&r')