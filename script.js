const grid = document.getElementById("paint-grid");
const size = document.getElementById("grid-size");
const sizeDisplay = document.getElementById("grid-size-value");

function createGrid(num) {
    for(let i = 0; i < (num * num); i ++) {
        let gridBlock =  document.createElement('div');
        gridBlock.setAttribute('class', 'grid-block')
        grid.appendChild(gridBlock);
    }
}

createGrid(16);