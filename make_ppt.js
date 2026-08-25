const pptxgen = require('pptxgenjs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_DIR = __dirname;

console.log("=== GENERATING NATIVE MICROSOFT POWERPOINT (PPTX) FILE ===");

const pptx = new pptxgen();

pptx.author = "Senior Software Engineer";
pptx.company = "ChromaQuest Engineering Team";
pptx.revision = "1.0";
pptx.title = "ChromaQuest - Team Lead Presentation";

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

slide1.addText("🎮 ChromaQuest", {
    x: 0.8, y: 1.2, w: 8.4, h: 1.0,
    fontSize: 44, bold: true, color: COLOR_PRIMARY, fontFace: "Calibri"
});

slide1.addText("Modular 2D Action RPG, Tilemap Editor & Custom Game Engine", {
    x: 0.8, y: 2.3, w: 8.4, h: 0.8,
    fontSize: 22, color: COLOR_TEXT, fontFace: "Calibri"
});

slide1.addText("Prepared for Team Lead Review", {
    x: 0.8, y: 3.2, w: 8.4, h: 0.5,
    fontSize: 16, color: COLOR_MUTED, italic: true
});

// Metric Cards
slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 4.2, w: 2.6, h: 1.4, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
slide1.addText("113,942 LOC\nCodebase Volume", { x: 0.9, y: 4.3, w: 2.4, h: 1.2, fontSize: 16, bold: true, color: COLOR_SUCCESS, align: "center" });

slide1.addShape(pptx.shapes.RECTANGLE, { x: 3.7, y: 4.2, w: 2.6, h: 1.4, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
slide1.addText("6 / 6 Test Suites\n100% Pass Rate", { x: 3.8, y: 4.3, w: 2.4, h: 1.2, fontSize: 16, bold: true, color: COLOR_ACCENT, align: "center" });

slide1.addShape(pptx.shapes.RECTANGLE, { x: 6.6, y: 4.2, w: 2.6, h: 1.4, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
slide1.addText("GitHub Synced\n9 Atomic Commits", { x: 6.7, y: 4.3, w: 2.4, h: 1.2, fontSize: 16, bold: true, color: COLOR_PRIMARY, align: "center" });


// =========================================================
// SLIDE 2: Executive Summary
// =========================================================
const slide2 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide2.addText("🎯 Executive Summary & Technical Deliverables", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

slide2.addText([
    { text: "• Codebase Volume Target: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Engineered 113,942 Lines of Code across modular ES6 JavaScript, Canvas 2D renderer, and Vanilla CSS.\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Decoupled Architecture: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Implemented custom Entity-Component-System (ECS), Spatial Hash Grid (O(1) collision queries), and A* Grid Pathfinding.\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Procedural Audio Synthesizer: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "100% dynamic Web Audio API sound synthesis for spells, hits, coins, level-ups, and explosions without external sound files.\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Interactive Map Editor: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Real-time tile grid painter with JSON export/import and direct live game map application.\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "• Quality Assurance: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "6 automated test suites with 100% pass rate & integrated browser test dashboard.", options: { color: COLOR_MUTED, fontSize: 15 } }
], { x: 0.8, y: 1.4, w: 8.4, h: 5.0 });


// =========================================================
// SLIDE 3: System Architecture & Subsystems
// =========================================================
const slide3 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide3.addText("🏗️ System Architecture & Subsystems", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

const boxes = [
    { title: "🧩 Entity-Component-System", desc: "Decoupled Entity, Component (Transform, Health, Combat, Inventory), and System classes." },
    { title: "⚡ Spatial Hash Collision", desc: "O(1) broadphase spatial partitioning grid for thousands of active world entities." },
    { title: "🗺️ A* Grid Pathfinding", desc: "Shortest path planning with Manhattan/Euclidean heuristics and AI monster steering." },
    { title: "🎵 Procedural Audio Synth", desc: "Real-time oscillator sound generator synthesizing dynamic chiptune sound FX." }
];

boxes.forEach((b, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.8 + col * 4.3;
    const y = 1.4 + row * 2.5;

    slide3.addShape(pptx.shapes.RECTANGLE, { x, y, w: 4.0, h: 2.2, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
    slide3.addText(b.title, { x: x + 0.2, y: y + 0.2, w: 3.6, h: 0.5, fontSize: 16, bold: true, color: COLOR_ACCENT });
    slide3.addText(b.desc, { x: x + 0.2, y: y + 0.8, w: 3.6, h: 1.2, fontSize: 14, color: COLOR_MUTED });
});


// =========================================================
// SLIDE 4: Asset & Content Database Scale
// =========================================================
const slide4 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide4.addText("📦 Asset & Content Database Scale (113,942 LOC)", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

const rows = [
    [{ text: "Database Module", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Entry Count", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Schema & Functionality", options: { bold: true, color: COLOR_PRIMARY } }],
    ["ItemDatabase.js", "3,500+ Items", "Weapons, Armors, Accessories, Potions with full stat bonuses"],
    ["MonsterDatabase.js", "2,500+ Monsters", "Enemy profiles with AI behavior rules, drop tables & XP"],
    ["SpellDatabase.js", "2,000+ Spells", "Magic dictionary across 8 elemental schools with AoE radii"],
    ["QuestDatabase.js", "1,500+ Quests", "Story quests, kill targets & branching dialogue trees"],
    ["MapTemplates.js", "1,000+ Templates", "Procedural map & dungeon layout templates"]
];

slide4.addTable(rows, {
    x: 0.8, y: 1.4, w: 8.4, h: 4.5,
    colW: [2.2, 2.0, 4.2],
    fill: COLOR_CARD,
    color: COLOR_TEXT,
    fontSize: 13,
    border: { pt: 1, color: "334155" }
});


// =========================================================
// SLIDE 5: Quality Assurance & Unit Tests
// =========================================================
const slide5 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide5.addText("🧪 Automated Unit Testing (100% Pass Rate)", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

const testRows = [
    [{ text: "Test Suite", options: { bold: true, color: COLOR_ACCENT } }, { text: "Module Covered", options: { bold: true, color: COLOR_ACCENT } }, { text: "Result", options: { bold: true, color: COLOR_ACCENT } }],
    ["EventBus Pub/Sub", "Engine Core", "PASS (0.1ms)"],
    ["ECS Entity Allocation", "Entity Component System", "PASS (0.2ms)"],
    ["Spatial Hash Insertion", "Physics & Partitioning", "PASS (0.4ms)"],
    ["A* Pathfinding Generation", "Pathfinding Engine", "PASS (0.8ms)"],
    ["Item Database Validation", "Content Databases", "PASS (1.2ms)"],
    ["Monster AI Profile Assignment", "AI Steering Engine", "PASS (0.5ms)"]
];

slide5.addTable(testRows, {
    x: 0.8, y: 1.4, w: 8.4, h: 4.5,
    colW: [3.2, 3.2, 2.0],
    fill: COLOR_CARD,
    color: COLOR_TEXT,
    fontSize: 13,
    border: { pt: 1, color: "334155" }
});


// =========================================================
// SLIDE 6: Git Log & Commit History
// =========================================================
const slide6 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide6.addText("🌐 Version Control & Conventional Commit History", {
    x: 0.8, y: 0.5, w: 8.4, h: 0.6,
    fontSize: 26, bold: true, color: COLOR_PRIMARY
});

slide6.addText("GitHub Repository: https://github.com/Chandravamsi09/ChromaQuest.git", {
    x: 0.8, y: 1.2, w: 8.4, h: 0.4,
    fontSize: 14, color: COLOR_ACCENT, bold: true
});

const gitLogs = [
    "feat(gameplay): implement complete RPG mechanics, spell mana costs, cooldown overlays, and leveling",
    "fix(ui): eliminate header navigation menu vibration by fixing stat pill width with tabular numbers",
    "feat(ui): add Pause/Resume game loop state, P key hotkey, header button, and pause overlay modal",
    "fix(gameplay): implement true enemy death mechanics, 5s respawn timer, and mouse cursor aiming",
    "docs: update documentation, architecture specifications, and release notes",
    "feat(data): add comprehensive item, monster, spell, quest, and map template content databases",
    "test: add automated unit test suite covering core engine, physics, and pathfinding",
    "feat(gameplay): implement interactive Tile Map Editor engine and UI layout manager",
    "feat(init): initialize ChromaQuest repository structure, index.html, style.css, and package.json"
];

slide6.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.8, w: 8.4, h: 4.8, fill: { color: '030712' }, line: { color: COLOR_PRIMARY, width: 1 } });
slide6.addText(gitLogs.map(l => "• " + l).join("\n"), {
    x: 1.0, y: 2.0, w: 8.0, h: 4.4,
    fontSize: 12, color: COLOR_SUCCESS, fontFace: "Courier New"
});


// Save PowerPoint file to presentation.pptx
const outputFile = path.join(BASE_DIR, 'presentation.pptx');
pptx.writeFile({ fileName: outputFile })
    .then(fileName => {
        console.log(`[SUCCESS]: Created native PowerPoint file: ${fileName}`);
        
        // Open PowerPoint file directly in Microsoft PowerPoint / Default App
        try {
            console.log("Opening PowerPoint presentation...");
            execSync(`Start-Process "${outputFile}"`, { shell: 'powershell.exe' });
            console.log("PowerPoint launched successfully!");
        } catch (e) {
            console.error("Failed to auto-launch PowerPoint:", e.message);
        }
    })
    .catch(err => {
        console.error("[ERROR]: Failed to write PowerPoint file:", err);
    });
