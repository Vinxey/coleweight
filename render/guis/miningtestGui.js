import { registerGui } from "../../guiManager"
import settings from "../../settings"
import { BaseGui } from "../BaseGui"
import constants from "../../util/constants"
import { Title } from "../../util/helperFunctions"
collectionTotal = 0;
collectionPerHour = 0;
timer = 0;
skymallDuringTest = [];
lastcheck = false
testover = true
waitforresponse = false


countdown = parseInt(settings.testCountdown)
//delete after deving
constants.data.miningtestgui.istestactive = false
constants.data.save()
constants.pbs.save()


const miningtestgui = new BaseGui(["miningtestgui"], () =>
{
    let timerHr = Math.floor(constants.data.miningtestgui.timer/60/60)

        if(timerHr >= 1)
                timer = `&aTimer: &b${timerHr}h ${Math.floor(constants.data.miningtestgui.timer/60) - timerHr*60}m`
        else
                timer = `&aTimer: &b${Math.floor(constants.data.miningtestgui.timer/60)}m ${Math.floor(constants.data.miningtestgui.timer%60)}s`
        message = `&a${constants.data.miningtestgui.collectionName}/h: &b${numberWithCommas(collectionPerHour)} \n&a${constants.data.miningtestgui.collectionName} Gained: &b${numberWithCommas(collectionTotal)} \n${timer}`

    return message
}, () => {return miningtestgui.isOpen() || settings.miningtestgui})
registerGui(miningtestgui)
const title = new Title({text: "&bTest Over"})
countdownTitle = new Title({text: ``, time:500})

register("actionbar", (xp) => {
    const match = xp.match(/\(([^)]+)\)/);
    
    if (match && xp.includes("Mining")) {
        totalxp = match[1].replace(/,|\/0/g,"")
        constants.data.miningXP  = totalxp
        if (settings.collectionTracker && constants.data.miningtestgui.collectionName == "XP" && !timerStart){
                constants.data.miningtestgui.timer = 1
                startingxp = constants.data.miningXP
                timerStart = true
        }
    }

    
}).setCriteria("${xp}")

register("step", () => {
    if (settings.collectionTracker && timerStart){
        constants.data.miningtestgui.timer += 1
        constants.data.save()
        if (constants.data.miningtestgui.collectionName == "XP"){
            collectionTotal = constants.data.miningXP - startingxp
            collectionPerHour = Math.floor(collectionTotal / ((constants.data.miningtestgui.timer) / (3600)))
        }
    }

    if (parseInt(settings.testCountdown) > 0 && constants.data.miningtestgui.timer > 0 && !settings.collectionTracker && countdown != -1){
        if (countdown >0){
            countdownTitle.text = `&b${countdown}`  
        } else{
            countdownTitle.text = `&bGO!`
        }
        countdown--
        countdownTitle.draw()
        if(constants.data.miningtestgui.collectionName == "XP"){
            startingxp = constants.data.miningXP
        }
    }
    //timer decrement and manage skymall array
    else if(constants.data.miningtestgui.timer > 0 && !settings.collectionTracker){
        constants.data.miningtestgui.timer -= 1
        if (!skymallDuringTest.includes(constants.data.currentSkymall) ){skymallDuringTest.push(constants.data.currentSkymall)}
        if (constants.data.miningtestgui.collectionName == "XP"){
            collectionTotal = constants.data.miningXP - startingxp
            collectionPerHour = Math.floor(collectionTotal / (3600 / constants.data.miningtestgui.timer))
        }
    }
    //when the test ends show title\
    else if (constants.data.testTitlePlay)
    {
        title.draw()
        constants.data.testTitlePlay = false
        constants.data.save()
        //bool to allow for one last sack message
        if(constants.data.miningtestgui.collectionName != "XP") lastcheck = true
    } 
    //if last sack message has been processed && there is a test going on currently && not waiting for pb response (this is so it dosent spam chat)
    else if (!lastcheck && constants.data.miningtestgui.timer <= 0 && constants.data.miningtestgui.istestactive && !waitforresponse){
        //set pb checker to current collection
        activepb = constants.pbs[constants.data.miningtestgui.collectionName]
        //if you get a new pb
        if (collectionPerHour > activepb){
            newpb=true 
            //time for pb message
            time =  `&b${Math.floor(constants.data.miningtestgui.maxtimer/60)}m ${Math.floor(constants.data.miningtestgui.maxtimer%60)}s`
            finalMessage(collectionPerHour,time,newpb,constants.data.miningtestgui.collectionName,skymallDuringTest)
            //confirm that they want to update their pb to the new one with a click message thing
            ChatLib.chat(`${constants.PREFIX}&bWould you like to save your new pb?!`)
            const confirmPB = new Message(
                new TextComponent("&a[Yes]  ").setClick("run_command", "/cw setnewpb yes"),
                new TextComponent("    &4[No]").setClick("run_command", "/cw setnewpb no")
             );
             ChatLib.chat(confirmPB);
            //start waiting for a response from the player
            waitforresponse = true
        }
        else{
            time =  `&b${Math.floor(constants.data.miningtestgui.maxtimer/60)}m ${Math.floor(constants.data.miningtestgui.maxtimer%60)}s`
            newpb=false
            finalMessage(collectionPerHour,time,newpb,constants.data.miningtestgui.collectionName,skymallDuringTest)
            resetTest()
        }
        

        //if waiting for a pb respoonse && there is a active test
    } if (waitforresponse && constants.data.miningtestgui.istestactive){
            if (constants.pbs.setnewpb == "yes"){
                //update pb to new pb
                constants.pbs[constants.data.miningtestgui.collectionName] = collectionPerHour
                resetTest()
                ChatLib.chat(`${constants.PREFIX}&bPb was saved!`)
            } else if (constants.pbs.setnewpb == "no") {
                //do nothing basically
                ChatLib.chat(`${constants.PREFIX}&bPb was not saved!`)
                resetTest()
            }
            
    }
}).setFps(1)

export function resetTest(){
    countdown = settings.testCountdown
    constants.pbs.setnewpb = ""
    collectionTotal = 0;
    collectionPerHour = 0;
    constants.data.skymallDuringTest = []
    constants.data.testTitlePlay = false
    constants.data.miningtestgui.timer = 0
    lastcheck = false
    constants.data.miningtestgui.istestactive = false
    waitforresponse = false
    constants.data.lobbyswaps = 0
    constants.pbs.save()
    constants.data.save()
    timerStart = false
}
resetTest()


export function trackCollection(collection)
{//stolen from collectiongui 
    let collections = JSON.parse(FileLib.read("Coleweight", "data/collections.json"))
    if(collection == undefined) return ChatLib.chat(`${constants.PREFIX}&eThat is not a valid collection! (or is not supported)`)
    if(collection == "obby") collection = "obsidian"
    if(collection == "cobble") collection = "cobblestone"
    if(collections[collection.toLowerCase()] == undefined) return ChatLib.chat(`${constants.PREFIX}&eThat is not a valid collection! (or is not supported)`)
    constants.data.tracked.collectionEnchanted = collections[collection].collectionEnchanted
    constants.data.tracked.collectionName = collections[collection].collectionName
    constants.data.tracked.amountToCompact = collections[collection].amountToCompact
    constants.data.miningtestgui.collectionName = collections[collection].collectionName
    activepb = constants.pbs[collection]
    collection = collection
    collectionTotal = 0
    constants.data.save()
    ChatLib.chat(`${constants.PREFIX}&bSet collection to ${constants.data.tracked.collectionName}!`)
}


//mostly stolen from chick_is_bored original code here --> https://github.com/PerseusPotter/chicktils/blob/master/modules/sacks.js 
register('chat', (time, evn) => {
    //idk what this time thing is for but breaks without it so we leave be
    time = parseInt(time);
    //if there is a test going on or if we are doing the last check
    if (constants.data.tracked.collectionName != "XP" && constants.data.miningtestgui.timer > 0 || lastcheck || settings.collectionTracker){
    //get text from hover message
    const itemLog = evn.message.func_150253_a()[0].func_150256_b().func_150210_i().func_150702_b().func_150253_a();
    const items = new Map();
    // -1 = 'This message can be disabled in the settings.'
    for (let i = 0; i < itemLog.length - 1; i += 4) {
      // '  +23 '
      let amnt = itemLog[i].func_150261_e()
      //remove the + and comma then make it a integer
      amnt = parseInt(amnt.replace(/[,+]/g,''))

      // 'Blaze Rod'
      let name = itemLog[i+1].func_150261_e();
      // add to Map
      items.set(name,amnt); 
    }
    //get the amount of enchanted version of collection
    enchantedColl = items.get(constants.data.tracked.collectionEnchanted)
    //get the amount of unenchanted version of collection
    coll = items.get(constants.data.tracked.collectionName)
    //if there is enchanted collection multiply by multiple for collection
    if (enchantedColl != undefined){
        collectionTotal += enchantedColl * constants.data.tracked.amountToCompact //this is cause fuck hardstone (could also be usefull if other collections are added)
    }
    if (coll != undefined){
        collectionTotal += coll
    }
    //if this isnt a try statement it dosent like me
    try {
        //get the removed items from the hover message same other than subtracting the collection from it so that compacting dosent make ur coll/h shoot up
        const removeditemlog = evn.message.func_150253_a()[3].func_150256_b().func_150210_i().func_150702_b().func_150253_a();
        const removeditems = new Map();
        for (let i = 0; i < removeditemlog.length - 1; i += 4) {
            // '  +23 '
            let amnt = removeditemlog[i].func_150261_e()
            amnt = parseInt(amnt.replace(',',''))
      
            // 'Blaze Rod'
            let name = removeditemlog[i+1].func_150261_e();
            removeditems.set(name,amnt); 
        }
        removedcoll = removeditems.get(constants.data.tracked.collectionName)
        if(removedcoll != undefined){collectionTotal += removedcoll} 
    } catch (error){}
    //calc new cph every time that the sack message is sent basically
    if (!settings.collectionTracker && constants.data.tracked.collectionName != "XP"){
    collectionPerHour = Math.floor(collectionTotal * (3600 / (constants.data.miningtestgui.maxtimer - constants.data.miningtestgui.timer)))
    }

    //Collection tracker for non tests
    if (settings.collectionTracker && constants.data.tracked.collectionName != "XP"){
         if (!timerStart){
            startTime = Date.now()
            constants.data.miningtestgui.timer = time
            constants.data.save()
            timerStart = true
            collectionPerHour = Math.floor(collectionTotal / ((time) / (3600)))
        }else{   
        collectionPerHour = Math.floor(collectionTotal / ((Date.now() - startTime) / (1000 * 60 * 60)))
        
    }
}
    lastcheck = false
}
}).setCriteria(/^&6\[Sacks\] &r&a\+[\d,]+&r&e items?&r&e(?:, &r&c-[\d,]+&r&e items?&r&e)?\.&r&8 \(Last (\d+)s\.\)&r$/);


//this is just fancy display message cause i think it will look cool to flex
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function finalMessage(collectionfromtest,testLength,newpb,collection,skymallsduringtest){
    collectionfromtest = numberWithCommas(collectionfromtest)
    line1 = '&3==============================================='
    line3 = ChatLib.getCenteredText(`&4${collection} Test Over!`)
    line4 = `&eTest Length: ${testLength}`
    line5 = `&2${collection} /h: &a${collectionfromtest}`
    if (constants.data.lobbyswaps > 1){
        line6 = `\n&dLobby swaps: ${constants.data.lobbyswaps}\n`
    } else {line6 = `\n\n`}
    
    if (skymallsduringtest[1] != undefined){
        line7 = `&bSkymall: \n&a${skymallsduringtest[0]}\n&a${skymallsduringtest[1]}`
    }else{line7 = `&bSkymall: \n&a${skymallsduringtest[0]}`}
    
    pb1 = ChatLib.getCenteredText(`&e************************`)
    pb2 = ChatLib.getCenteredText(`&e*      New Pb!      *`)
    pb3 = ChatLib.getCenteredText(`&e************************`)
    pb4 = ChatLib.getCenteredText(`&a${collectionfromtest} /h`)
    lineend = '&3==============================================='
    
    if (newpb){
        message = `\n${line1}\n\n${line3}\n${pb1}\n${pb2}\n${pb3}\n${pb4}\n\n${line4}${line6}${line7}\n\n${lineend}\n`
    }else{
        message = `\n${line1}\n\n${line3}\n\n${line4}\n\n${line5}${line6}${line7}\n\n${lineend}\n`
    }
    ChatLib.chat(message)
}


/*TODO:
pre test checklist
*/ 