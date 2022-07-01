const grid = document.getElementById("paint-grid");
const sizePicker = document.getElementById("grid-size");
const colorPicker = document.getElementById('color-picker');
const sizeDisplay = document.getElementById("grid-size-value");
const clear = document.getElementById('clear-btn');
const colorBtn = document.getElementById('color-mode');
const rainbowBtn = document.getElementById('rainbow-mode');
const shadeBtn = document.getElementById('shade-mode');
const eraserBtn = document.getElementById('eraser');

let currentColor = '#000000';
let mouseDown = false;
let eraserMode = false;
let colorMode = true;
let shadeMode = false;
let rainbowMode = false;
let gridOn = false;

function createGrid(num) {
    for(let i = 0; i < (num * num); i ++) {
        let gridBlock = document.createElement('div');

        // event listener for paintning by dragging 
        // the mouse over divs, *while mouse is down*.
        gridBlock.addEventListener('mouseover', () => {
            checkMouse(gridBlock);
            if (mouseDown) {
                if (colorMode) {
                    gridBlock.style.backgroundColor = currentColor;
                } else if (eraserMode) {
                    gridBlock.style.backgroundColor = '#FFFFFF';
                } else if (rainbowMode) {
                    gridBlock.style.backgroundColor = randomColor();
                } else if (shadeMode) {
                    gridBlock.style.backgroundColor = shade(gridBlock.style.backgroundColor, -25);
                }
            }
        });
        
        // event listener for painting by just clicking mouse down on a div.
        gridBlock.addEventListener('mousedown', () => {
            if (colorMode) {
                gridBlock.style.backgroundColor = currentColor;
            } else if (eraserMode) {
                gridBlock.style.backgroundColor = 'white';
            } else if (rainbowMode) {
                gridBlock.style.backgroundColor = randomColor();
            } else if (shadeMode) {
                gridBlock.style.backgroundColor = shade(gridBlock.style.backgroundColor, -25);
            }
        });

        gridBlock.style.backgroundColor = '#FFFFFF';
        gridBlock.setAttribute('class', 'grid-block');
        grid.appendChild(gridBlock);
    }
}

function checkMouse(div) {
    document.onmousedown = function() {
        mouseDown = true;
    }
    document.onmouseup = function() {
        mouseDown = false;
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

    sizeDisplay.textContent = `${sizePicker.value} x ${sizePicker.value}`;

    createGrid(sizePicker.value);
}

sizePicker.addEventListener('input', changeCanvasSize);
clear.addEventListener('click', clearCanvas)
colorPicker.addEventListener('input', () => {
    changeColor(colorPicker.value)
});

function changeColor(desiredColor) {
    currentColor = desiredColor;
}

function randomColor() {
    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);
    
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function colorToHex(color) {
    let hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }

function RGBtoHex(red, green, blue) {

    let hex = "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue);

    return hex;
}

function shade(ogColor, amount) {
    rgb = ogColor.substr(4).split(')')[0].split(',');

    hexColor = RGBtoHex(+rgb[0], +rgb[1], +rgb[2]);

    let shadedColor = '#' + hexColor.replace(/^#/, '').replace(/../g, hexColor => ('0'+Math.min(255, Math.max(0, parseInt(hexColor, 16) + amount)).toString(16)).substr(-2));
    return shadedColor;
}

function clearCanvas() {
    let blocks = document.querySelectorAll('.grid-block');
    blocks.forEach(block => {
        block.style.backgroundColor = 'white';
    });
}

function eraserOn() {
    eraserMode = true;
    colorMode = false;
    rainbowMode = false;
    shadeMode = false;

    eraserBtn.classList.add('selected');
    colorBtn.classList.remove('selected');
    rainbowBtn.classList.remove('selected');
    shadeBtn.classList.remove('selected');
}

function colorOn() {
    eraserMode = false;
    colorMode = true;
    rainbowMode = false;
    shadeMode = false;

    colorBtn.classList.add('selected');
    rainbowBtn.classList.remove('selected');
    shadeBtn.classList.remove('selected');
    eraserBtn.classList.remove('selected');
}

function rainbowOn() {
    eraserMode = false;
    colorMode = false;
    rainbowMode = true;
    shadeMode = false;

    rainbowBtn.classList.add('selected');
    colorBtn.classList.remove('selected');
    shadeBtn.classList.remove('selected');
    eraserBtn.classList.remove('selected');
}

function shadeOn() {
    eraserMode = false;
    colorMode = false;
    rainbowMode = false;
    shadeMode = true;

    shadeBtn.classList.add('selected');
    colorBtn.classList.remove('selected');
    rainbowBtn.classList.remove('selected');
    eraserBtn.classList.remove('selected');
} 

function gridOnOff() {
    let blocks = document.querySelectorAll('.grid-block');
    if (gridOn === false) {
        blocks.forEach(block => {
            block.style.border = 'solid 1px #EEE';
        });
        gridOn = true;
    } else if (gridOn === true) {
        blocks.forEach(block => {
            block.style.border = 'none';
        });
        gridOn = false;
    }


}

createGrid(16);