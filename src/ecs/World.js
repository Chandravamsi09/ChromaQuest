import { Entity } from './Entity.js';

export class World {
    constructor() {
        this.entities = new Map();
        this.nextId = 1;
    }
    createEntity() {
        const e = new Entity(this.nextId++);
        this.entities.set(e.id, e);
        return e;
    }
}