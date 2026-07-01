import * as admin from 'firebase-admin';
const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Studios that already have research notes with scores or enough info to score
const scorableStudios: { id: string; fit: number; fitReason: string }[] = [
  // Narrative-first studios (90-100)
  { id: 'WpzSMOnYqw20OgK8yBnl', fit: 95, fitReason: '1000xRESIST won Peabody Award - exceptional narrative about Hong Kong diaspora. Theatre/performance background = storytelling DNA.' },
  { id: 'Yw4OCdivW03XShqqajsr', fit: 95, fitReason: 'Too Kyo Games founded by Danganronpa + Zero Escape creators. Narrative is their entire identity.' },
  { id: 'sXZErORcytQx0ZsMdlOV', fit: 95, fitReason: 'OPUS series won IGF Excellence in Narrative. 10M+ downloads. "Heartfelt stories that touch on themes of love."' },
  { id: 'X6Kv8kmwIAxdddPV1Atf', fit: 85, fitReason: 'Frictional Games = SOMA (philosophical horror), Amnesia series. Narrative-first horror studio hiring narrative designers.' },
  { id: 'gUHIy1sUVpD76pWoN24D', fit: 88, fitReason: 'Fellow Traveller = publisher specializing in narrative indie games. Every game they publish has "narrative at their core."' },
  { id: 'TVXHqQME767aWDuT9AkR', fit: 90, fitReason: 'Papergames = Love and Deepspace ($250M+ revenue), narrative-heavy visual novels and otome games with deep dialogue.' },
  { id: 'UjF2fSrQakrDarbvIdJB', fit: 90, fitReason: 'Out of the Blue = Call of the Sea, American Arcadia, The Vigilante Diaries (upcoming RPG). Pure narrative focus.' },
  { id: 'be9A2p5PQJps8K8D12qw', fit: 92, fitReason: 'Polychroma Games = Until Then, critically acclaimed narrative adventure set in Philippines. Perfect Director fit.' },
  { id: 'a6YkixsHfDfXs1eMPFsM', fit: 85, fitReason: 'Weather Factory = Alexis Kennedy (founded Failbetter, Sunless Sea). Dense interconnected lore, systemic narrative.' },
  { id: 'wIZeJpe8unYqyI9VjYOG', fit: 90, fitReason: 'Harebrained Schemes = Shadowrun trilogy, GRAFT (upcoming). "Narratively rich worlds, compelling characters, impactful choices."' },
  { id: 'qTQ8kp4L4MPT46dciyom', fit: 85, fitReason: 'Kiro\'o Games = Aurion, first African fantasy action-RPG. Deep African mythology and lore. Critics praise storytelling.' },
  { id: 'vfOM1AWqvQFMlYuZSXNv', fit: 85, fitReason: 'Lienzo = Mulaka (Tarahumara mythology). Works with anthropologists for authentic indigenous storytelling.' },
  { id: 'ltnA6JbOmObu848GqMQz', fit: 88, fitReason: 'Paradox Dev Studio = Crusader Kings 3, Stellaris. Pioneer of emergent narrative in games - procedural character stories.' },
  
  // Strong narrative elements (70-89)
  { id: 'P72FP5iqXKgmV6e8FYDZ', fit: 85, fitReason: 'Fool\'s Theory = Witcher Remake developer. Ex-CDPR Senior Quest Designer. Trusted by Larian for co-dev.' },
  { id: 'V5WQZOaM39KZZQDfrSOv', fit: 75, fitReason: 'Supermassive = Until Dawn, Dark Pictures (186 possible endings). Currently UNSTABLE with layoffs - deprioritize.' },
  { id: 'ug4rvvotbCuUzbvWSF96', fit: 80, fitReason: 'Bloober Team = Silent Hill 2 Remake, Layers of Fear. Horror narrative specialists. AA size, approachable.' },
  { id: 'VKLzapbaRA976qS7X5EL', fit: 80, fitReason: '11 bit studios = This War of Mine, Frostpunk. "Meaningful entertainment" - emotionally impactful narrative-driven games.' },
  { id: 'sEh7dqjXcE5uxFFIkE2S', fit: 85, fitReason: 'Hazelight = It Takes Two (GOTY 2021). Asymmetric co-op = NPCs should react differently to each player.' },
  { id: 'Zn2DmlvoybyltGTjY1MZ', fit: 80, fitReason: 'DigixArt = Road 96 (procedural narrative). Experts in emergent storytelling - exactly what Director enables.' },
  { id: 'PGcZV6QOK9cnnOymhlaD', fit: 75, fitReason: 'Alt Shift = Crying Suns, Battlestar Galactica game. Story-rich roguelites with procedural narrative.' },
  { id: 'OOWpM326xAnYXrWUSz0r', fit: 75, fitReason: 'Gravity Co = Ragnarok Online (120M+ users). MMORPG = perfect for dynamic NPC dialogue at scale.' },
  { id: 'jdiKfzyYJDdm2m1rcQSp', fit: 75, fitReason: 'CreativeForge Games = Hard West (branching Western horror stories), Phantom Doctrine. Strong narrative campaigns.' },
  { id: 'tWGphDA1zMZTamTN5LzN', fit: 70, fitReason: 'Cyanide Studio = Call of Cthulhu, Styx. Strong narrative portfolio with horror/investigation games.' },
  { id: 'aIwJiWDhhZq5AhS5FW2k', fit: 65, fitReason: 'DON\'T NOD = Life is Strange, Vampyr. ~300 employees, publicly traded - may have internal capabilities.' },
  { id: 'f5G5ZIKr80OwjggQwD2D', fit: 70, fitReason: 'inXile = Wasteland, Torment. Narrative-heavy RPGs. Microsoft ownership = enterprise sales cycle.' },
  { id: 'TcD9ZC8lLtZ2NJbIEbUf', fit: 75, fitReason: 'Logic Artists = Expeditions series (Conquistador, Viking, Rome). Tactical RPG with narrative focus.' },
  { id: 'bLIzX1j75AVh76EclJFH', fit: 70, fitReason: 'Pearl Abyss = Black Desert, Crimson Desert. Open-world with NPC systems. Large AAA but narrative direction emerging.' },
  { id: 'hit9YFhTnM58yc0lMKqG', fit: 72, fitReason: 'Fast Travel Games = VTM Justice, Wraith. VR narrative games in World of Darkness setting.' },
  { id: 'sgZcKic9ME3tKNCQeG1P', fit: 70, fitReason: 'Spiders = GreedFall, Steelrising. Action RPGs with narrative. ~95 employees, Nacon owned.' },
  { id: 'lhztmggCJ7QGJXa06EM2', fit: 75, fitReason: 'Piranha Bytes = Gothic, ELEX. Iconic German RPGs with faction systems and NPC dialogue.' },
  { id: 'XrYSzNh1rjOA9MhzapCW', fit: 70, fitReason: 'Triumph Studios = Age of Wonders, Overlord. Strategy RPG with dialogue systems. Paradox owned.' },
  { id: 'rVitRSEfJDH9UYdhKU0P', fit: 75, fitReason: 'Alterego Games = Bloodstreet 13 (branching detective narrative). Dutch studio, local to LoreWeaver.' },
  { id: 'n1tpvpXOw1m6T5ZNnnoE', fit: 65, fitReason: 'Jo-Mei Games = Sea of Solitude (emotional narrative about loneliness). Small team, personal stories.' },
  { id: 'vqfM0KbCzGKjTZ1Ks90n', fit: 80, fitReason: 'like Charlie = Ghost on the Shore (branching narrative). 8-person team doing exactly our target work.' },
  { id: 'cduyHpMMpO3LK4DSBDxy', fit: 65, fitReason: 'Fishing Cactus = Epistory, Nanotale (narrative typing games). "Smart games with soul" philosophy.' },
  { id: 'k24TH7pg8GZToyPaJq8f', fit: 65, fitReason: 'Artifex Mundi = Hidden object puzzle adventures with narrative. 100+ employees, also publisher.' },
  { id: 'qXrpCnSFG49IudHC63Z3', fit: 80, fitReason: 'Wales Interactive = Late Shift, The Bunker. FMV game pioneers. Two-time BAFTA winners.' },
  { id: 'l03TjaNm1cSSS1cEE5Of', fit: 85, fitReason: 'No Code (Screen Burn) = Stories Untold (BAFTA), working on SILENT HILL: TOWNFALL. Ex-AAA narrative veterans.' },
  { id: 'pPVK8wmZBiboeaCRFwnP', fit: 90, fitReason: 'Giant Sparrow = What Remains of Edith Finch (BAFTA best game). Defines narrative exploration genre.' },
  { id: 'smzplg3nBm8DFVi2zpF5', fit: 75, fitReason: 'KeokeN Interactive = Deliver Us The Moon/Mars. Sci-fi narrative adventures.' },
  { id: 'YeNVVqjV4D2bcNzcedDo', fit: 75, fitReason: 'Behold Studios = Knights of Pen & Paper. Meta-RPG with tabletop narrative. 70+ awards.' },
  { id: 'dEi72SFwgihgUzB9xcQp', fit: 80, fitReason: 'Corbomite Games = "Highly narrative games, appealing to mass audience". Episodic adventure focus.' },
  { id: 'rDzabvWDu0Yx4fDzaaRB', fit: 85, fitReason: 'Happy Juice Games = Lost in Play (Overwhelmingly Positive). Quest/adventure specialists.' },
  { id: 'jkNFK2Dw34cwJqfGKSfv', fit: 85, fitReason: 'Pikselnesia = Afterlove EP, What Comes After. "We love telling stories through video games."' },
  { id: 'UiLzYuJ8eWIjDCa26mNJ', fit: 80, fitReason: 'Persona Theory Games = "Indie narrative games studio". SEA stories. Won SEA Game Awards.' },
  { id: 'hMI4mahYUtW6trS07Az4', fit: 70, fitReason: 'Agate International = 250+ games including VNs and JRPGs. Indonesia\'s largest game studio.' },
  { id: 'nv9uabUCs0KU0lZ3ZvLg', fit: 80, fitReason: 'Rayark = OPUS, Cytus, Deemo. Rhythm games with deep narrative. 250 employees.' },
  { id: 'at8oXHldmsc6NCcpZl2x', fit: 80, fitReason: 'Witching Hour Studios = Masquerada (tactical RPG, fully voiced), Ravenwatch. Strong narrative DNA.' },
  { id: 'XK4LvULImzeIPCmZ56J3', fit: 85, fitReason: 'BearBone Studio = Minds Beneath Us (sci-fi narrative). Won Taipei Game Show Grand Prix 2025.' },
  { id: 'm6ZUMhdIvr9uYHfj4V7z', fit: 75, fitReason: 'Kurechii = Postknight. "Guild of storytellers and world-builders." Compelling stories focus.' },
  { id: 'lfKFXdXNKqKGZw1SkJpO', fit: 88, fitReason: 'Masala Games = Detective Dotson (95% positive). Founder is BAFTA/Oscar winner. Dream lead.' },
  { id: 'bVeZaT5zio53yi62TMmC', fit: 80, fitReason: 'Nodding Heads Games = Raji (2M+ players, Indian mythology). Sequel announced. Strong cultural narrative.' },
  { id: 'VyFh1OEB4eZwphLa24gc', fit: 75, fitReason: 'Gattai Games = Stifled (VR horror). Focus on narrative tension over cheap scares.' },
  { id: 'o2Vuju3v4re6rkHOUtgr', fit: 75, fitReason: 'Urnique Studio = Timelie (time-manipulation stealth puzzle). Award-winning narrative puzzle.' },
  { id: 'mOPxi33wGbcToLBrlSWP', fit: 75, fitReason: 'FairPlay Studios = The Land Beneath Us. First Thai game on Apple Arcade. Game industry veterans.' },
  { id: 'kqe4SzVLaZVmYNVXFZWz', fit: 80, fitReason: 'Jiwe Studios = Usoni (African post-apocalyptic). Deep cultural storytelling about El Molo people.' },
  { id: 'PutRwjQQoKa5fLxLaJ3F', fit: 85, fitReason: 'Pixpil = Eastward (critically acclaimed narrative adventure). Emotional narrative core.' },
  { id: 'rmTVoFel5a8VKLCCdKfK', fit: 80, fitReason: 'Misty Mountain Studio = The Rewinder (Chinese mythology). Now pivoting to "game AI studio" - warm lead!' },
  { id: 'y8xf1RLhB4tIFBOdraUH', fit: 80, fitReason: 'Digital Happiness = DreadOut (Indonesian folklore horror). Horror narrative with local mythology.' },
  { id: 'VFCK3O4LXtD777mjaF7D', fit: 75, fitReason: 'Yggdrazil Group = Home Sweet Home (Thai folklore horror). VR + narrative horror. Publicly listed.' },
  { id: 'dHywqYWdBFutwnDUIjG1', fit: 85, fitReason: 'Kashkool Games = Sheba: A New Dawn. Arabian/Jinn mythology Metroidvania. Perfect fit for authentic ME storytelling.' },
  { id: 'UL0fEklVzRQq9zBeTs7v', fit: 80, fitReason: 'Falafel Games = Arabic-first gaming pioneer. Knights of Glory, culturally grounded RPGs.' },
  { id: 'qGHsKXYClxcVq7Gu2FAD', fit: 85, fitReason: 'FitNot Games = "Arabic gaming driven by MENA culture, heritage, history. Games with impact, captivating narrative."' },
  { id: 'y626ZHITQn7FQuzVhbuE', fit: 80, fitReason: 'Rumbling Games = Knights of Light, first Arabic AAA. Historical action-RPG. Culture in games focus.' },
  { id: 'hwpMVA4WIDzrciUp1AGF', fit: 80, fitReason: 'DUT Studio = The Death (Vietnamese psychological horror). Set in Hanoi, Vietnamese folklore.' },
  { id: 'oDLgCxFllJ4zkOYuaOuE', fit: 75, fitReason: 'Hiker Games = 7554, 300475 (Vietnam War games). Historical narrative focus.' },
  { id: 'tcrITVLmWj0VF0HpiP4l', fit: 80, fitReason: 'NEKCOM Games = Showa American Story. 30+ employees. Alternate history RPG. NYC/Tokyo offices.' },
  { id: 'gfYMrnSZnXafNJKb7MvV', fit: 75, fitReason: 'Wonder Potion = SANABI (cyberpunk action with strong narrative). Japanese players voted it personal GOTY.' },
  { id: 'cKoSFrX5LuERW1Qk1WSV', fit: 80, fitReason: 'Kesera Games = Nientum (2D action with theatrical/musical elements). Narrative based on myths/fairy tales.' },
  { id: 'mpvDR6Hra291NhrFLRxJ', fit: 75, fitReason: 'Dvora Studio = Horror-adventure with branching narrative. Korean school/cultural settings.' },
  
  // Some narrative (50-69)
  { id: 'O0aRnNX9sAPruvnYLfvm', fit: 65, fitReason: 'MachineGames = Indiana Jones, Wolfenstein. AAA narrative but Microsoft ownership = corporate approval needed.' },
  { id: 'O1pOmEV1P85eLJnoXC0E', fit: 55, fitReason: 'Frozenbyte = Trine series (action-adventure puzzle). Some narrative but primarily gameplay-focused.' },
  { id: 'OUmRtuCzcGTnfqO6jgWB', fit: 80, fitReason: 'Sandfall Interactive = Clair Obscur: Expedition 33. JRPG-style with narrative focus. Ex-Ubisoft founders.' },
  { id: 'd6PZpj8ESs7ClhpKBfob', fit: 45, fitReason: 'Ishtar Games = The Last Spell, Dead in Vinland. RPG elements but primarily management/tactical games.' },
  { id: 'SRoEtQEJ7O7HtP54aUMt', fit: 60, fitReason: 'Harvester Games = The Cat Lady trilogy (horror adventure). Very small team (2 people), limited budget.' },
  { id: 'dLhxiHTGnYDPJ7QKmwvN', fit: 40, fitReason: 'Klei Entertainment = Don\'t Starve (minimal dialogue), Griftlands (has negotiation). Systems-focused.' },
  { id: 'oaRWY0adVFeJc1QomJ2n', fit: 65, fitReason: 'KING Art Games = Book of Unwritten Tales (point-and-click), Iron Harvest. Adventure game heritage.' },
  { id: 'UqKwuKNik79flM0Rh7yF', fit: 55, fitReason: 'BioWare = Dragon Age, Mass Effect. Legendary but EA ownership, corporate bureaucracy.' },
  { id: 'euHBjIu6Tb9YKgYkTV2r', fit: 60, fitReason: 'NIS = Disgaea, Metaphor: ReFantazio. Quirky narratives but Japanese market, Sega parent.' },
  { id: 'le6ucHZV4VeOWXQ1sC0D', fit: 65, fitReason: 'Atlus = Persona, SMT. Extremely narrative-heavy but Sega parent, Japanese corporate structure.' },
  { id: 'xAKEaGQlsV3ICFpqu27c', fit: 55, fitReason: 'Level-5 = Professor Layton, Ni no Kuni. Strong narrative but 300 employees, Japan-focused.' },
  { id: 'ZBoQvpwMK6dHkLslxeO6', fit: 80, fitReason: 'Team Vanguard = Lost Nomad RPG based on Turkic mythology. Perfect narrative-first project.' },
  { id: 'gR3FPxqZ7amNdCIoIi1n', fit: 65, fitReason: 'Total Mayhem Games = We Were Here series (15M+ players). Co-op puzzle adventure.' },
  { id: 'Rjfeq1GmcIAZecC3SOW9', fit: 75, fitReason: 'Rusty Lake = Cube Escape series. Surreal point-and-click adventures. 2-man team.' },
  { id: 'QRtn1LXaXoZDTocj9JKh', fit: 50, fitReason: 'Sokpop Collective = 80+ games. Rapid prototyping, varied genres. Stacklands has some narrative.' },
  { id: 'gf62cd87b8CavrXDJQVI', fit: 55, fitReason: 'Tarsier Studios = Little Nightmares. Environmental storytelling, minimal dialogue. Embracer owned.' },
  { id: 'Xgym1rGSkzSHuNE8e3AB', fit: 50, fitReason: 'Sumo Digital = LittleBigPlanet, Sackboy. 1200+ employees, Tencent owned. Too large for indie sale.' },
  { id: 'PkhToHNuNn7ECBoX0ki1', fit: 55, fitReason: 'ustwo games = Monument Valley. Visual storytelling excellence but minimal NPC dialogue.' },
  { id: 'intn31vXnaEWWXgW89yJ', fit: 60, fitReason: 'The Gentlebros = Cat Quest series. Fun narrative with adventure gameplay.' },
  { id: 'drwlNnZgwVO8DwGF4FVC', fit: 60, fitReason: 'Pieces Interactive = Alone in the Dark remake. Survival horror with narrative but Embracer restructuring.' },
  { id: 'fGzY0LvdzzkS8MpAKZzh', fit: 45, fitReason: 'Firaxis = Civilization, XCOM. Strategy games with limited NPC dialogue but hiring narrative leads.' },
  { id: 'aE4nvXkfcVcaqgXPLjqn', fit: 50, fitReason: 'Amplitude Studios = Endless Legend, Humankind. Strategy/4X focus. 180+ employees, Sega owned.' },
  { id: 'alvbSuAaStpQKkf4WRXT', fit: 50, fitReason: 'Starbreeze = Payday series (minimal narrative). 200 employees. Financial troubles, recovering.' },
  { id: 'rOcJbNBnpeUMDpDdR3fA', fit: 55, fitReason: 'Fatshark = Darktide, Vermintide. Has narrative director, co-op action focus. Live service content.' },
  { id: 'kCDuRaFrwGoL6YvmTPIH', fit: 40, fitReason: 'Frontier = Planet Coaster/Zoo, Elite. Simulation focus, limited NPC dialogue. Complex Games division better fit.' },
  
  // Light narrative (30-49)
  { id: 'hIMsNsS6fKJgzC83K94b', fit: 55, fitReason: 'Digital Sun = Moonlighter. Roguelike/shopkeeping. Some NPC interaction but roguelike limits depth.' },
  { id: 'g4jee6yMscqSOzVQxPh3', fit: 55, fitReason: 'Mercury Steam = Metroid Dread, Castlevania. Metroidvania = limited NPC dialogue. Nintendo partnership.' },
  { id: 'Ue0Kuu3McVJpxf61krl0', fit: 35, fitReason: 'Motion Twin = Dead Cells. Worker cooperative, 10 person max. Roguelike = minimal NPC dialogue.' },
  { id: 'dlgeVHAN2nNigQ7GWrO8', fit: 40, fitReason: 'Ghost Ship Games = Deep Rock Galactic. Co-op FPS mining. Non-toxic community but no narrative.' },
  { id: 'qETHP26EefDvpbok2t2N', fit: 45, fitReason: 'Chucklefish = Starbound, Wargroove. Tactics/sandbox. Publisher role could introduce to other devs.' },
  { id: 'qhsh2ZltOsNwvg7RRL2b', fit: 30, fitReason: 'IO Interactive = Hitman, 007. AAA emergent gameplay but 400+ employees, enterprise procurement.' },
  { id: 'ufq3RQc7aHZ0mqiRCPMI', fit: 55, fitReason: 'Playdead = LIMBO, Inside. Environmental storytelling masters but minimal dialogue. 70-100 employees.' },
  
  // No narrative fit (0-29)
  { id: 'Q77bW04AeuPzXIqFGLUW', fit: 0, fitReason: 'Glass Egg = Art outsourcing studio, not a game developer. Do not pursue.' },
  { id: 'Q8OoTniQmBg6BCAQvUHt', fit: 35, fitReason: 'Jump Over The Age = Solo developer (In Stars and Time). Exceptional narrative but solo = no integration capacity.' },
  { id: 'aKbFAdr15MfOAp96ijYn', fit: 15, fitReason: 'Colossal Order = Cities: Skylines. Pure city-builder simulation, NO narrative elements.' },
  { id: 'XNP4l7FbGCq9au8StDf3', fit: 25, fitReason: 'Muro Studios = Shadow Bug (action platformer). 2-person team, no NPC dialogue.' },
  { id: 'PBnddMf0AosgnSLohvUg', fit: 40, fitReason: 'DoubleMoose = Abyssus (roguelike FPS). Action-focused, minimal narrative. Small team.' },
  { id: 'XrORaAbPHHRfqMXqynrb', fit: 20, fitReason: 'Deadtoast (My Friend Pedro) = ONE-MAN team making action shooters. Zero narrative depth.' },
  { id: 'OZXoms4nIlAMCGWCHzQj', fit: 25, fitReason: 'Plarium = RAID: Shadow Legends. Mobile/casual focus. 1300+ employees, not narrative-focused.' },
  { id: 'PoOM1S5BsktKDnFZT6xf', fit: 15, fitReason: 'CrazyLabs = Hyper-casual mobile games. No narrative.' },
  { id: 'cw9A0G6yAuGh46qKcv8V', fit: 15, fitReason: 'Moon Active = Coin Master. Casual mobile, not narrative-focused.' },
  { id: 'csL5XlaQkTW1Inwi6ek6', fit: 15, fitReason: 'Playtika = Social casino games. No narrative relevance.' },
  { id: 'ZgqzrXc14bLnSc3FDFIL', fit: 0, fitReason: 'Sparx (Virtuos) = Art outsourcing studio, not a game developer.' },
  { id: 'uzsfROf67edB92u7HCKV', fit: 20, fitReason: 'Bugbear = Wreckfest, FlatOut. Racing with destruction physics. No narrative.' },
  { id: 'uI1PzCbxK12JcE3D6lKo', fit: 20, fitReason: 'Sybo Games = Subway Surfers (3B+ downloads). Mobile endless runner, no narrative.' },
  { id: 'odzVnsLWf7rETQoRVEOT', fit: 45, fitReason: 'Nomada Studio = GRIS, Neva. Art-driven emotional storytelling but wordless/minimal dialogue games.' },
  { id: 'Z7V7qYY8jROQzBOVH8uR', fit: 45, fitReason: 'Happy Volcano = The Almost Gone (narrative puzzle). Puzzle games = less need for dynamic NPC dialogue.' },
  { id: 'blKeMhHRDK0EF6neJLMc', fit: 30, fitReason: 'Pajama Llama = Flotsam (town builder). Simulation/management, no significant narrative.' },
  { id: 'kXIfjuyifeLeez1PVAU1', fit: 25, fitReason: 'Almost Human = Legend of Grimrock. LIKELY DORMANT. No releases since 2015.' },
  { id: 'dvi18KKcWjDUmlyTXgKT', fit: 15, fitReason: 'Certain Affinity = Halo multiplayer, CoD maps. KEYWORDS STUDIOS owned. FPS/multiplayer only, no story.' },
  { id: 'iMpGASYOgLcZoOJv1hcB', fit: 35, fitReason: 'Devolver Digital = PUBLISHER not developer. Could introduce to dev network but hands-off with tools.' },
  { id: 'zm8LBP4BN1ZbiARtDDfw', fit: 15, fitReason: 'Coffee Stain = Goat Simulator, Satisfactory. Pure sandbox/building, ZERO narrative elements.' },
  { id: 'xvB3b7lOxhQ4yvCDpX5E', fit: 40, fitReason: 'Avalanche Studios = Just Cause. Action-focused, less narrative. Contraband cancelled 2024.' },
  { id: 'w5yBAJzDdhMZyHGaJJMK', fit: 30, fitReason: 'Cybernetic Walrus = Simulation games with horror/comedy. Systems-driven, not narrative.' },
  { id: 'jdDjAMlBN578m1jmHZ4o', fit: 40, fitReason: 'Mooneye Studios = Lost Ember (narrative adventure). 4 people = too small. Publishing arm opportunity.' },
  { id: 'c7QNHaiiXXDaTdlwWXGG', fit: 15, fitReason: 'Insomniac = Spider-Man, Wolverine. AAA Sony first-party, too large, AI concerns post-strike.' },
  { id: 'tLD5MwwqD6nyuHXFOqWS', fit: 35, fitReason: 'Sloclap = Sifu, Absolver. Combat-focused action games. Less narrative focus.' },
  { id: 'bs8wwq9g9R8k3O7bcuRb', fit: 50, fitReason: 'Game Science = Black Myth: Wukong. Massive success but 100+ employees, extensive internal tools.' },
  { id: 'Smw3DWVRCAiKsbmvzpRh', fit: 35, fitReason: 'Genius Sonority = Pokémon games. Second-party Nintendo, limited creative control.' },
  { id: 'hdixYC1bXrIzQEuDLg9I', fit: 35, fitReason: 'NAT Games = V4, Overhit. MMORPGs with gacha. Narrative is scripted quest content.' },
  { id: 'gwnFbaMf5rcWp3biknh2', fit: 20, fitReason: 'Gamota = Mobile game PUBLISHER in Vietnam, not developer.' },
  { id: 'jcIsI3auANLIMYzG8nnd', fit: 15, fitReason: 'Galaxy4Games = Work-for-hire development. Creates games for clients, not original narrative IP.' },
  { id: 'nODoTxMZG8dpP3pQe4R5', fit: 25, fitReason: 'Nightspade = Mobile/casual games in Indonesia. No clear narrative RPG.' },
];

async function updateStudios() {
  console.log('=== Studio Scoring Update ===');
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`Studios to process: ${scorableStudios.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const studio of scorableStudios) {
    try {
      const docRef = db.collection('leads').doc(studio.id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        console.log(`❌ ${studio.id}: Document not found`);
        errorCount++;
        continue;
      }

      const data = doc.data()!;
      
      await docRef.update({
        fit: studio.fit,
        fitReason: studio.fitReason,
        researchedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`✅ ${data.name}: fit=${studio.fit}`);
      successCount++;
    } catch (err) {
      console.log(`❌ ${studio.id}: Error - ${err}`);
      errorCount++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Success: ${successCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total: ${scorableStudios.length}`);
}

updateStudios().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
