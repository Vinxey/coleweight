import { @Vigilant, @ButtonProperty, @SwitchProperty, @SelectorProperty, @SliderProperty, @TextProperty, @ColorProperty, Color } from "../Vigilance/index"

const SubCatCommissions = ["toggle shaft commission visibility","Percents","Commission Location Hider","Crystal Hollows","Dwarven Mines","Glacite Tunnels"]
const SubCatCoinTracker = ["Force NPC","Gemstone Type"]
const SubCatMetalDetector = ["Alert Tools","Mute Metal Detector Sound"]
const SubCatMiningTest = ["Test Start Countdown","Collection Tracker"]
const SubCatAbilities = ["Mining abilities"]
const SubCatConsumables = ["Show title when consumables expire","toggle individual consumables","toggle Fillet o' fish","toggle Cacao Truffle","toggle Pristine Potato","toggle Powder Pumpkin"]
const SubCatPowderTracker = ["Show totals","Show rates"]
const SubCatTimer = ["Timer End Visiblity"]
const SubCatStreamerMode = ["Block tab","Block debug","Block bossbar","Randomize lobby","Disable waypoints on death"]

const SubSubCatCommissionhiders = ["Crystal Hollows","Dwarven Mines","Glacite Tunnels"]
const SubSubCatConsumablehiders = ["toggle Fillet o' fish","toggle Cacao Truffle","toggle Pristine Potato","toggle Powder Pumpkin"]

function addDependenciesfromarray(array,dependant,obj){
    array.forEach((itum) =>{
        obj.addDependency(itum, dependant)
    })
}   

@Vigilant("Coleweight/config", "Coleweight Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General","Glacite Tunnels", "Gui", "Stats", "Waypoints", "Other"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})



class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&aColeweight &bv${JSON.parse(FileLib.read("Coleweight", "metadata.json")).version}` + 
        `\n&aBy &bNinjune`)
        addDependenciesfromarray(SubCatCommissions,"Commission gui",this)
        addDependenciesfromarray(SubCatCoinTracker,"Coin Tracker",this)
        addDependenciesfromarray(SubCatMetalDetector,"Metal Detector Solver",this)
        addDependenciesfromarray(SubCatMiningTest,"Mining Test gui",this)
        addDependenciesfromarray(SubCatAbilities,"Mining abilities gui",this)
        addDependenciesfromarray(SubCatConsumables,"Consumables Gui",this)
        addDependenciesfromarray(SubCatPowderTracker,"Show powdertracker",this)
        addDependenciesfromarray(SubCatTimer,"Timer",this)
        addDependenciesfromarray(SubCatStreamerMode,"Streamer mode",this)

        addDependenciesfromarray(SubSubCatCommissionhiders,"Commission Location Hider",this)
        addDependenciesfromarray(SubSubCatConsumablehiders,"toggle individual consumables",this)
        this.addDependency("Old heatmap","Efficient miner overlay V2")


    }
    // CAT General
    // SUBCAT Discord
    @ButtonProperty({
        name: "Join my discord!",
        description: "Click to copy my discord link to clipboard.",
        category: "General",
        subcategory: "Discord",
        placeholder: "Copy"
    })
    joinDiscord() {
        ChatLib.command("ct copy https://discord.gg/yj4P4FqHPA", true);
    }
    // SUBCAT Marking
    @SwitchProperty({
        name: "Marked lobbies",
        description: "Enables lobby marking (automatic).",
        category: "General",
        subcategory: "Marking"
    })
    lobbyMarking = false;

    @ButtonProperty({
        name: "Clear lobbies",
        description: "Clears marked lobbies.",
        category: "General",
        subcategory: "Marking",
        placeholder: "Clear"
    })
    clearLobbies() {
        ChatLib.command("cw clearlobbies", true);
    }
    // SUBCAT Pristine Sound
    @TextProperty({
        name: "Low Proc",
        description: "Your low pristine proc for a sound notification. Leave empty to disable. Delimit multiple using ','. No other characters aside from '0'-'9' & ','. Will find even if multiple of low proc.",
        subcategory: "Pristine Sound",
        category: "General"
    })
    lowProc = "";

    @TextProperty({
        name: "Proc Sound",
        description: "Sound for low proc. To find the sound names there is a guide in my discord.",
        subcategory: "Pristine Sound",
        category: "General"
    })
    lowProcSound = "random.orb";

    @TextProperty({
        name: "Proc Volume",
        description: "Volume for proc sound.",
        subcategory: "Pristine Sound",
        category: "General"
    })
    lowProcVolume = "1";

    @TextProperty({
        name: "Proc Pitch",
        description: "Pitch for low proc sound.",
        subcategory: "Pristine Sound",
        category: "General"
    })
    lowProcPitch = "1";
    // SUBCAT Ranked Chat
    @SwitchProperty({
        name: "Rank chat",
        description: "Enables the Coleweight rank message after a name in chat.",
        subcategory: "Ranked Chat",
        category: "General"
    })
    rankChat = true;

    @SwitchProperty({
        name: "Rank everywhere",
        description: "Enables showing Coleweight rank everywhere. (instead of just in Crystal Hollows/Dwarven Mines)",
        subcategory: "Ranked Chat",
        category: "General"
    })
    rankEverywhere = false;
    // SUBCAT General
    @SwitchProperty({
        name: "Track griefers",
        description: "Check lobbies for griefers (on join and when new players join.) Mining cult does not encourage the harrasment of people on this list.",
        subcategory: "General",
        category: "General"
    })
    trackGriefers = true;

    @SwitchProperty({
        name: "Griefer messages everywhere",
        description: "Makes griefer messages appear in all lobbies (not just CH/DM)",
        subcategory: "General",
        category: "General"
    })
    grieferEverywhere = false;

    @SwitchProperty({
        name: "Hide items",
        description: "Makes items invisible.",
        subcategory: "General",
        category: "General"
    })
    invisibleItems = false;

    @SwitchProperty({
        name: "Debug",
        description: "Toggles debug mode.",
        subcategory: "General",
        category: "General"
    })
    debug = false;

    

    @SwitchProperty({
        name: "Precision miner overlay",
        description: "Shows an overlay for precision miner like the old SBE highlight chest locks.",
        subcategory: "General",
        category: "General"
    })
    pMinerOverlay = false;
    // SUBCAT Streamer Mode
    @SwitchProperty({
        name: "Streamer mode",
        description: "Various features to protect against snipers.",
        subcategory: "Streamer Mode",
        category: "General"
    })
    streamerMode = false;

    @SwitchProperty({
        name: "Block tab",
        description: "Blocks tab from being rendered. (when streamer mode)",
        subcategory: "Streamer Mode",
        category: "General"
    })
    streamerBlockTab = true;

    @SwitchProperty({
        name: "Block debug",
        description: "Blocks debug menu (F3) from being rendered. (when streamer mode)",
        subcategory: "Streamer Mode",
        category: "General"
    })
    streamerBlockDebug = true;

    @SwitchProperty({
        name: "Block bossbar",
        description: "Blocks bossbar from being rendered. (when streamer mode)",
        subcategory: "Streamer Mode",
        category: "General"
    })
    streamerBlockBossbar = true;

    @SwitchProperty({
        name: "Randomize lobby",
        description: "Randomizes lobby on the sidebar. (when streamer mode)",
        subcategory: "Streamer Mode",
        category: "General"
    })
    streamerRandomizeLobby = true;

    @SwitchProperty({
        name: "Disable waypoints on death",
        description: "Disables any ordered waypoints you have loaded on death. (when streamer mode)",
        subcategory: "Streamer Mode",
        category: "General"
    })
    streamerDisableWaypointsOnDeath = true;
    // Cat Glacite Tunnels
    @SwitchProperty({
        name: "Glacite tunnels waypoints",
        description: "Shows colored waypoints where gem types are in the Glacite Tunnels.",
        subcategory: "Glacite Tunnels",
        category: "Glacite Tunnels"
    })
    tunnelsWaypoints = true;

    @SwitchProperty({
        name: "Party transfer command",
        description: "Enables party command !ptme or ?pt or .ptme etc. to transfer party",
        subcategory: "Glacite Tunnels",
        category: "Glacite Tunnels"
    })
    transferCommand = false;

    @SwitchProperty({
        name: "Efficient miner overlay V2",
        description: "Shows an heatmap for umber/tungsten highlighting the best block to break.",
        subcategory: "Glacite Tunnels",
        category: "Glacite Tunnels"
    })
    efficientMinerOverlay = false;

    @SwitchProperty({
        name: "Old heatmap",
        description: "Uses the old heatmap system for the efficient miner overlay.",
        subcategory: "Glacite Tunnels",
        category: "Glacite Tunnels"
    })
    oldHeatmap = false;
    // CAT Gui
    @ButtonProperty({
        name: "Move Gui's",
        description: "Manage all gui positions",
        subcategory: "",
        category: "Gui"
    })
    moveGuiLocations(){
        ChatLib.command("cw move all", true);
    }
    // SUBCAT Alloy Tracker
    @SwitchProperty({
        name: "Alloy Tracker",
        description: "Enables the Alloy tracker. Displays the most recent, known alloy drop.",
        subcategory: "Alloy Tracker",
        category: "Gui"
    })
    alloyTracker = false;
    // SUBCAT Coin Tracker
    @SwitchProperty({
        name: "Coin Tracker",
        description: "Enables the Coin tracker. Copies Soopy's method of calculating for now.",
        subcategory: "Coin Tracker",
        category: "Gui"
    })
    coinTracker = false;

    @SwitchProperty({
        name: "Force NPC",
        description: "Forces NPC price for the coin tracker.",
        subcategory: "Coin Tracker",
        category: "Gui"
    })
    forceNPC = false;
    @SelectorProperty({
        name: "Gemstone Type",
        description: "Sets the type of gemstones to use for coin tracker for bazaar prices.",
        subcategory: "Coin Tracker",
        category: "Gui",
        options: ["Perfect", "Flawless", "Fine", "Flawed", "Rough"]
    })
    gemstoneType = 2;
    // SUBCAT Metal Detector Solver
    @SwitchProperty({
        name: "Metal Detector Solver",
        description: "Toggles the metal detector solver for mines of divan treasure chests.",
        subcategory: "Metal Detector Solver",
        category: "Gui"
    })
    metalDetectorSolver = false;

    @SwitchProperty({
        name: "Alert Tools",
        description: "Toggles showing a title when the player has all tools.",
        subcategory: "Metal Detector Solver",
        category: "Gui"
    })
    alertTools = false;

    @SwitchProperty({
        name: "Mute Metal Detector Sound",
        description: "Mutes the metal detector sound (I hate it).",
        subcategory: "Metal Detector Solver",
        category: "Gui"
    })
    muteMetalDetectorSound = false;
    //SUBCAT Skymall Gui
    @SwitchProperty({
        name: "Skymall gui",
        description: "Toggles Skymall gui.",
        subcategory: "Skymall",
        category: "Gui"
    })
    skymallGui = false;
    //SUBCAT Commission Gui
    @SwitchProperty({
        name: "Commission gui",
        description: "Toggles Commission gui.",
        subcategory: "Commissions",
        category: "Gui"
    })
    commissionGui = false;
    @SwitchProperty({
       name: "toggle shaft commission visibility",
       description: "Makes it so that mineshaft commissions only show while in a mineshaft",
       subcategory: "Commissions",
       category: "Gui"
   })
    hideShaftComms = true;
    @SwitchProperty({
        name: "Percents",
        description: "Changes formatting to percents rather than exact amounts",
        subcategory: "Commissions",
        category: "Gui"
    })
    commissionPercents = true;
    @SwitchProperty({
        name: "Commission Location Hider",
        description: "Choose which areas you want the commission gui to show up in",
        subcategory: "Commissions",
        category: "Gui"
    })
    commLocationCheck = false;
    @SwitchProperty({
        name: "Crystal Hollows",
        description: "toggles seeing commissions while in the Crystal Hollows",
        subcategory: "Commissions",
        category: "Gui"
    })
    commLocationCH = true;
    @SwitchProperty({
        name: "Dwarven Mines",
        description: "toggles seeing commissions while in the Dwarven Mines",
        subcategory: "Commissions",
        category: "Gui"
    })
    commLocationDM = true;
    @SwitchProperty({
        name: "Glacite Tunnels",
        description: "toggles seeing commissions while in the Glacite Tunnels (including mineshafts)",
        subcategory: "Commissions",
        category: "Gui"
    })
    commLocationGT = true;
    //SUBCAT Mining Test
    @SwitchProperty({
        name: "Mining Test gui",
        description: "Toggles Mining Test gui.",
        subcategory: "MiningTest",
        category: "Gui"
    })
    miningtestgui = false;

    @TextProperty({
        name: "Test Start Countdown",
        description: "time in seconds before the test starts",
        subcategory: "MiningTest",
        category: "Gui"
    })
    testCountdown = "5";

    @SwitchProperty({
        name: "Collection Tracker",
        description: "if enabled removes test functionality and makes timer tick up instead of down",
        subcategory: "MiningTest",
        category: "Gui"
    })
    collectionTracker = false
    // SUBCAT Mining Abilities
    @SwitchProperty({
        name: "Mining abilities gui",
        description: "Toggles mining abilities gui.",
        subcategory: "Mining Abilities",
        category: "Gui"
    })
    miningAbilitiesGui = false;
    @SwitchProperty({ 
        name: "Mining abilities",
        description: "Toggles title notification of mining abilities.",
        subcategory: "Mining Abilities",
        category: "Gui"
    })
    miningAbilities = false;
    // SUBCAT Consumables
    @SwitchProperty({ 
        name: "Consumables Gui",
        description: "Toggles consumables gui",
        subcategory: "Consumables",
        category: "Gui"
    })
    consumablesGui = false;
    @SwitchProperty({
        name: "Show title when consumables expire",
        description: "Shows a title on screen when a consumable expires",
        subcategory: "Consumables",
        category: "Gui"
    })
    showConsumableTitle = false;
    @SwitchProperty({
        name: "toggle individual consumables",
        description: "Makes it so that you can pick and choose which consumables you want on the gui",
        subcategory: "Consumables",
        category: "Gui"
    })
    hideConsumables = false;
    @SwitchProperty({
        name: "toggle Fillet o' fish",
        description: "if disabled hides Fillet o' fish from consumable gui",
        subcategory: "Consumables",
        category: "Gui"
    })
    showFish = true;
    @SwitchProperty({
        name: "toggle Cacao Truffle",
        description: "if disabled hides Truffle from consumable gui",
        subcategory: "Consumables",
        category: "Gui"
    })
    showTruffle = true;
    @SwitchProperty({
        name: "toggle Pristine Potato",
        description: "if disabled hides Pristine Potato from consumable gui",
        subcategory: "Consumables",
        category: "Gui"
    })
    showPristinePotato = true;
    @SwitchProperty({
        name: "toggle Powder Pumpkin",
        description: "if disabled hides Powder Pumpkin from consumable gui",
        subcategory: "Consumables",
        category: "Gui"
    })
    showPowderPumpkin = true;
    // SUBCAT Powdertracker
    @SwitchProperty({ 
        name: "Show powdertracker",
        description: "If the tracker overlay should be visible.",
        subcategory: "Powdertracker",
        category: "Gui"
    })
    trackerVisible = false;
    
    @SwitchProperty({
        name: "Show totals",
        description: "If the tracker should show the total amount.",
        subcategory: "Powdertracker",
        category: "Gui"
    })
    showTotals = true;
    
    @SwitchProperty({
        name: "Show rates",
        description: "If the tracker should show the estimated rates per hour.",
        subcategory: "Powdertracker",
        category: "Gui"
    })
    showRates = true;
    // SUBCAT Scrap tracker
    @SwitchProperty({
        name: "Scrap tracker",
        description: "&7Enables the Scrap tracker for the Glacite Mineshaft. Gain 1 scrap for it to show up. /cw reload scrap to reset.",
        subcategory: "Scrap Tracker",
        category: "Gui"
    })
    scrapGui = false;
    // SUBCAT Stopwatch
    @SwitchProperty({
        name: "Stopwatch",
        description: "Toggles visibility of stopwatch (/cw stopwatch)",
        subcategory: "Stopwatch",
        category: "Gui"
    })
    stopwatchVisible = false;
    // SUBCAT Timer
    @SwitchProperty({
        name: "Timer",
        description: "Toggles visibility of timer (/cw timer)",
        subcategory: "Timer",
        category: "Gui"
    })
    timerVisible = false;
    @SwitchProperty({
        name: "Timer End Visiblity",
        description: "Toggles visibility of timer at 0m 0s",
        subcategory: "Timer",
        category: "Gui"
    })
    timerEndVisible = false;
    // CAT Stats
    // SUBCAT Stats
    @SwitchProperty({
        name: "Gemstone mining stats",
        description: "Shows gemstone mining speed/fortune on player profile. Also shows tick that you're mining at. (set block below)",
        subcategory: "Stats",
        category: "Stats"
    })
    gemstoneMiningStats = true;

    @SelectorProperty({
        name: "Tick speed block",
        description: "Sets the tick speed block on player profile.",
        subcategory: "Stats",
        category: "Stats",
        options: ["Green Mithril", "Blue Mithril", "Ruby", "Normal gemstone (jade, amethyst, etc)", "Topaz/Opal", "Jasper"]
    })
    tickSpeedBlock = 3;

    @SwitchProperty({
        name: "Supercraft amount",
        description: "Shows max amount you can supercraft in the menu.",
        subcategory: "Stats",
        category: "Stats"
    })
    superCraft = true;
    // CAT Waypoints
    // SUBCAT Naturals
    @SwitchProperty({
        name: "Show naturals",
        description: "If natural veins should show.",
        category: "Waypoints",
        subcategory: "Naturals"
    })
    showNaturals = false;

    @SliderProperty({
        name: "Natural range",
        description: "Range that naturals will show up in",
        category: "Waypoints",
        subcategory: "Naturals",
        min: 16,
        max: 64
    })
    naturalRange = 32;
    // SUBCAT Ordered Waypoints
    @SwitchProperty({
        name: "Ordered waypoints line",
        description: "Toggles line for ordered waypoints.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints"
    })
    orderedWaypointsLine = true;

    @SwitchProperty({
        name: "Setup mode",
        description: "Renders all waypoints in 16 block radius with a red outline with wall phase off & renders an additional line to show where the player will be looking when they warp to next block. &cCan cause lag.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints"
    })
    orderedSetup = false;
    
    @SliderProperty({
        name: "Setup Line Thickness",
        description: "The setup line thickness.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints",
        min: 1,
        max: 300
    })
    orderedSetupThickness = 100;

    @SliderProperty({
        name: "Next waypoint distance",
        description: "The distance the player must be in before the ordered waypoints goes to the next one.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints",
        min: 1,
        max: 10
    })
    nextWaypointRange = 3;

    @SliderProperty({
        name: "Ordered trace line thickness",
        description: "Thickness of trace line.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints",
        min: 1,
        max: 10
    })
    orderedLineThickness = 3;

    @ColorProperty({
        name: "Ordered line color",
        description: "Sets the color of the line.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints"
    })
    orderedColor = Color.GREEN;

    @ColorProperty({
        name: "Ordered previous color",
        description: "Sets the color of the previous waypoint.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints"
    })
    orderedPrevColor = Color.BLUE;

    @ColorProperty({
        name: "Ordered current color",
        description: "Sets the color of the current waypoint.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints"
    })
    orderedCurColor = Color.GREEN;

    @ColorProperty({
        name: "Ordered next color",
        description: "Sets the color of the next waypoint.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints"
    })
    orderedNextColor = Color.YELLOW;

    @SwitchProperty({
        name: "Show Text",
        description: "Shows the distance and name of waypoint for ordered waypoints.",
        category: "Waypoints",
        subcategory: "Ordered Waypoints"
    })
    orderedShowText = true
    // SUBCAT Normal Waypoints
    @SwitchProperty({
        name: "Show Normal Waypoint Distance",
        description: "If normal waypoints (/cw waypoint) should show distance.",
        category: "Waypoints",
        subcategory: "Normal Waypoints",
    })
    waypointShowDistance = true;

    @SwitchProperty({
        name: "Show Box",
        description: "If normal waypoints (/cw waypoint) should show the box on the waypoint.",
        category: "Waypoints",
        subcategory: "Normal Waypoints",
    })
    waypointShowBox = false;

    @SwitchProperty({
        name: "Show Line",
        description: "If normal waypoints (/cw waypoint) should show a line between waypoints showing where to etherwarp.",
        category: "Waypoints",
        subcategory: "Normal Waypoints",
    })
    waypointShowLine = false;

    @SwitchProperty({
        name: "Show Horizontal Distance",
        description: "If normal waypoints (/cw waypoint) should show only horizontal (x and z) distance instead of including the y in distance calculation.",
        category: "Waypoints",
        subcategory: "Normal Waypoints",
    })
    waypointShowHorizontal = false;

    @SwitchProperty({
        name: "Creeper Waypoints",
        description: "Waypoints for sneaky creepers in deep cavern.",
        subcategory: "Normal Waypoints",
        category: "Other"
    })
    creeperWaypoints = false;
    // CAT Other
    // SUBCAT Dungeon
    @SwitchProperty({
        name: "M3 timer",
        description: "Shows a timer for fire freeze in m3.",
        subcategory: "Dungeon",
        category: "Other"
    })
    m3timer = false;
    // SUBCAT Foraging
    @SwitchProperty({
        name: "Treecap Timer",
        description: "Shows a timer over crosshair that shows time to next treecapitator proc.",
        subcategory: "Foraging",
        category: "Other"
    })
    treecapTimer = false;
    // SUBCAT UYOR
    @SwitchProperty({
        name: "Corpse Finder",
        description: "&4Depreciated &7 /ct import NwjnAddons for legit version",
        subcategory: "UYOR",
        category: "Other"
    })
    corpseEsp = false;
}

export default new Settings()
