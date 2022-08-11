
export class Cell {
    constructor(index, colCount) {
        this.selected = false;
        this.col = Math.floor(index / colCount);
        this.row = index % colCount;  
        this.index = 0;
    }

}