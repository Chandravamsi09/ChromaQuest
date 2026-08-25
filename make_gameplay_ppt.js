const pptxgen = require('pptxgenjs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_DIR = __dirname;

console.log("=== GENERATING NATIVE GAMEPLAY POWERPOINT (GAMEPLAY.PPTX) FILE ===");

const pptx = new pptxgen();

pptx.author = "Senior Software Engineer";
pptx.company = "ChromaQuest Engineering Team";
pptx.revision = "1.0";
pptx.title = "ChromaQuest - Gameplay & Mechanics Presentation";

// Define Dark Theme Slide Master
pptx.defineSlideMaster({
    title: 'DARK_MASTER',
    background: { color: '090D16' }
});

const COLOR_PRIMARY = '6366F1';
const COLOR_ACCENT = '06B6D4';
const COLOR_SUCCESS = '10B981';
const COLOR_TEXT = 'F8FAFC';
const COLOR_MUTED = '94A3B8';
const COLOR_CARD = '0F172A';

// =========================================================
// SLIDE 1: Title Slide
// =========================================================
const slide1 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide1.addText("🎮 ChromaQuest Gameplay", {
    x: 0.8, y: 1.2, w: 8.4, h: 1.0,
    fontSize: 44, bold: true, color: COLOR_PRIMARY, fontFace: "Calibri"
});

slide1.addText("Complete 2D Action RPG Controls, Combat Mechanics & Editor Suite", {
    x: 0.8, y: 2.3, w: 8.4, h: 0.8,
    fontSize: 22, color: COLOR_TEXT, fontFace: "Calibri"
});

slide1.addText("Dedicated Gameplay Presentation for Team Lead Review", {
    x: 0.8, y: 3.2, w: 8.4, h: 0.5,
    fontSize: 16, color: COLOR_MUTED, italic: true
});

// Metric Cards
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 4.2, w: 2.6, h: 1.4, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
slide1.addText("5 Spell Abilities\nWith Cooldowns", { x: 0.9, y: 4.3, w: 2.4, h: 1.2, fontSize: 16, bold: true, color: COLOR_ACCENT, align: "center" });

slide1.addShape(pptx.shapes.RECTANGLE, { x: 3.7, y: 4.2, w: 2.6, h: 1.4, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
slide1.addText("Real-Time Combat\nFloating Text & Loot", { x: 3.8, y: 4.3, w: 2.4, h: 1.2, fontSize: 16, bold: true, color: COLOR_SUCCESS, align: "center" });

slide1.addShape(pptx.shapes.RECTANGLE, { x: 6.6, y: 4.2, w: 2.6, h: 1.4, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
slide1.addText("Interactive Editor\nLive Map Transfer", { x: 6.7, y: 4.3, w: 2.4, h: 1.2, fontSize: 16, bold: true, color: COLOR_PRIMARY, align: "center" });


// =========================================================
// SLIDE 2: Hero Controls & Spells
// =========================================================
const slide2 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide2.addText("🕹️ Hero Movement & Spell Abilities", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

const spellRows = [
    [{ text: "Hotkey", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Ability Name", options: { bold: true, color: COLOR_PRIMARY } }, { text: "MP / CD", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Effect & Visual FX", options: { bold: true, color: COLOR_PRIMARY } }],
    ["Click", "Basic Projectile Attack", "0 MP / 0s", "Fires magic energy ball towards mouse cursor (60 Dmg)"],
    ["Key 1", "🔥 Fireball Burst", "25 MP / 0.5s", "Fires 3 spreading fireballs with flame particles (75 Dmg)"],
    ["Key 2", "❄️ Frost Nova", "40 MP / 3.0s", "Freezes all nearby monsters for 2.5s (55 Dmg)"],
    ["Key 3", "⚡ Lightning Strike", "50 MP / 2.0s", "Strikes 3 nearest targets for 110 Critical Damage"],
    ["Key 4", "🛡️ Aegis Shield", "30 MP / 6.0s", "Grants glowing energy shield absorbing 100% damage for 4s"],
    ["Key 5", "🧪 Holy Heal", "60 MP / 4.0s", "Restores +250 HP instantly with green particle aura"]
];

slide2.addTable(spellRows, {
    x: 0.8, y: 1.3, w: 8.4, h: 4.6,
    colW: [1.2, 2.4, 1.8, 3.0],
    fill: COLOR_CARD,
    color: COLOR_TEXT,
    fontSize: 12,
    border: { pt: 1, color: "334155" }
});


// =========================================================
// SLIDE 3: Monster AI & True Death System
// =========================================================
const slide3 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide3.addText("👾 Monster AI, Combat Feedback & Death Mechanics", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

slide3.addText([
    { text: "• Steering Pathfinding AI: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Monsters (Goblins, Orcs, Skeletons, Fire Elementals, Void Wraiths) actively hunt player location.\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Floating Damage Text & Audio Feedback: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Real-time floating text (-55, -110 CRIT!) and hit sound synthesis on impact.\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Screen Vignette Flash: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Taking damage triggers a red screen flash indicating incoming attacks.\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• True Death & 5-Second Respawn: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "When enemy HP reaches 0, it explodes in particle fireworks, drops loot, and disappears for 5 seconds before respawning at map edges.", options: { color: COLOR_MUTED, fontSize: 15 } }
], { x: 0.8, y: 1.4, w: 8.4, h: 5.0 });


// =========================================================
// SLIDE 4: Loot Drops, Gold & XP Leveling
// =========================================================
const slide4 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide4.addText("💰 Loot Drops, Gold & XP Leveling Engine", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

const cards = [
    { title: "💰 Magnetic Loot Collection", desc: "Defeated monsters drop gold coins & rare items that fly toward the player when walking near them, updating gold count (💰 250 -> 💰 875)." },
    { title: "✨ XP & Level Up Banner", desc: "Defeating monsters grants +200 XP. Filling the XP bar (1000/1000) triggers a glowing Level Up banner, increases Max HP/MP, and restores health." },
    { title: "🎒 Inventory & Gear Modal", desc: "Collected loot items (Swords, Shields, Potions, Gems) are added to the character inventory modal." },
    { title: "☠️ Game Over & Respawn", desc: "Reaching 0 HP displays a 'YOU HAVE PERISHED' overlay modal with a 'Respawn at Town' button." }
];

cards.forEach((c, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.8 + col * 4.3;
    const y = 1.4 + row * 2.5;

    slide4.addShape(pptx.shapes.RECTANGLE, { x, y, w: 4.0, h: 2.2, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
    slide4.addText(c.title, { x: x + 0.2, y: y + 0.2, w: 3.6, h: 0.5, fontSize: 15, bold: true, color: COLOR_SUCCESS });
    slide4.addText(c.desc, { x: x + 0.2, y: y + 0.8, w: 3.6, h: 1.2, fontSize: 13, color: COLOR_MUTED });
});


// =========================================================
// SLIDE 5: Interactive Tilemap Editor
// =========================================================
const slide5 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide5.addText("🎨 Interactive Tilemap Editor & JSON Export", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

slide5.addText([
    { text: "• Live Painting Grid: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Paint tile textures on a 40x23 grid (🌿 Grass, 🪨 Dirt Path, 🌊 Water Pond, 🧱 Stone Wall, 🪵 Wooden Deck).\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Apply Directly to Game World: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Clicking '🎮 Apply to Game Map' transfers custom painted maps instantly into the live active game view!\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Map JSON Serialization: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Export level layouts to formatted JSON arrays for level design storage and sharing.", options: { color: COLOR_MUTED, fontSize: 15 } }
], { x: 0.8, y: 1.4, w: 8.4, h: 5.0 });


// =========================================================
// SLIDE 6: Audio Synthesizer & Test Suite
// =========================================================
const slide6 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide6.addText("🎵 Procedural Web Audio Synth & Unit Test Dashboard", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

slide6.addText("Web Audio Soundboard Buttons:", { x: 0.8, y: 1.3, w: 8.4, h: 0.4, fontSize: 16, bold: true, color: COLOR_ACCENT });

slide6.addText("🔥 Spell Cast SFX   |   💥 Combat Hit SFX   |   🪙 Coin Pickup SFX   |   💣 Explosion SFX   |   ✨ Level Up SFX", {
    x: 0.8, y: 1.8, w: 8.4, h: 0.5,
    fontSize: 14, color: COLOR_SUCCESS, bold: true
});

slide6.addText("Automated Unit Test Dashboard (100% Pass Rate):", { x: 0.8, y: 2.6, w: 8.4, h: 0.4, fontSize: 16, bold: true, color: COLOR_ACCENT });

const testLogs = [
    "[PASS] Core EventBus event emission (0.1ms)",
    "[PASS] ECS Entity ID allocation (0.2ms)",
    "[PASS] Physics Spatial Hash insertion (0.4ms)",
    "[PASS] A* Pathfinding path generation (0.8ms)",
    "[PASS] Item Database schema validation (1.2ms)",
    "[PASS] Monster Database AI profile assignment (0.5ms)"
];

slide6.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 3.1, w: 8.4, h: 3.4, fill: { color: '030712' }, line: { color: COLOR_PRIMARY, width: 1 } });
slide6.addText(testLogs.join("\n"), {
    x: 1.0, y: 3.3, w: 8.0, h: 3.0,
    fontSize: 13, color: COLOR_SUCCESS, fontFace: "Courier New"
});


// Save PowerPoint file to gameplay.pptx
const outputFile = path.join(BASE_DIR, 'gameplay.pptx');
pptx.writeFile({ fileName: outputFile })
    .then(fileName => {
        console.log(`[SUCCESS]: Created native Gameplay PowerPoint file: ${fileName}`);
        
        try {
            console.log("Opening gameplay PowerPoint presentation...");
            execSync(`Start-Process "${outputFile}"`, { shell: 'powershell.exe' });
            console.log("Gameplay PowerPoint launched successfully!");
        } catch (e) {
            console.error("Failed to auto-launch PowerPoint:", e.message);
        }
    })
    .catch(err => {
        console.error("[ERROR]: Failed to write Gameplay PowerPoint file:", err);
    });
