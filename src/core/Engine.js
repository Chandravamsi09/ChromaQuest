import { Time } from './Time.js';
import { EventBus } from './EventBus.js';

export class Engine {
    constructor() {
        this.time = new Time();
        this.eventBus = new EventBus();
        this.running = false;

        // Player & Game State
        this.player = {
            x: 640,
            y: 360,
            vx: 0,
            vy: 0,
            speed: 250,
            size: 24,
            color: '#38bdf8',
            hp: 850,
            maxHp: 1000,
            mp: 350,
            maxMp: 500
        };

        // Entities (Monsters, Particles, Projectiles)
        this.entities = [];
        this.particles = [];
        this.projectiles = [];
        
        // Key State
        this.keys = {};
        
        // Map Grid (32x20 tiles)
        this.cols = 40;
        this.rows = 23;
        this.tileSize = 32;
        this.mapGrid = [];

        // Map Editor State
        this.editorTile = 1;
        this.editorGrid = [];

        // Audio Synthesizer Context
        this.audioCtx = null;
    }

    init() {
        this.initMap();
        this.initEntities();
        this.initInputs();
        this.initUI();
        this.initEditorCanvas();
    }

    initMap() {
        for (let r = 0; r < this.rows; r++) {
            const row = [];
            for (let c = 0; c < this.cols; c++) {
                // Outer walls stone (4), water pond (3), grass (1)
                if (r === 0 || r === this.rows - 1 || c === 0 || c === this.cols - 1) {
                    row.push(4); // Stone border
                } else if (r >= 5 && r <= 8 && c >= 8 && c <= 12) {
                    row.push(3); // Water pond
                } else if (r >= 12 && r <= 15 && c >= 25 && c <= 30) {
                    row.push(2); // Dirt path
                } else {
                    row.push(1); // Grass
                }
            }
            this.mapGrid.push(row);
        }
        this.editorGrid = JSON.parse(JSON.stringify(this.mapGrid));
    }

    initEntities() {
        const monsterTypes = [
            { name: 'Goblin Scout', color: '#4ade80', size: 18, hp: 120 },
            { name: 'Orc Brute', color: '#f87171', size: 28, hp: 350 },
            { name: 'Skeleton Warrior', color: '#e2e8f0', size: 20, hp: 180 },
            { name: 'Fire Elemental', color: '#fb923c', size: 22, hp: 250 },
            { name: 'Void Wraith', color: '#c084fc', size: 24, hp: 300 }
        ];

        for (let i = 0; i < 8; i++) {
            const mType = monsterTypes[i % monsterTypes.length];
            this.entities.push({
                id: i + 1,
                name: mType.name,
                x: 150 + Math.random() * 950,
                y: 100 + Math.random() * 500,
                vx: (Math.random() - 0.5) * 80,
                vy: (Math.random() - 0.5) * 80,
                size: mType.size,
                color: mType.color,
                hp: mType.hp,
                maxHp: mType.hp
            });
        }
    }

    initInputs() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;

            // Spell Hotkeys 1-5
            if (e.key === '1') this.castSpell('fireball');
            if (e.key === '2') this.castSpell('frost');
            if (e.key === '3') this.castSpell('lightning');
            if (e.key === '4') this.castSpell('shield');
            if (e.key === '5') this.castSpell('heal');
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        const canvas = document.getElementById('game-canvas');
        if (canvas) {
            canvas.addEventListener('click', (e) => {
                const rect = canvas.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                this.castProjectile(clickX, clickY);
            });
        }
    }

    castSpell(type) {
        this.playAudioSynth(type);
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 50 + Math.random() * 200;
            let pColor = '#fb923c';
            if (type === 'frost') pColor = '#38bdf8';
            if (type === 'lightning') pColor = '#facc15';
            if (type === 'shield') pColor = '#818cf8';
            if (type === 'heal') pColor = '#4ade80';

            this.particles.push({
                x: this.player.x,
                y: this.player.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0.5 + Math.random() * 0.5,
                color: pColor,
                size: 3 + Math.random() * 5
            });
        }
    }

    castProjectile(targetX, targetY) {
        const dx = targetX - this.player.x;
        const dy = targetY - this.player.y;
        const dist = Math.hypot(dx, dy);
        if (dist === 0) return;

        this.projectiles.push({
            x: this.player.x,
            y: this.player.y,
            vx: (dx / dist) * 500,
            vy: (dy / dist) * 500,
            color: '#38bdf8',
            size: 8,
            life: 2.0
        });
        this.playAudioSynth('spell');
    }

    playAudioSynth(type) {
        if (!this.audioCtx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.audioCtx = new AudioCtx();
        }
        if (!this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        const now = this.audioCtx.currentTime;
        if (type === 'fireball' || type === 'spell') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'heal' || type === 'levelup') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.linearRampToValueAtTime(50, now + 0.15);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        }
    }

    initUI() {
        // Tab Navigation
        const tabs = [
            { btn: 'btn-tab-game', view: 'game-view' },
            { btn: 'btn-tab-editor', view: 'editor-view' },
            { btn: 'btn-tab-tests', view: 'tests-view' },
            { btn: 'btn-tab-audio', view: 'audio-view' }
        ];

        tabs.forEach(t => {
            const btn = document.getElementById(t.btn);
            if (btn) {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                    document.querySelectorAll('.view-panel').forEach(v => v.classList.remove('active'));
                    btn.classList.add('active');
                    document.getElementById(t.view).classList.add('active');
                });
            }
        });

        // Skill Slots
        document.querySelectorAll('.skill-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                const s = slot.getAttribute('data-skill');
                this.castSpell(s);
            });
        });

        // Audio Synth Buttons
        const soundBtns = [
            { id: 'btn-sfx-spell', type: 'fireball' },
            { id: 'btn-sfx-hit', type: 'hit' },
            { id: 'btn-sfx-coin', type: 'heal' },
            { id: 'btn-sfx-explosion', type: 'fireball' },
            { id: 'btn-sfx-levelup', type: 'levelup' }
        ];
        soundBtns.forEach(sb => {
            const elem = document.getElementById(sb.id);
            if (elem) {
                elem.addEventListener('click', () => this.playAudioSynth(sb.type));
            }
        });

        // Modals
        const modalOverlay = document.getElementById('modal-overlay');
        const modalBody = document.getElementById('modal-body-content');
        const modalTitle = document.getElementById('modal-title');
        const closeModal = document.getElementById('btn-close-modal');

        if (closeModal && modalOverlay) {
            closeModal.addEventListener('click', () => modalOverlay.classList.add('modal-hidden'));
        }

        const openInv = document.getElementById('btn-open-inventory');
        if (openInv) {
            openInv.addEventListener('click', () => {
                modalTitle.innerText = "🎒 Character Inventory";
                modalBody.innerHTML = `
                    <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:12px;">
                        ${Array(15).fill(0).map((_, i) => `<div style="height:60px; background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.1); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">${['🗡️','🛡️','🧪','💍','📜','🏹','🪓','🔮'][i % 8]}</div>`).join('')}
                    </div>
                `;
                modalOverlay.classList.remove('modal-hidden');
            });
        }

        const openSkills = document.getElementById('btn-open-skills');
        if (openSkills) {
            openSkills.addEventListener('click', () => {
                modalTitle.innerText = "📜 Skill Tree & Talents";
                modalBody.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="padding:12px; background:rgba(255,255,255,0.05); border-radius:8px;">🔥 <strong>Inferno Burst</strong> (Level 3) - Unleashes 300 Fire Damage</div>
                        <div style="padding:12px; background:rgba(255,255,255,0.05); border-radius:8px;">❄️ <strong>Frost Nova</strong> (Level 2) - Freezes nearby enemies for 3s</div>
                        <div style="padding:12px; background:rgba(255,255,255,0.05); border-radius:8px;">⚡ <strong>Chain Lightning</strong> (Level 1) - Bounces to 4 targets</div>
                    </div>
                `;
                modalOverlay.classList.remove('modal-hidden');
            });
        }

        const openQuests = document.getElementById('btn-open-quests');
        if (openQuests) {
            openQuests.addEventListener('click', () => {
                modalTitle.innerText = "🗡️ Active Quest Log";
                modalBody.innerHTML = `
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="padding:12px; background:rgba(255,255,255,0.05); border-radius:8px;">🎯 <strong>Quest 1: Defeat Sector Goblins</strong> (Progress: 5/8)</div>
                        <div style="padding:12px; background:rgba(255,255,255,0.05); border-radius:8px;">🔍 <strong>Quest 2: Explore Water Sanctum</strong> (Progress: Completed)</div>
                    </div>
                `;
                modalOverlay.classList.remove('modal-hidden');
            });
        }
    }

    initEditorCanvas() {
        const paletteOptions = document.querySelectorAll('.tile-option');
        paletteOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                paletteOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                this.editorTile = parseInt(opt.getAttribute('data-tile'));
            });
        });

        const editorCanvas = document.getElementById('editor-canvas');
        if (!editorCanvas) return;

        let isDrawing = false;
        const drawTile = (e) => {
            const rect = editorCanvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / 32);
            const y = Math.floor((e.clientY - rect.top) / 32);
            if (y >= 0 && y < this.rows && x >= 0 && x < this.cols) {
                this.editorGrid[y][x] = this.editorTile;
            }
        };

        editorCanvas.addEventListener('mousedown', (e) => { isDrawing = true; drawTile(e); });
        editorCanvas.addEventListener('mousemove', (e) => { if (isDrawing) drawTile(e); });
        window.addEventListener('mouseup', () => { isDrawing = false; });

        const saveMap = document.getElementById('btn-save-map');
        if (saveMap) {
            saveMap.addEventListener('click', () => {
                alert("Map Exported Successfully!\n" + JSON.stringify(this.editorGrid).substring(0, 100) + "...");
            });
        }

        const clearMap = document.getElementById('btn-clear-map');
        if (clearMap) {
            clearMap.addEventListener('click', () => {
                for (let r = 0; r < this.rows; r++) {
                    for (let c = 0; c < this.cols; c++) this.editorGrid[r][c] = 1;
                }
            });
        }
    }

    start() {
        this.init();
        this.running = true;
        this.time.last = performance.now();
        this.loop(performance.now());
    }

    update(dt) {
        // Player Input Movement
        let dx = 0, dy = 0;
        if (this.keys['KeyW'] || this.keys['ArrowUp']) dy -= 1;
        if (this.keys['KeyS'] || this.keys['ArrowDown']) dy += 1;
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) dx -= 1;
        if (this.keys['KeyD'] || this.keys['ArrowRight']) dx += 1;

        if (dx !== 0 && dy !== 0) {
            dx *= 0.7071;
            dy *= 0.7071;
        }

        this.player.x += dx * this.player.speed * dt;
        this.player.y += dy * this.player.speed * dt;

        // Clamp to canvas bounds
        this.player.x = Math.max(30, Math.min(1250, this.player.x));
        this.player.y = Math.max(30, Math.min(690, this.player.y));

        // Update Entities
        for (const e of this.entities) {
            e.x += e.vx * dt;
            e.y += e.vy * dt;
            if (e.x < 50 || e.x > 1200) e.vx *= -1;
            if (e.y < 50 || e.y > 650) e.vy *= -1;
        }

        // Update Projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) this.projectiles.splice(i, 1);
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    render() {
        // 1. Render Game Canvas
        const gameCanvas = document.getElementById('game-canvas');
        if (gameCanvas) {
            const ctx = gameCanvas.getContext('2d');
            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

            // Render Map Tiles
            const tileColors = { 1: '#1b3815', 2: '#4a3b2c', 3: '#1e3a8a', 4: '#374151', 5: '#713f12' };
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const tile = this.mapGrid[r][c];
                    ctx.fillStyle = tileColors[tile] || '#1b3815';
                    ctx.fillRect(c * this.tileSize, r * this.tileSize, this.tileSize - 1, this.tileSize - 1);
                }
            }

            // Render Projectiles
            for (const p of this.projectiles) {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Render Particles
            for (const p of this.particles) {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.life);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }

            // Render Monsters
            for (const e of this.entities) {
                ctx.fillStyle = e.color;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.size / 2, 0, Math.PI * 2);
                ctx.fill();

                // HP Bar
                ctx.fillStyle = '#000';
                ctx.fillRect(e.x - 20, e.y - e.size - 8, 40, 5);
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(e.x - 20, e.y - e.size - 8, 40 * (e.hp / e.maxHp), 5);
            }

            // Render Player
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#06b6d4';
            ctx.fillStyle = this.player.color;
            ctx.beginPath();
            ctx.arc(this.player.x, this.player.y, this.player.size / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Player Label
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Outfit';
            ctx.textAlign = 'center';
            ctx.fillText('HERO (Lvl 12)', this.player.x, this.player.y - 20);
        }

        // 2. Render Editor Canvas
        const editorCanvas = document.getElementById('editor-canvas');
        if (editorCanvas) {
            const eCtx = editorCanvas.getContext('2d');
            eCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);

            const tileColors = { 1: '#2d4a22', 2: '#5a4d41', 3: '#1e3a8a', 4: '#4b5563', 5: '#854d0e' };
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const tile = this.editorGrid[r][c];
                    eCtx.fillStyle = tileColors[tile] || '#2d4a22';
                    eCtx.fillRect(c * 32, r * 32, 31, 31);
                }
            }
        }
    }

    loop(currentTime) {
        if (!this.running) return;
        this.time.update(currentTime);
        this.update(this.time.delta);
        this.render();

        const fpsElem = document.getElementById('fps-display');
        if (fpsElem) fpsElem.innerText = Math.round(1 / Math.max(0.001, this.time.delta));

        requestAnimationFrame((t) => this.loop(t));
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        const gameEngine = new Engine();
        window.gameEngine = gameEngine;
        gameEngine.start();
    });
}