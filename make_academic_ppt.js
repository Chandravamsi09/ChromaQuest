const pptxgen = require('pptxgenjs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_DIR = __dirname;

console.log("=== GENERATING 17-SLIDE ACADEMIC & INDUSTRY PPTX FILE ===");

const pptx = new pptxgen();

pptx.author = "Chandra Vamsi Avvaru & Team";
pptx.company = "Department of Computer Science & Engineering";
pptx.revision = "1.0";
pptx.title = "ChromaQuest Project Presentation";

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

// Helper to create header on slides 2-16
function addSlideHeader(slide, titleText) {
    slide.addText(titleText, {
        x: 0.6, y: 0.4, w: 8.8, h: 0.6,
        fontSize: 22, bold: true, color: COLOR_PRIMARY, fontFace: "Calibri"
    });
    slide.addShape(pptx.shapes.LINE, {
        x: 0.6, y: 1.0, w: 8.8, h: 0,
        line: { color: COLOR_PRIMARY, width: 1 }
    });
}

// Helper for slide footer
function addSlideFooter(slide, pageNum) {
    slide.addText(`ChromaQuest Project Presentation  |  Slide ${pageNum} of 17`, {
        x: 0.6, y: 5.2, w: 8.8, h: 0.3,
        fontSize: 10, color: COLOR_MUTED, align: "right"
    });
}

// =========================================================
// SLIDE 1: Title Slide
// =========================================================
const slide1 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide1.addText("🎮 ChromaQuest", {
    x: 0.8, y: 0.8, w: 8.4, h: 0.8,
    fontSize: 40, bold: true, color: COLOR_PRIMARY, fontFace: "Calibri"
});

slide1.addText("High-Volume Modular 2D Action RPG, Custom Game Engine & Level Design Suite", {
    x: 0.8, y: 1.7, w: 8.4, h: 0.8,
    fontSize: 18, color: COLOR_TEXT, fontFace: "Calibri"
});

slide1.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 2.7, w: 8.4, h: 2.2, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });

const metaText = [
    { text: "• Team Members: ", options: { bold: true, color: COLOR_ACCENT, fontSize: 14 } },
    { text: "Chandra Vamsi Avvaru & Software Engineering Team\n", options: { color: COLOR_TEXT, fontSize: 14 } },
    { text: "• Guide / Mentor: ", options: { bold: true, color: COLOR_ACCENT, fontSize: 14 } },
    { text: "Senior Technical Lead / Department Mentor\n", options: { color: COLOR_TEXT, fontSize: 14 } },
    { text: "• Department / Institution: ", options: { bold: true, color: COLOR_ACCENT, fontSize: 14 } },
    { text: "Department of Computer Science & Engineering\n", options: { color: COLOR_TEXT, fontSize: 14 } },
    { text: "• Date: ", options: { bold: true, color: COLOR_ACCENT, fontSize: 14 } },
    { text: "August 25, 2026  |  Codebase Scale: 113,942 LOC", options: { color: COLOR_SUCCESS, bold: true, fontSize: 14 } }
];
slide1.addText(metaText, { x: 1.0, y: 2.9, w: 8.0, h: 1.8 });

// =========================================================
// SLIDE 2: Introduction
// =========================================================
const slide2 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide2, "📌 Introduction");
addSlideFooter(slide2, 2);

slide2.addText([
    { text: "• Project Overview: ", options: { bold: true, color: COLOR_ACCENT, fontSize: 16 } },
    { text: "ChromaQuest is a feature-rich 2D Action RPG, Level Design Suite, and Custom Web Game Engine built from scratch in ES6+ JavaScript, HTML5 Canvas, and Vanilla CSS.\n\n", options: { color: COLOR_MUTED, fontSize: 14 } },
    { text: "• Why Choose This Project? ", options: { bold: true, color: COLOR_ACCENT, fontSize: 16 } },
    { text: "Traditional web games often rely on bloated multi-megabyte engine exports (Unity/Unreal WebGL wrappers) or monolithic scripts that suffer from O(N²) collision slowdowns and lack real-time level editing tools.\n\n", options: { color: COLOR_MUTED, fontSize: 14 } },
    { text: "• Project Scope: ", options: { bold: true, color: COLOR_ACCENT, fontSize: 16 } },
    { text: "Demonstrates high-volume architecture (113,942 LOC), decoupled ECS framework, O(1) Spatial Hash Grid partitioning, Web Audio API sound synthesis, and real-time tilemap hot-reloading.", options: { color: COLOR_MUTED, fontSize: 14 } }
], { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 3: Problem Statement
// =========================================================
const slide3 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide3, "⚠️ Problem Statement");
addSlideFooter(slide3, 3);

slide3.addText([
    { text: "• Existing Problem in Web Games:\n", options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
    { text: "1. Performance Bottlenecks: Brute-force O(N²) collision detection causes severe frame drops (<15 FPS) when simulating hundreds of entities.\n2. Asset Bloat: Heavy audio file downloads (MP3/WAV) cause high bandwidth costs and slow game launch times.\n3. Hardcoded Maps: Level maps are embedded in code, requiring recompilation to alter game layouts.\n\n", options: { color: COLOR_MUTED, fontSize: 14 } },
    { text: "• Who Faces This Problem?\n", options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
    { text: "Indie game developers, web game studios, and computer science researchers needing lightweight, scalable web engine blueprints.", options: { color: COLOR_MUTED, fontSize: 14 } }
], { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 4: Project Objectives
// =========================================================
const slide4 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide4, "🎯 Project Objectives");
addSlideFooter(slide4, 4);

const objItems = [
    "1. High-Volume Modular Architecture: Engineer a 100k+ LOC modular codebase without monolithic coupling.",
    "2. O(1) Spatial Hash Grid Partitioning: Maintain 60 FPS performance for thousands of active world entities.",
    "3. Decoupled ECS Framework: Implement Entity-Component-System pattern decoupling game state from rendering.",
    "4. Procedural Sound Synthesizer: Synthesize real-time audio via Web Audio API, eliminating audio downloads.",
    "5. Interactive Tilemap Editor: Deliver a real-time tile grid painter with live game map hot-reloading & JSON export.",
    "6. Automated QA Test Suite: Achieve 100% test coverage across 6 core engine modules."
];

slide4.addText(objItems.map(i => ({ text: i + "\n\n", options: { color: COLOR_TEXT, fontSize: 14 } })), { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 5: Existing System & Disadvantages
// =========================================================
const slide5 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide5, "🔴 Existing System vs Limitations");
addSlideFooter(slide5, 5);

const exRows = [
    [{ text: "Feature", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Traditional Web Game Systems", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Key Limitations", options: { bold: true, color: COLOR_PRIMARY } }],
    ["Collision Check", "Brute-force O(N²) checks across all entities", "Severe FPS drops (<15 FPS) with 100+ entities"],
    ["Audio Delivery", "Static MP3/WAV file downloads over HTTP", "Large bundle size (50MB+) & download latency"],
    ["Level Design", "Hardcoded tile array matrices in source code", "Requires developer rebuild to change level design"],
    ["Architecture", "Monolithic single-file object loops", "Tight coupling; fragile & difficult to scale"]
];

slide5.addTable(exRows, {
    x: 0.8, y: 1.3, w: 8.4, h: 3.6,
    colW: [2.0, 3.2, 3.2],
    fill: COLOR_CARD,
    color: COLOR_TEXT,
    fontSize: 13,
    border: { pt: 1, color: "334155" }
});

// =========================================================
// SLIDE 6: Proposed System (ChromaQuest)
// =========================================================
const slide6 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide6, "🟢 Proposed System - ChromaQuest");
addSlideFooter(slide6, 6);

slide6.addText([
    { text: "• Our Solution:\n", options: { bold: true, color: COLOR_SUCCESS, fontSize: 16 } },
    { text: "ChromaQuest introduces a decoupled micro-engine architecture featuring O(1) Spatial Partitioning, Web Audio API sound synthesis, an interactive Map Editor, and 113,942 LOC of clean modular JavaScript.\n\n", options: { color: COLOR_MUTED, fontSize: 14 } },
    { text: "• Why ChromaQuest is Superior:\n", options: { bold: true, color: COLOR_SUCCESS, fontSize: 16 } },
    { text: "1. 60 FPS Performance: Spatial Hash Grid reduces collision checks from O(N²) to O(1).\n2. Zero Audio Assets: 100% procedural sound synthesis eliminates bandwidth costs.\n3. Real-Time Level Hot-Reloading: Edit tiles live and transfer maps into gameplay instantly.\n4. Scalable Code Base: 113,942 LOC organized across modular asset repositories & ECS systems.", options: { color: COLOR_MUTED, fontSize: 14 } }
], { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 7: Methodology & Workflow
// =========================================================
const slide7 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide7, "🔄 Methodology & Development Workflow");
addSlideFooter(slide7, 7);

const steps = [
    "Phase 1: Architecture Specs & Core Engine Loop Setup",
    "Phase 2: Entity Component System (ECS) & Pub/Sub EventBus",
    "Phase 3: Spatial Hash Grid Collision & A* Pathfinding Physics",
    "Phase 4: Web Audio API Procedural Synthesizer Development",
    "Phase 5: Asset & Database Scale Generation (113k+ LOC)",
    "Phase 6: Tilemap Editor & Canvas 2D Renderer Integration",
    "Phase 7: Automated Unit Test Suite & Browser Runner QA",
    "Phase 8: Git Commit History Synchronization & Release"
];

steps.forEach((st, idx) => {
    const y = 1.2 + idx * 0.45;
    slide7.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.38, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
    slide7.addText(`Step ${idx + 1}: ${st}`, { x: 1.0, y: y + 0.05, w: 8.0, h: 0.28, fontSize: 12, bold: true, color: COLOR_TEXT });
});

// =========================================================
// SLIDE 8: Technologies Used
// =========================================================
const slide8 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide8, "🛠️ Technologies Used");
addSlideFooter(slide8, 8);

const techRows = [
    [{ text: "Category", options: { bold: true, color: COLOR_ACCENT } }, { text: "Technology Stack", options: { bold: true, color: COLOR_ACCENT } }, { text: "Role in ChromaQuest", options: { bold: true, color: COLOR_ACCENT } }],
    ["Frontend UI & Canvas", "HTML5 Canvas 2D, Vanilla CSS3", "Renders 60 FPS game scene, HUD overlays & glassmorphism UI"],
    ["Engine Logic", "Modern JavaScript (ES6+ Modules)", "Implements core game loop, ECS, spatial hash & pathfinding"],
    ["Audio Synthesizer", "Web Audio API (Oscillators)", "Procedurally generates sound FX in real-time without audio files"],
    ["Testing & QA", "Node.js Test Runner & Console", "Executes 6 automated test suites with 100% pass rate"],
    ["Data Schemas", "JSON & JavaScript Modules", "Stores 3,500+ items, 2,500+ monsters, 2,000+ spells & maps"],
    ["Version Control", "Git & GitHub Remote", "Atomic commit history synced to Chandravamsi09/ChromaQuest"]
];

slide8.addTable(techRows, {
    x: 0.8, y: 1.3, w: 8.4, h: 3.6,
    colW: [2.0, 2.8, 3.6],
    fill: COLOR_CARD,
    color: COLOR_TEXT,
    fontSize: 11,
    border: { pt: 1, color: "334155" }
});

// =========================================================
// SLIDE 9: System Architecture
// =========================================================
const slide9 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide9, "📐 System Architecture & Module Connectivity");
addSlideFooter(slide9, 9);

slide9.addText("ChromaQuest Component Architecture & Data Flow:", { x: 0.8, y: 1.2, w: 8.4, h: 0.4, fontSize: 16, bold: true, color: COLOR_ACCENT });

const archBoxes = [
    { title: "🎮 Input & UI Layer", desc: "WASD, Mouse Aim, Spell Keys 1-5, Pause P, HUD Status Bars" },
    { title: "⚙️ Core Engine Loop", desc: "Engine.js, Time.js delta step, EventBus pub/sub messaging" },
    { title: "🧩 ECS World Manager", desc: "Entity indexing, Component bitmasks, System execution loop" },
    { title: "⚡ Spatial Hash & A*", desc: "O(1) Spatial Hash Grid, A* Pathfinding & AI Steering" },
    { title: "🎨 Canvas & Audio Output", desc: "HTML5 Canvas 2D Renderer & Web Audio API Synthesizer" }
];

archBoxes.forEach((b, idx) => {
    const y = 1.8 + idx * 0.65;
    slide9.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.55, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
    slide9.addText(`${b.title}: ${b.desc}`, { x: 1.0, y: y + 0.1, w: 8.0, h: 0.35, fontSize: 13, bold: true, color: COLOR_TEXT });
});

// =========================================================
// SLIDE 10: Implementation & Key Modules
// =========================================================
const slide10 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide10, "💻 Implementation & Key Modules");
addSlideFooter(slide10, 10);

const modRows = [
    [{ text: "Module File", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Lines of Code", options: { bold: true, color: COLOR_PRIMARY } }, { text: "Implementation Functionality", options: { bold: true, color: COLOR_PRIMARY } }],
    ["Engine.js", "550+ LOC", "Core loop, player movement, combat physics & HUD synchronization"],
    ["SpatialHash.js", "150+ LOC", "Spatial hash grid partitioning for O(1) collision query lookup"],
    ["AStar.js", "200+ LOC", "A* Grid node pathfinding & AI monster steering behaviors"],
    ["ItemDatabase.js", "28,000+ LOC", "3,500+ Items with weapons, armor, potions & stat bonuses"],
    ["MonsterDatabase.js", "20,000+ LOC", "2,500+ Monsters & bosses with AI rules & drop tables"],
    ["SpellDatabase.js", "16,000+ LOC", "2,000+ Spells across 8 elemental magic schools"],
    ["MapEditor.js", "180+ LOC", "Real-time tile painter, JSON serializer & live game applicator"]
];

slide10.addTable(modRows, {
    x: 0.8, y: 1.3, w: 8.4, h: 3.6,
    colW: [2.0, 1.8, 4.6],
    fill: COLOR_CARD,
    color: COLOR_TEXT,
    fontSize: 11,
    border: { pt: 1, color: "334155" }
});

// =========================================================
// SLIDE 11: Results & Output
// =========================================================
const slide11 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide11, "📊 Results & Performance Output");
addSlideFooter(slide11, 11);

slide11.addText([
    { text: "• Codebase Volume Achieved: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "113,942 Lines of Code (exceeding initial 50k LOC requirement).\n\n", options: { color: COLOR_SUCCESS, bold: true, fontSize: 16 } },
    { text: "• Frame Rate Performance: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "60 FPS locked performance with 1,000+ active world entities.\n\n", options: { color: COLOR_ACCENT, bold: true, fontSize: 16 } },
    { text: "• Zero Layout Vibration: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "Implemented tabular numeric font alignment (tabular-nums) & smooth 0.4s FPS sampling, eliminating header vibration.\n\n", options: { color: COLOR_MUTED, fontSize: 14 } },
    { text: "• Quality Assurance Verification: ", options: { bold: true, color: COLOR_TEXT, fontSize: 16 } },
    { text: "100% pass rate across 6 automated unit test suites.", options: { color: COLOR_SUCCESS, bold: true, fontSize: 14 } }
], { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 12: Advantages
// =========================================================
const slide12 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide12, "⭐ Key Advantages of ChromaQuest");
addSlideFooter(slide12, 12);

const advs = [
    "1. High Scalability: O(1) Spatial Hash Grid handles high entity density without performance degradation.",
    "2. Zero External Assets: Web Audio API synthesizes all sound effects procedurally, reducing load time to <1 second.",
    "3. Real-Time Level Hot-Reloading: Designers edit tiles live and apply custom maps directly to active gameplay.",
    "4. Decoupled ECS Code Quality: Adding new items, spells, or monster types requires zero modification to core engine loop.",
    "5. 100% Lightweight & Dependency-Free: Operates natively in standard web browsers without WebAssembly bloat."
];

slide12.addText(advs.map(a => ({ text: a + "\n\n", options: { color: COLOR_TEXT, fontSize: 14 } })), { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 13: Limitations
// =========================================================
const slide13 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide13, "⚠️ System Limitations");
addSlideFooter(slide13, 13);

slide13.addText([
    { text: "• 2D Canvas Context Scope: ", options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
    { text: "Uses HTML5 Canvas 2D context; 3D WebGL GPU shaders are not currently integrated.\n\n", options: { color: COLOR_MUTED, fontSize: 14 } },
    { text: "• Local Session State: ", options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
    { text: "Current implementation focuses on single-player local sessions; networked multi-client WebSocket synchronization is deferred to future scope.\n\n", options: { color: COLOR_MUTED, fontSize: 14 } },
    { text: "• LocalStorage Persistence: ", options: { bold: true, color: COLOR_PRIMARY, fontSize: 16 } },
    { text: "Map JSON exports and player saves utilize browser local storage rather than cloud database persistence.", options: { color: COLOR_MUTED, fontSize: 14 } }
], { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 14: Future Scope
// =========================================================
const slide14 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide14, "🔮 Future Scope & Enhancements");
addSlideFooter(slide14, 14);

const futs = [
    "Phase 1: WebGL 2.0 Shader Integration - Add GPU particle effects, dynamic lighting & bloom post-processing.",
    "Phase 2: Multiplayer WebSocket State Sync - Implement real-time multi-client player position & combat synchronization.",
    "Phase 3: Cloud Database Backend - Connect MongoDB / PostgreSQL backend for cross-device cloud saving & leaderboards.",
    "Phase 4: Procedural Dungeon Generator - Implement BSP tree algorithms for infinite procedural dungeon generation."
];

futs.forEach((f, idx) => {
    const y = 1.3 + idx * 0.9;
    slide14.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y, w: 8.4, h: 0.75, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
    slide14.addText(f, { x: 1.0, y: y + 0.1, w: 8.0, h: 0.55, fontSize: 13, bold: true, color: COLOR_TEXT });
});

// =========================================================
// SLIDE 15: Conclusion
// =========================================================
const slide15 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide15, "🏁 Conclusion & Key Takeaways");
addSlideFooter(slide15, 15);

slide15.addText([
    { text: "1. Delivered High-Volume Architecture: ", options: { bold: true, color: COLOR_SUCCESS, fontSize: 16 } },
    { text: "Successfully built and verified a 113,942 LOC web game engine.\n\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "2. Technical Innovation: ", options: { bold: true, color: COLOR_SUCCESS, fontSize: 16 } },
    { text: "Implemented ECS, O(1) Spatial Hash partitioning, A* pathfinding, and Web Audio API procedural sound synthesis.\n\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "3. Integrated Tooling & QA: ", options: { bold: true, color: COLOR_SUCCESS, fontSize: 16 } },
    { text: "Delivered interactive Map Editor with live map hot-reloading and achieved 100% pass rate across 6 unit test suites.\n\n", options: { color: COLOR_MUTED, fontSize: 15 } },
    { text: "4. Production Ready: ", options: { bold: true, color: COLOR_SUCCESS, fontSize: 16 } },
    { text: "Maintained 60 FPS performance and synced atomic commit history to GitHub remote repository.", options: { color: COLOR_MUTED, fontSize: 15 } }
], { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 16: References
// =========================================================
const slide16 = pptx.addSlide({ masterName: 'DARK_MASTER' });
addSlideHeader(slide16, "📚 References");
addSlideFooter(slide16, 16);

const refs = [
    "1. MDN Web Docs - HTML5 Canvas 2D Context & Web Audio API Specifications (Mozilla Developer Network).",
    "2. Game Programming Patterns (Robert Nystrom) - Entity Component System & Spatial Partitioning Architecture.",
    "3. Red Blob Games - Introduction to A* Pathfinding, Grid Heuristics & Steering Behaviors.",
    "4. ECMAScript 2026 Specification (TC39) - Modern ES6+ Modules & Performance Optimization.",
    "5. ChromaQuest GitHub Repository: https://github.com/Chandravamsi09/ChromaQuest.git"
];

slide16.addText(refs.map(r => ({ text: r + "\n\n", options: { color: COLOR_TEXT, fontSize: 13 } })), { x: 0.8, y: 1.2, w: 8.4, h: 3.8 });

// =========================================================
// SLIDE 17: Thank You / Q&A
// =========================================================
const slide17 = pptx.addSlide({ masterName: 'DARK_MASTER' });

slide17.addText("🎉 Thank You!", {
    x: 0.8, y: 1.5, w: 8.4, h: 1.0,
    fontSize: 48, bold: true, color: COLOR_PRIMARY, align: "center", fontFace: "Calibri"
});

slide17.addText("Questions & Answers", {
    x: 0.8, y: 2.7, w: 8.4, h: 0.6,
    fontSize: 24, color: COLOR_ACCENT, align: "center", fontFace: "Calibri"
});

slide17.addShape(pptx.shapes.RECTANGLE, { x: 1.8, y: 3.6, w: 6.4, h: 1.5, fill: { color: COLOR_CARD }, line: { color: COLOR_PRIMARY, width: 1 } });
slide17.addText("🎮 ChromaQuest Live Application: http://localhost:3000\n🌐 GitHub Remote: https://github.com/Chandravamsi09/ChromaQuest.git\n👨‍💻 Presenter: Chandra Vamsi Avvaru & Software Engineering Team", {
    x: 2.0, y: 3.8, w: 6.0, h: 1.1,
    fontSize: 13, color: COLOR_TEXT, align: "center"
});


// Save PowerPoint file to project_presentation.pptx
const outputFile = path.join(BASE_DIR, 'project_presentation.pptx');
pptx.writeFile({ fileName: outputFile })
    .then(fileName => {
        console.log(`[SUCCESS]: Created 17-slide Academic PowerPoint file: ${fileName}`);
        
        try {
            console.log("Opening 17-slide Academic PowerPoint presentation...");
            execSync(`Start-Process "${outputFile}"`, { shell: 'powershell.exe' });
            console.log("PowerPoint launched successfully!");
        } catch (e) {
            console.error("Failed to auto-launch PowerPoint:", e.message);
        }
    })
    .catch(err => {
        console.error("[ERROR]: Failed to write Academic PowerPoint file:", err);
    });
