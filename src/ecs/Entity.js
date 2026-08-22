export class Entity {
    constructor(id) {
        this.id = id;
        this.components = new Map();
    }
    addComponent(c) { this.components.set(c.constructor.name, c); }
    getComponent(name) { return this.components.get(name); }
}