const grid = document.getElementById("paint-grid");
const sizePicker = document.getElementById("grid-size");
const colorPicker = document.getElementById('color-picker');
const sizeDisplay = document.getElementById("grid-size-value");
const clear = document.getElementById('clear-btn');
const colorBtn = document.getElementById('color-mode');
const rainbowBtn = document.getElementById('rainbow-mode');
const shadeBtn = document.getElementById('shade-mode');
const eraserBtn = document.getElementById('eraser');
const gridBtn = document.getElementById('grid-toggle');
const picture = document.getElementById('output');

let currentColor = '#000000';
let mouseDown = false;
let eraserMode = false;
let colorMode = true;
let shadeMode = false;
let rainbowMode = false;
let gridOn = false;

// Creates paint grid.
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

// Adds event listeners for size and color pickers, and clear button.
sizePicker.addEventListener('input', changeCanvasSize);
clear.addEventListener('click', clearCanvas)
colorPicker.addEventListener('input', () => {
    changeColor(colorPicker.value)
});

// Checks if mouse is currently down or not, returns true or false.
function checkMouse(div) {
    document.onmousedown = function() {
        mouseDown = true;
    }
    document.onmouseup = function() {
        mouseDown = false;
    }
}

// Changes the canvas size if the user adjusts the size slider. 
function changeCanvasSize() {

    // remove previos grid.
    let blocks = document.querySelectorAll('.grid-block');
    blocks.forEach(block => {
        block.remove();
    });

    // changes the template columns/rows attribute to 
    // correctly fit the new number of paintable blocks.
    grid.style.gridTemplateColumns = `repeat(${sizePicker.value}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${sizePicker.value}, 1fr)`;

    // changes displayed size to correct value.
    sizeDisplay.textContent = `${sizePicker.value} x ${sizePicker.value}`;

    // creates new grid.
    createGrid(sizePicker.value);

    // puts grid lines on new grid if user previously had them on.
    blocks = document.querySelectorAll('.grid-block');
    if (gridOn === true) {
        blocks.forEach(block => {
            block.style.border = 'solid 1px #EEE';
        });
    }
}

function changeColor(desiredColor) {
    currentColor = desiredColor;
}

// Generates random color for rainbow mode.
function randomColor() {
    let randomR = Math.floor(Math.random() * 256);
    let randomG = Math.floor(Math.random() * 256);
    let randomB = Math.floor(Math.random() * 256);
    
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

// Helper function for RGBtoHex().
function colorToHex(color) {
    let hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

// Takes rgb value and returns hex value.
function RGBtoHex(red, green, blue) {
    let hex = "#" + colorToHex(red) + colorToHex(green) + colorToHex(blue);
    return hex;
}

// Shades existing colors by a small amount all the way to black.
function shade(ogColor, amount) {
    // takes orignal rgb value and splits it 
    // into a list of the 3 numerical values.
    rgb = ogColor.substr(4).split(')')[0].split(',');

    // converts rgb to hex.
    hexColor = RGBtoHex(+rgb[0], +rgb[1], +rgb[2]);

    // creates shaded color.
    let shadedColor = '#' + hexColor.replace(/^#/, '').replace(/../g, hexColor => ('0'+Math.min(255, Math.max(0, parseInt(hexColor, 16) + amount)).toString(16)).substr(-2));
    return shadedColor;
}

// Takes picture of paint grid for the user to download.
function takeShot() {
    // Uses the html2canvas function to take a screenshot
    // and append it to the output div.
    html2canvas(grid).then(
        function (canvas) {
            document
            .getElementById('output')
            .appendChild(canvas);
        }
    )

    // brings screenshot to the center of the page.
    picture.style.top = 'auto';
    picture.style.left = 'auto';
    picture.style.opacity = 1;
}

function retrievePhoto() {
    return picture.lastElementChild;
}

// Function runs once the x button is clicked to close the screenshot.
// Moves "output" div off screen and deletes the canvas element inside it.
function hideShot() {
    picture.style.opacity = 0;
    picture.style.top = 'auto';
    picture.style.left = '-600px';

    let shot = retrievePhoto();
    picture.removeChild(shot);
}
 
// clears/resets the canvas of all painting and color.
function clearCanvas() {
    let blocks = document.querySelectorAll('.grid-block');
    blocks.forEach(block => {
        block.style.backgroundColor = 'white';
    });
}

// eraserOn(), colorOn(), rainbowOn(), and shadeOn() 
// all change the boolean values for each function 
// and change the appearances of the buttons.
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

// Turns grid lines on and off, changes button appearance.
function gridOnOff() {
    let blocks = document.querySelectorAll('.grid-block');
    if (gridOn === false) {
        blocks.forEach(block => {
            block.style.border = 'solid 1px #EEE';
        });
        gridOn = true;
        gridBtn.classList.add('selected');
    } else if (gridOn === true) {
        blocks.forEach(block => {
            block.style.border = 'none';
        });
        gridOn = false;
        gridBtn.classList.remove('selected');
    }
}

createGrid(16);