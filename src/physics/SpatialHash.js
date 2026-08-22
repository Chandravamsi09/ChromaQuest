export class SpatialHash {
    constructor(cellSize = 64) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }
    clear() { this.grid.clear(); }
    insert(entity, x, y) {
        const key = Math.floor(x/this.cellSize) + ',' + Math.floor(y/this.cellSize);
        if (!this.grid.has(key)) this.grid.set(key, []);
        this.grid.get(key).push(entity);
    }
}