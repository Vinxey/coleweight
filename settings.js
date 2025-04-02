import { @Vigilant, @ButtonProperty, @SwitchProperty, @SelectorProperty, @SliderProperty, @TextProperty, @ColorProperty, Color } from "../Vigilance/index"

@Vigilant("Coleweight/config", "Coleweight Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Gui", "Stats", "Waypoints", "Other"];

        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", `&aColeweight &bv${JSON.parse(FileLib.read("Coleweight", "metadata.json")).version}` + 
        `\n&aBy &bNinjune`)
        this.addDependency("Glacite Tunnels", "Commission Location Hider")
        this.addDependency("Dwarven Mines", "Commission Location Hider")
        this.addDependency("Crystal Hollows", "Commission Location Hider")
        this.addDependency("toggle Fillet o' fish","toggle individual consumables")
        this.addDependency("toggle Cacao Truffle","toggle individual consumables")
        this.addDependency("toggle Pristine Potato","toggle individual consumables")
        this.addDependency("toggle Powder Pumpkin","toggle individual consumables")
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
        name: "Auto renew Crystal Hollows Pass",
        description: "Renews pass when the 1 minute message pops up.",
        subcategory: "General",
        category: "General"
    })
    autoRenew = true;

    @SwitchProperty({
        name: "Debug",
        description: "Toggles debug mode.",
        subcategory: "General",
        category: "General"
    })
    debug = false;

    @SwitchProperty({
        name: "Glacite tunnels waypoints",
        description: "Shows colored waypoints where gem types are in the Glacite Tunnels.",
        subcategory: "General",
        category: "General"
    })
    tunnelsWaypoints = true;

    @SwitchProperty({
        name: "Party transfer command",
        description: "Enables party command !ptme or ?pt or .ptme etc. to transfer party",
        subcategory: "General",
        category: "General"
    })
    transferCommand = false;

    @SwitchProperty({
        name: "Efficient miner overlay V2",
        description: "Shows an heatmap for umber/tungsten highlighting the best block to break.",
        subcategory: "General",
        category: "General"
    })
    efficientMinerOverlay = false;

    @SwitchProperty({
        name: "Old heatmap",
        description: "Uses the old heatmap system for the efficient miner overlay.",
        subcategory: "General",
        category: "General"
    })
    oldHeatmap = false;

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
    // CAT Gui
    // SUBCAT Alloy Tracker
    @SwitchProperty({
        name: "Alloy Tracker",
        description: "Enables the Alloy tracker. Displays the most recent, known alloy drop.",
        subcategory: "Alloy Tracker",
        category: "Gui"
    })
    alloyTracker = false;

    @ButtonProperty({
        name: "Change Alloy Tracker Position",
        description: "Move the location of the alloy tracker.",
        subcategory: "Alloy Tracker",
        category: "Gui",
        placeholder: "Open"
    })
    moveAlloyTrackerLocation() {
        ChatLib.command("cw move alloy", true);
    }
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

    @ButtonProperty({
        name: "Change Coin Tracker Position",
        description: "Move the location of the coin tracker.",
        subcategory: "Coin Tracker",
        category: "Gui",
        placeholder: "Open"
    })
    moveCoinTrackerLocation() {
        ChatLib.command("cw move coin", true);
    }

    @SelectorProperty({
        name: "Gemstone Type",
        description: "Sets the type of gemstones to use for coin tracker for bazaar prices.",
        subcategory: "Coin Tracker",
        category: "Gui",
        options: ["Perfect", "Flawless", "Fine", "Flawed", "Rough"]
    })
    gemstoneType = 2;
    // SUBCAT Coleweight Tracker
    @SwitchProperty({
        name: "Coleweight tracker",
        description: "&4Deprecated &7Update Soon!",
        subcategory: "Coleweight Tracker",
        category: "Gui"
    })
    cwToggle = false;
    // SUBCAT Collection
    @SwitchProperty({
        name: "Collection tracker",
        description: "&4Deprecated &7 Update soon!",
        subcategory: "Collection",
        category: "Gui"
    })
    collectionTracker = false;
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

    @ButtonProperty({
        name: "Change skymall gui position",
        description: "Move the location of the skymall gui.",
        subcategory: "Skymall",
        category: "Gui",
        placeholder: "Open"
    })
    moveSkymallLocation(){
        ChatLib.command("cw move skymallgui", true);
    }
    //SUBCAT Commission Gui
    @SwitchProperty({
        name: "Commission gui",
        description: "Toggles Commission gui.",
        subcategory: "Commissions",
        category: "Gui"
    })
    commissionGui = false;
    @ButtonProperty({
        name: "Change commission gui position",
        description: "Move the location of the commission gui.",
        subcategory: "Commissions",
        category: "Gui",
        placeholder: "Open"
    })
    movecommissionLocation(){
        ChatLib.command("cw move commissiongui", true);
    }
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

    @ButtonProperty({
        name: "Change MiningTest gui position",
        description: "Move the location of the MiningTest gui.",
        subcategory: "MiningTest",
        category: "Gui",
        placeholder: "Open"
    })
    moveMiningTestLocation(){
        ChatLib.command("cw move miningtestgui", true);
    }

    // SUBCAT Mining Abilities
    @SwitchProperty({ 
        name: "Mining abilities",
        description: "Toggles title notification of mining abilities.",
        subcategory: "Mining Abilities",
        category: "Gui"
    })
    miningAbilities = false;

    @SwitchProperty({
        name: "Mining abilities gui",
        description: "Toggles mining abilities gui.",
        subcategory: "Mining Abilities",
        category: "Gui"
    })
    miningAbilitiesGui = false;

    @SwitchProperty({
        name: "Mining abilities selected indicator",
        description: "Tells which ability is selected on the ability gui.",
        subcategory: "Mining Abilities",
        category: "Gui"
    })
    miningAbilitiesSelectedIndicator = true;

    @ButtonProperty({
        name: "Change mining abilities position",
        description: "Move the location of the mining abilities gui.",
        subcategory: "Mining Abilities",
        category: "Gui",
        placeholder: "Open"
    })
    moveAbilitiesLocation() {
        ChatLib.command("cw move miningabilities", true);
    }
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
    @ButtonProperty({
        name: "Change consumables position",
        description: "Move the location of the consumables gui.",
        subcategory: "Consumables",
        category: "Gui",
        placeholder: "Open"
    })
    moveConsumablesLocation() {
        ChatLib.command("cw move consumablesgui", true);
    }
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
    
    @ButtonProperty({
        name: "Change Powdertracker position",
        description: "Move the location of the powdertracker.",
        subcategory: "Powdertracker",
        category: "Gui",
        placeholder: "Open"
    })
    movePowderLocation() {
        ChatLib.command("cw move powdertracker", true);
    }
    // SUBCAT Scrap tracker
    @SwitchProperty({
        name: "Scrap tracker",
        description: "&7Enables the Scrap tracker for the Glacite Mineshaft. Gain 1 scrap for it to show up. /cw reload scrap to reset.",
        subcategory: "Scrap Tracker",
        category: "Gui"
    })
    scrapGui = false;

    @ButtonProperty({
        name: "Change Scrap tracker position",
        description: "Move the location of the scrap tracker.",
        subcategory: "Scrap Tracker",
        category: "Gui",
        placeholder: "Open"
    })
    moveCwLocation() {
        ChatLib.command("cw move scrap", true);
    }
    // SUBCAT Stopwatch
    @SwitchProperty({
        name: "Stopwatch",
        description: "Toggles visibility of stopwatch (/cw stopwatch)",
        subcategory: "Stopwatch",
        category: "Gui"
    })
    stopwatchVisible = false;

    @ButtonProperty({
        name: "Change stopwatch position",
        description: "Move the location of the stopwatch.",
        subcategory: "Stopwatch",
        category: "Gui",
        placeholder: "Open"
    })
    moveStopwatchLocation() {
        ChatLib.command("cw move stopwatch", true);
    }
    // SUBCAT Timer
    @SwitchProperty({
        name: "Timer",
        description: "Toggles visibility of timer (/cw timer)",
        subcategory: "Timer",
        category: "Gui"
    })
    timerVisible = false;

    @ButtonProperty({
        name: "Change timer position",
        description: "Move the location of the timer.",
        subcategory: "Timer",
        category: "Gui",
        placeholder: "Open"
    })
    moveTimerLocation() {
        ChatLib.command("cw move timer", true);
    }

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

    @ButtonProperty({
        name: "Change Fire Freeze Position",
        description: "Move the location of the fire freeze timer.",
        subcategory: "Dungeon",
        category: "Other",
        placeholder: "Open"
    })
    moveffLocation() {
        ChatLib.command("cw move ff", true);
    }
    // SUBCAT Foraging
    @SwitchProperty({
        name: "Treecap Timer",
        description: "Shows a timer over crosshair that shows time to next treecapitator proc.",
        subcategory: "Foraging",
        category: "Other"
    })
    treecapTimer = false;

    // SUBCAT Kuudra
    @SwitchProperty({
        name: "Cells Alignment Tracker",
        description: "Shows a tracker for the current cells alignment from the gyrokinetic wand.",
        subcategory: "Kuudra",
        category: "Other"
    })
    gyroTracker = false;

    @ButtonProperty({
        name: "Change Alignment Tracker Position",
        description: "Move the location of the alignment tracker.",
        subcategory: "Kuudra",
        category: "Other",
        placeholder: "Open"
    })
    moveGyroLocation() {
        ChatLib.command("cw move gyro", true);
    }
    // SUBCAT UYOR
    @SwitchProperty({
        name: "Corpse Finder",
        description: "&4Depreciated &7 /ct import NwjnAddons for legit version",
        subcategory: "UYOR",
        category: "Other"
    })
    corpseEsp = false;

    @SwitchProperty({
        name: "Pest Finder",
        description: "&4Depreciated",
        subcategory: "UYOR",
        category: "Other"
    })
    pestEsp = false;
}

export default new Settings()
