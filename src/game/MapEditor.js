export class MapEditor {
    constructor(cols = 32, rows = 20) {
        this.cols = cols;
        this.rows = rows;
        this.grid = Array(rows).fill(0).map(() => Array(cols).fill(1));
    }
    exportJSON() { return JSON.stringify(this.grid); }
}