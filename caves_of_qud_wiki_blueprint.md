# Caves of Qud Wiki — Full Project Blueprint

## Project Goal
Create a highly searchable, atmospheric, SEO-friendly wiki for Caves of Qud that follows the same successful structure as the Project Zomboid wiki project while adapting the visual identity, navigation structure, lore depth, and gameplay systems to fit Caves of Qud.

The website should feel:
- Ancient
- Mysterious
- Retro-futuristic
- Terminal-like
- Dense with knowledge
- Weird science + fantasy
- Procedurally generated but still readable

The wiki should be designed for:
- SEO traffic
- Long session duration
- Easy future expansion
- AI-assisted article generation
- Ad placement without ruining readability
- Fast static-site deployment
- Modular page generation from data.js style content

---

# CORE DESIGN DIRECTION

## Visual Identity
Caves of Qud has a very unique atmosphere.

The website should feel like:
- Ancient computer terminal archives
- Rusted sci-fi civilization
- Desert ruins + glowing technology
- Old CRT monitor mixed with illuminated relics
- Retro roguelike UI

Avoid:
- Modern glossy gaming aesthetics
- Bright esports styling
- Overly clean minimalism
- Generic fantasy visuals

The UI should look:
- Dense but readable
- Mechanical
- Grid-based
- Information-heavy
- Slightly mysterious

---

# COLOR PALETTE

## Primary Colors

Background:
- #08110f
- #0d1512
- #101816

Panels:
- #15211d
- #1a2924

Borders:
- #3e6b58
- #5a9c80

Primary Text:
- #d8f5df

Secondary Text:
- #9db8a7

Accent Colors:
- Cyan: #5ef2d6
- Amber: #f7c66b
- Mutation Purple: #b56dff
- Rust Red: #c56b52
- Tech Blue: #6dc8ff

Danger:
- #ff6767

Success:
- #79ff9d

---

# FONT SYSTEM

## Recommended Fonts

### Headers
Use:
- Orbitron
OR
- Oxanium
OR
- Rajdhani

These provide:
- Sci-fi terminal feeling
- Angular readability
- Ancient machine aesthetic

### Body Font
Use:
- Inter
OR
- IBM Plex Sans
OR
- Source Sans 3

### Monospace Sections
Use:
- JetBrains Mono
OR
- IBM Plex Mono

Use monospace for:
- Stats
- Mutation tables
- Build code blocks
- Console-style callouts
- Procedural generation notes

---

# GLOBAL SITE STRUCTURE

## Homepage
URL:
/

Purpose:
- Main entry point
- Explain the game quickly
- Funnel users into major systems
- Showcase latest updates
- Improve SEO

Sections:
1. Hero section
2. Search bar
3. Quick category grid
4. Beginner guides
5. Featured builds
6. Factions section
7. Mutations section
8. Latest updates
9. Popular pages
10. Footer links

Hero text example:
"Live and drink, traveler. Explore the ancient salt deserts, cybernetic ruins, mutations, factions, relics, and impossible civilizations of Qud."

CTA Buttons:
- Beginner Guide
- Mutations
- Character Builds
- Factions
- Maps
- Lore

Homepage cards should glow subtly on hover.

---

# GLOBAL NAVIGATION

Top Navbar:
- Home
- Beginner Guide
- Mutations
- Builds
- Skills
- Cybernetics
- Factions
- Maps
- Lore
- Items
- Creatures
- Mods

Right-side controls:
- Search icon
- Theme toggle
- Mobile menu

Sticky navbar on scroll.

---

# PAGE TEMPLATE SYSTEM

All pages should use reusable templates.

Every article page should include:

1. Hero banner
2. Breadcrumbs
3. Quick stats panel
4. Main article content
5. Sidebar navigation
6. Related articles
7. Ad placements
8. Internal links
9. FAQ section
10. Last updated section

---

# SIDEBAR DESIGN

Sidebar should contain:
- Related pages
- Popular guides
- Ad slot
- Recently updated pages
- Quick navigation anchors

Desktop:
- Fixed/sticky sidebar

Mobile:
- Collapsible drawer

---

# HOMEPAGE CATEGORY GRID

## Main Categories

### Beginner Guides
Contents:
- Starting builds
- Early survival
- Water economy
- Reputation basics
- Combat basics
- Exploration tips
- Beginner mistakes

### Mutations
Contents:
- Physical mutations
- Mental mutations
- Mutation builds
- Mutation tier lists
- Synergy combinations
- Mutation leveling

### Cybernetics
Contents:
- Implant slots
- Best cybernetics
- Installation guide
- Tinker builds
- Rare implants

### Skills
Contents:
- Skill trees
- Skill builds
- Combat skills
- Utility skills
- Merchant builds

### Factions
Contents:
- Reputation system
- Faction locations
- Faction enemies
- Alliance guide
- Water ritual guide

### Creatures
Contents:
- Monster database
- Threat levels
- Loot tables
- Weaknesses
- Biomes

### Items
Contents:
- Weapons
- Armor
- Artifacts
- Relics
- Food
- Injectors
- Grenades
- Trade goods

### Maps
Contents:
- World map
- Region guides
- Historic sites
- Villages
- Ruins
- Dungeon maps

### Lore
Contents:
- History of Qud
- Sultan history
- Ancient civilizations
- Important NPCs
- Religious groups

### Builds
Contents:
- Esper builds
- Chimera builds
- Gunslinger builds
- True Kin builds
- Melee builds
- Tinker builds
- Roleplay builds

---

# ESSENTIAL PAGES

## 1. Beginner Guide
URL:
/beginner-guide/

Sections:
- Choosing caste/calling
- Mutation selection
- True Kin vs Mutant
- First village route
- Water management
- Inventory management
- Combat basics
- Avoiding early deaths
- Merchant tips
- Reputation basics
- Recommended starting zones

Add:
- Beginner FAQ
- “Things the game never tells you” section

---

## 2. Mutations Hub
URL:
/mutations/

Subpages:
- Physical mutations
- Mental mutations
- Best mutations
- Mutation combos
- Mutation tier list
- Mutation leveling guide

Each mutation page should include:
- Description
- Effects
- Scaling
- Best builds
- Synergies
- Weaknesses
- Visual examples

Important mutation pages:
- Multiple Arms
- Wings
- Clairvoyance
- Teleportation
- Temporal Fugue
- Light Manipulation
- Pyrokinesis
- Regeneration

---

## 3. Character Builds
URL:
/builds/

Subcategories:
- Beginner builds
- OP builds
- Lore builds
- Permadeath builds
- Speedrun builds
- Merchant builds
- Gunslinger builds
- Esper builds
- Hybrid builds

Each build page should include:
- Starting setup
- Mutation selection
- Attribute distribution
- Skill progression
- Equipment priorities
- Midgame strategy
- Endgame strategy
- Weaknesses

---

## 4. Skills Hub
URL:
/skills/

Sections:
- Skill trees
- Skill progression
- Best skills
- Merchanting
- Acrobatics
- Long blades
- Rifles
- Pistols
- Tinkering
- Persuasion

Each skill page:
- Costs
- Requirements
- Best builds
- Synergies
- Progression path

---

## 5. Cybernetics Hub
URL:
/cybernetics/

Sections:
- Implant slots
- Best implants
- Implant farming
- Cybernetic economy
- True Kin guide
- Implant tier list

Important pages:
- Precision force lathe
- Night vision
- Motorized treads
- Giant hands
- High-fidelity matter recompositor

---

## 6. Factions Hub
URL:
/factions/

Sections:
- Reputation system
- Water rituals
- Faction alliances
- Faction hostility
- Faction farming

Important faction pages:
- Mechanimists
- Barathrumites
- Putus Templar
- Goatfolk
- Fellowship of Wardens
- Consortium of Phyta

Each faction page:
- Overview
- Lore
- Locations
- Reputation gains/losses
- Important NPCs
- Quests
- Rewards

---

## 7. Maps & Regions
URL:
/maps/

Sections:
- Interactive world map
- Regional guides
- Historic sites
- Dungeon layouts
- Village generation
- Ruins

Important region pages:
- Joppa
- Six Day Stilt
- Golgotha
- Bethesda Susa
- Jungle
- Salt Marshes
- Rainbow Wood

Each map page should include:
- Recommended level
- Threats
- Loot
- Vendors
- Secrets
- Environmental hazards

---

## 8. Items Database
URL:
/items/

Subcategories:
- Weapons
- Armor
- Artifacts
- Food
- Injectors
- Tonics
- Grenades
- Relics

Each item page:
- Stats
- Weight
- Uses
- Value
- Locations
- Best builds
- Crafting info

---

## 9. Creature Database
URL:
/creatures/

Each creature page:
- Threat level
- Biome
- Resistances
- Weaknesses
- Loot
- Reputation interactions
- Special attacks

Important creatures:
- Chrome pyramids
- Slumberlings
- Girshlings
- Goatfolk
- Snapjaws
- Dawngliders
- Madpoles

---

## 10. Lore Hub
URL:
/lore/

Sections:
- Sultan history
- Ancient Earth
- Qud timeline
- Religious groups
- Legendary figures
- Ruins and civilizations

Tone:
- Atmospheric
- Mysterious
- Scholarly

Should feel like archived historical records.

---

## 11. Mods Hub
URL:
/mods/

Sections:
- Best mods
- UI mods
- QoL mods
- Content mods
- Build compatibility
- Installation guide

Each mod page:
- Features
- Compatibility
- Screenshots
- Install instructions
- Performance notes

---

# SEARCH SYSTEM

Search should support:
- Instant results
- Typo tolerance
- Tags
- Category filtering
- Keyboard navigation

Search placeholder:
“Search mutations, relics, factions, regions…”

---

# SEO STRATEGY

## Important SEO Pages

High traffic opportunities:
- Best mutations
- Best builds
- Beginner guide
- True Kin guide
- Esper build
- Best cybernetics
- Reputation guide
- Golgotha guide
- Best weapons
- Best starting builds

Each page should include:
- FAQ section
- Internal linking
- Table of contents
- Structured headings
- Meta descriptions

---

# CONTENT STYLE GUIDE

Tone should be:
- Knowledgeable
- Atmospheric
- Slightly cryptic
- Helpful without being overly casual

Avoid:
- Meme-heavy writing
- Modern internet slang
- Overly corporate language

Good style example:
“Golgotha is among the first true tests of survival in Qud. Its rusted conveyors, disease-ridden sludge, and lethal verticality punish unprepared explorers.”

---

# IMAGE STYLE

Use:
- Pixel-art screenshots
- Dark atmospheric banners
- Terminal UI mockups
- Desert landscapes
- Ruined machinery
- Mutation visual showcases

Avoid:
- Overprocessed thumbnails
- Bright YouTube-style graphics

---

# ADS & MONETIZATION

## Ad Placements

Homepage:
- Banner after hero
- Sidebar ads
- In-content ads after sections

Article pages:
- One banner near top
- Rectangle in sidebar
- In-content ad every few sections

Ads should blend naturally.

Use muted borders and low-contrast containers.

---

# RESPONSIVE DESIGN

Desktop:
- Wide knowledge-base feel
- Left content + right sidebar

Tablet:
- Collapsed sidebar
- Reduced grids

Mobile:
- Single-column layout
- Sticky bottom navigation optional
- Search-first UX

---

# SPECIAL FEATURES

## Mutation Calculator
Interactive planner:
- Pick mutations
- Calculate build synergies
- Save builds

## Reputation Tracker
Allow users to:
- Track faction standings
- See enemy relationships

## Build Generator
Randomized challenge build generator.

## Daily Qud Fact
Rotating homepage lore/mutation/item trivia.

---

# INTERNAL LINKING STRATEGY

Every article should link to:
- Related builds
- Related mutations
- Related regions
- Related factions
- Related items

This is extremely important for:
- SEO
- Session duration
- Crawl depth

---

# CONTENT PRIORITY ROADMAP

## PHASE 1 — CORE TRAFFIC PAGES
Build first:
1. Homepage
2. Beginner guide
3. Best mutations
4. Best builds
5. Skills hub
6. Factions hub
7. Maps hub
8. True Kin guide
9. Esper guide
10. Cybernetics hub

---

## PHASE 2 — DATABASE EXPANSION
Add:
- Item database
- Creature database
- Mutation database
- Skill database
- Quest pages

---

## PHASE 3 — ADVANCED SYSTEMS
Add:
- Build calculator
- Reputation planner
- Interactive maps
- Procedural seed tools
- Build sharing

---

# FILE/FOLDER STRUCTURE

Suggested structure:

/assets
/css
/js
/data
/images
/icons

/beginner-guide
/builds
/mutations
/skills
/factions
/cybernetics
/items
/creatures
/maps
/lore
/mods
/guides

Each category:
- index.html
- subpages
- category metadata

---

# CONTENT GENERATION FORMAT

Recommended article structure:

1. Introduction
2. Overview
3. Stats/Data
4. Strategy
5. Synergies
6. Weaknesses
7. Locations
8. Advanced Tips
9. FAQ
10. Related Pages

This keeps articles:
- Consistent
- Searchable
- Easy to template
- AI-generatable

---

# HERO SECTION IDEAS

Animated backgrounds:
- CRT scanlines
- Floating dust particles
- Slow-moving desert fog
- Ancient terminal effects
- Flickering machine lights

Potential homepage tagline:

“Live and drink beneath the chrome arches of forgotten worlds.”

Alternative:

“The archive of Qud — mutations, relics, factions, ruins, and impossible civilizations.”

---

# SIDEBAR WIDGET IDEAS

Widgets:
- Mutation of the day
- Build spotlight
- Popular factions
- Recent updates
- Beginner shortcuts
- Random creature
- Daily lore entry

---

# RECOMMENDED UI FEEL

The overall feeling should resemble:
- Ancient digital archive
- Rogue terminal
- Sci-fi codex
- Forgotten machine database

Not:
- Generic gaming wiki
- Corporate documentation
- Bright fandom clone

The website should feel handcrafted and immersive.

---

# FINAL GOAL

The end result should feel like:
- The definitive searchable knowledge archive for Caves of Qud
- A blend of:
  - roguelike database
  - lore archive
  - build planner
  - survival guide
  - retro-futuristic encyclopedia

It should support:
- Long-form SEO traffic
- Returning users
- Community expansion
- AI-assisted article generation
- Static hosting scalability
- Ad monetization
- Future interactive tools

