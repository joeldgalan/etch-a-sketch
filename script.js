const grid = document.getElementById("paint-grid");
const sizePicker = document.getElementById("grid-size");
const colorPicker = document.getElementById('color-picker');
const sizeDisplay = document.getElementById("grid-size-value");
const clear = document.getElementById('clear-btn');
const colorBtn = document.getElementById('color-mode');
const rainbowBtn = document.getElementById('rainbow-mode');
const shadeBtn = document.getElementById('shade-mode');

let color = 'black';

function createGrid(num) {
    for(let i = 0; i < (num * num); i ++) {
        let gridBlock =  document.createElement('div');
        gridBlock.addEventListener('mouseover', () => {
            gridBlock.style.backgroundColor = color;
        });
        gridBlock.setAttribute('class', 'grid-block')
        grid.appendChild(gridBlock);
    }
}

function changeCanvasSize() {

    // remove previos grid.
    let blocks = document.querySelectorAll('.grid-block');
    blocks.forEach(block => {
        block.remove();
    });

    grid.style.gridTemplateColumns = `repeat(${sizePicker.value}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${sizePicker.value}, 1fr)`;

    createGrid(sizePicker.value);
}

// function getColor() {

// }

sizePicker.addEventListener('input', changeCanvasSize);
clear.addEventListener('click', clearCanvas)
colorPicker.addEventListener('input', () => {
    changeColor(colorPicker.value)
});

function changeColor(desiredColor) {
    console.log(color, desiredColor);
    color = desiredColor;
}

function erase() {
    changeColor('white');
}

function clearCanvas() {
    let blocks = document.querySelectorAll('.grid-block');
    blocks.forEach(block => {
        block.style.backgroundColor = 'white';
    });
}

createGrid(16);