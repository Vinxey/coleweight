let guis = [],
 guiNames = []


export function registerGui(gui)
{
    guis.push(gui)
    guiNames.push(gui.aliases[0])
}

export default guis

// gui registering
import "./render/guis/alloyGui"
import "./render/guis/coinGui"
import "./render/guis/ffGui"
import "./render/guis/gyroGui"
import "./render/guis/powertrackerGui"
import "./render/guis/scrapGui"
import "./render/guis/miningAbilitiesGui"
import "./render/guis/stopwatchGui"
import "./render/guis/timerGui"
import "./render/guis/commisionGui"
import "./render/guis/skymallGui"
