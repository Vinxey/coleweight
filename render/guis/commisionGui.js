import { registerGui } from "../../guiManager"
import { BaseGui } from "../BaseGui"
import {dwarvenChecker, hollowsChecker, mineshaftCheck,gtChecker} from "../../util/helperFunctions"
import constants from "../../util/constants"
import settings from "../../settings"
//comms that require a mineshaft
shaftComms = ['Corpse Looter', 'Mineshaft','Scrap Collector','Maniac']
//comms thats max number is 1500
oneFiveComms = ['Glacite Collector','Umber','Tungsten','Citrine','Peridot','Aquamarine','Onyx'] //
//comms thats max number is 10
tenComms = ['Titanium','Hoarder','Star Sentry','Maniac Slayer'] //
//comms thats max number is 1000
thousandComms = ['Gemstone Collector','Hard Stone'] //
//comms thats max number is 13
thirteenComms = ['Yog','Automaton','Team Treasurite']

const PREFIX = constants.PREFIX
delayIterator = 100
meow = true
const commissionGui = new BaseGui(["commissionGui"], () =>

{
    if (!checkAreas() || !settings.commissionGui) {return}
    if (settings.commLocationCheck){
        if(!settings.commLocationCH && hollowsChecker.check()){return}
        if(!settings.commLocationGT && (gtChecker.check() || mineshaftCheck.check())){return}
        if(!settings.commLocationDM && (!gtChecker.check() && dwarvenChecker.check())){return}
    }
    message = getcommissions()

    return message
}, () => {return commissionGui.isOpen() || settings.commissionGui})

function checkAreas()
{
    if(dwarvenChecker.check() || hollowsChecker.check() || mineshaftCheck.check()||gtChecker.check()) return true
    return false
}

registerGui(commissionGui)

function getcommissions() {
    i = 0
    let tablist = TabList.getNames()
    commissions = []
    commsfull = ""
    tablist.forEach(name => {
        name = ChatLib.removeFormatting(name)

        if(name == "Commissions:"){i = 5} 
        if (i > 0 ){
            if (!name.includes("Info") && !name.includes("Commissions")){
                if (name == ""){i--}
                else{
                    comm = getCommissionReq(name)
                    commsfull += comm
                    commissions.push(name)
                    i--
                }
            }
        }
        
    })
    if (commissions.length < 1){
        return `${PREFIX} &cCannot read commissions from tablist\n&cenable commissions in /tablist to fix`
    }else{
        message = "&2Commissions:\n"
        message += commsfull
    }
    return message
}


function getCommissionReq(comm){
    comm = comm.split(':')
    if (settings.hideShaftComms && !mineshaftCheck.check() && shaftComms.some(item => comm[0].includes(item))){
        return ''
    }
    if (comm[1].includes('D') || settings.commissionPercents){
       return ` &a${comm[0]}: &b${comm[1]}\n`
    }else{
        
        num = comm[1].replace('%','')
        num = (parseInt(num) / 100)
    }

    if (oneFiveComms.some(item => comm[0].includes(item))){
        maxnum = 1500
    } else if (thousandComms.some(item => comm[0].includes(item))){
        maxnum = 1000
    } else if (comm[0].includes('Titanium Miner')){
        maxnum = 15
    } else if (tenComms.some(item => comm[0].includes(item))){
        maxnum = 10
    } else if(comm[0].includes('Mithril Miner')){
        maxnum = 350
    } else if (comm[0].includes('Mithril')){
        maxnum = 250
    } else if (comm[0].includes('2x')){
        maxnum = 500
    } else if(comm[0].includes('Sludge')){
        maxnum = 25
    } else if(comm[0].includes('Glacite')){
        maxnum = 50
    }
    else return ` &a${comm[0]}: &b${comm[1]}\n`
    return ` &a${comm[0]}: &b${Math.round(maxnum * num)} / ${maxnum}\n`
}
