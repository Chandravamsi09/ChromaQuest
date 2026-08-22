export class Time {
    constructor() {
        this.now = performance.now();
        this.last = performance.now();
        this.delta = 0;
        this.fps = 60;
    }
    update(currentTime) {
        this.now = currentTime;
        this.delta = Math.min((this.now - this.last) / 1000.0, 0.1);
        this.last = this.now;
    }
}