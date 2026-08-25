# 🎮 ChromaQuest - Modular 2D Action RPG & Game Engine Suite

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-Proprietary-red)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-6%2F6%20passing-success)

**ChromaQuest** is a feature-rich 2D Action RPG, Tile Map Editor, and Custom Web Game Engine built completely in modern vanilla JavaScript (ES6+), HTML5 Canvas 2D, and Vanilla CSS. It features a custom Entity-Component-System (ECS), Spatial Hash Grid collision engine, A* Pathfinding, Web Audio API sound synthesizer, particle FX engine, comprehensive items/spells/monsters databases, skill trees, and an interactive tilemap editor.

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

## 📁 Dependencies

- **Node.js**: v18.0.0 or higher
- **NPM**: v9.0.0 or higher
- **Runtime Dependencies**: Listed in `package.json` and lockfile `package-lock.json` (`pptxgenjs`).

---

## ⚙️ Installation

To install dependencies and prepare the application:

```bash
npm install
```

---

## 🔨 Build

To build the ChromaQuest production bundle:

```bash
npm run build
```

---

## 🚀 Run

To run the application locally using the integrated HTTP server:

```bash
npm start
```

Alternatively, open `index.html` directly in any WebGL/Canvas-enabled web browser, or serve using:

```bash
npm run serve
```

To run using Docker:

```bash
docker build -t chromaquest .
docker run -p 3000:3000 chromaquest
```

---

## 🧪 Usage & Testing

To execute the 6 automated unit test suites:

```bash
npm test
```

### Controls:
- **WASD / Arrow Keys**: Hero Movement
- **Left Mouse Click**: Aim & Fire Projectiles
- **Keys 1 - 5**: Cast Spells (Fireball, Frost Nova, Lightning, Shield, Heal)
- **Key P**: Pause / Resume Game Loop

---

## 📂 Repository Architecture

```text
ChromaQuest/
├── Dockerfile                  # Containerized deployment manifest
├── server.js                   # Node.js static web server entry point
├── index.html                  # Main UI & Canvas Mounting Point
├── style.css                   # Glassmorphism Dark Theme & Game Layout
├── package.json                # Project Configuration & Scripts
├── package-lock.json           # Dependency Lockfile
├── src/
│   ├── core/                   # Game Loop, Event Bus, State Machine, Audio Synth
│   ├── ecs/                    # Entities, Components, Systems, World Manager
│   ├── physics/                # Spatial Hash, AABB, Collision Resolver
│   ├── pathfinding/            # A* Grid, Heuristics, Navigation Mesh
│   ├── data/                   # Item, Monster, Spell, Quest & Map Databases
│   ├── game/                   # Map Editor Engine & Gameplay Mechanics
│   └── ui/                     # HUD Overlay, Inventory UI, Quest Log UI, Editor UI
└── tests/                      # Automated Unit Test Suites & Runner
```

---

## 🔒 License

Proprietary Software. All Rights Reserved. Not licensed under any Open Source License.
