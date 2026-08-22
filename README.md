# 🎮 ChromaQuest - Modular 2D Action RPG & Game Engine Suite

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-6%2F6%20passing-success)

**ChromaQuest** is a feature-rich 2D Action RPG, Tile Map Editor, and Game Engine built completely in modern vanilla JavaScript (ES6+), HTML5 Canvas, and Vanilla CSS. It features a custom Entity-Component-System (ECS), Spatial Hash Grid collision engine, A* Pathfinding, Web Audio API sound synthesizer, particle FX engine, comprehensive items/spells/monsters databases, item crafting, skill trees, and an interactive tilemap editor.

---

## 🌟 Key Subsystems

1. **Entity-Component-System (ECS)**: Decoupled architecture supporting custom entities, modular components, and decoupled update/render systems.
2. **Spatial Partitioning & Physics Engine**: 2D Spatial Hash Grid supporting fast $O(1)$ broadphase collision queries for large open worlds.
3. **A* Pathfinding & AI Steering**: Grid-based path planning with Manhattan & Euclidean heuristics plus autonomous agent steering behaviors.
4. **Procedural Web Audio Synthesizer**: Synthesizes real-time sound effects (spells, combat hits, explosions, UI clicks) dynamically without external audio files.
5. **Comprehensive Content Databases**:
   - 3,500+ Items (Weapons, Armors, Accessories, Consumables, Crafting Reagents)
   - 2,500+ Monsters & Bosses with AI profiles and drop tables
   - 2,000+ Spells & Martial Skills across 8 elemental magic schools
   - 1,500+ Quests & Branching Dialogue Trees
   - 1,000+ Map & Dungeon Layout Templates
6. **In-Game Tilemap Editor**: Real-time tile drawing, collision masking, entity placement, brush modes, and JSON export/import.
7. **Automated Unit Test Suite**: 6 automated test suites covering Engine Core, ECS, Physics, Pathfinding, Inventory, and Quests.

---

## 📁 Repository Architecture

```text
ChromaQuest/
├── index.html                  # Main UI & Canvas Mounting Point
├── style.css                   # Glassmorphism Dark Theme & Game Layout
├── package.json                # Project Configuration & Test Scripts
├── src/
│   ├── core/                   # Game Loop, Event Bus, State Machine, Audio Synth
│   ├── ecs/                    # Entities, Components, Systems, World Manager
│   ├── physics/                # Spatial Hash, AABB, Collision Resolver
│   ├── pathfinding/            # A* Grid, Heuristics, Navigation Mesh
│   ├── data/                   # Item, Monster, Spell, Quest & Map Databases
│   ├── game/                   # Map Editor Engine & Gameplay Mechanics
│   └── ui/                     # HUD Overlay, Inventory UI, Quest Log UI, Editor UI
└── tests/                      # Automated Unit Test Suites & Runner
    ├── engine.test.js
    ├── ecs.test.js
    ├── physics.test.js
    ├── pathfinding.test.js
    ├── inventory.test.js
    └── quest.test.js
```

---

## 🚀 How to Run & Play

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Chandravamsi09/ChromaQuest.git
   cd ChromaQuest
   ```

2. **Run Automated Unit Tests**:
   ```bash
   npm test
   ```

3. **Play Game Locally**:
   Open `index.html` directly in any modern web browser or start a local HTTP server:
   ```bash
   npm start
   ```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.
