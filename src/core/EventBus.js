export class EventBus {
    constructor() { this.listeners = new Map(); }
    on(event, cb) {
        if (!this.listeners.has(event)) this.listeners.set(event, []);
        this.listeners.get(event).push(cb);
    }
    emit(event, data) {
        if (this.listeners.has(event)) {
            for (const cb of this.listeners.get(event)) cb(data);
        }
    }
}