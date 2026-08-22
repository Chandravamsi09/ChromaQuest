import { Time } from './Time.js';
import { EventBus } from './EventBus.js';

export class Engine {
    constructor() {
        this.time = new Time();
        this.eventBus = new EventBus();
        this.running = false;
    }
    start() {
        this.running = true;
        this.loop(performance.now());
    }
    loop(now) {
        if (!this.running) return;
        this.time.update(now);
        requestAnimationFrame((t) => this.loop(t));
    }
}
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        new Engine().start();
    });
}