export class AStarGrid {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
    }
    findPath(startX, startY, targetX, targetY) {
        return [{ x: startX, y: startY }, { x: targetX, y: targetY }];
    }
}