// Function to download the canvas as PNG
const downloadCanvas = () => {
    const link = document.createElement('a');
    link.download = 'random-mazy-pattern.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

const CONFIG_KEY = "random-mazy-art-config";

/* @type {HTMLInputElement} */
var widthEl = document.getElementById("width");
/* @type {HTMLInputElement} */
var heightEl = document.getElementById("height");
/* @type {HTMLInputElement} */
var cellSizeEl = document.getElementById("cellSize");
/* @type {HTMLInputElement} */
var backgroundColorEl = document.getElementById("backgroundColor");
/* @type {HTMLInputElement} */
var lineColorEl = document.getElementById("lineColor");
/* @type {HTMLInputElement} */
var fillSquaresEl = document.getElementById("fillSquares");
/* @type {HTMLInputElement} */
var squareFillColorEl = document.getElementById("squareFillColor");
/* @type {HTMLInputElement} */
var lineWidthEl = document.getElementById("lineWidth");

/* @type {HTMLCanvasElement} */
var canvas = document.getElementById('maze-canvas');
/* @type {HTMLCanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');

const storeConfig = () => {
    const width = parseInt(widthEl.value);
    const height = parseInt(heightEl.value);
    const cellSize = parseInt(cellSizeEl.value) - 1;
    const lineWidth = parseInt(lineWidthEl.value);
    const squareFillColor = squareFillColorEl.value;
    const fillSquares = fillSquaresEl.checked;
    const lineColor = lineColorEl.value;
    const backgroundColor = backgroundColorEl.value;
    const config = {
        width,
        height,
        cellSize,
        lineWidth,
        squareFillColor,
        fillSquares,
        lineColor,
        backgroundColor,
    }
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

const restoreConfig = () => {
    const config = JSON.parse(localStorage.getItem(CONFIG_KEY));
    if (config) {
        widthEl.value = config.width;
        heightEl.value = config.height;
        cellSizeEl.value = config.cellSize;
        lineWidthEl.value = config.lineWidth;
        squareFillColorEl.value = config.squareFillColor;
        fillSquaresEl.checked = config.fillSquares;
        lineColorEl.value = config.lineColor;
        backgroundColorEl.value = config.backgroundColor;
    }
}
restoreConfig();

const restoreDefaults = () => {
    widthEl.value = 800;
    heightEl.value = 600;
    cellSizeEl.value = 50;
    lineWidthEl.value = 2;
    squareFillColorEl.value = "#ffdd00";
    fillSquaresEl.checked = false;
    lineColorEl.value = "#ffffff";
    backgroundColorEl.value = "#000000";
    storeConfig();
    regenerateMaze();
}

const width = parseInt(widthEl.value);
const height = parseInt(heightEl.value);
const cellSize = parseInt(cellSizeEl.value) - 1;
const lineWidth = parseInt(lineWidthEl.value);
const squareFillColor = squareFillColorEl.value;
const fillSquares = fillSquaresEl.checked;
const lineColor = lineColorEl.value;
const backgroundColor = backgroundColorEl.value;

var grid = new Array(parseInt((height / cellSize) / 10));
for (let j = 0; j * cellSize < width; j++) {
    grid[j] = new Array(parseInt((width / cellSize) / 10));
}

const regenerateMaze = () => {
    const width = parseInt(widthEl.value);
    const height = parseInt(heightEl.value);
    const cellSize = parseInt(cellSizeEl.value) > 0 ? parseInt(cellSizeEl.value) : 1;

    grid = new Array(parseInt((height / cellSize) / 10));
    for (let j = 0; j * cellSize < width; j++) {
        grid[j] = new Array(parseInt((width / cellSize) / 10));
    }

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = backgroundColorEl.value;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i * cellSize < height; i++) {
        for (let j = 0; j * cellSize < width; j++) {
            ctx.strokeStyle = lineColorEl.value;
            ctx.lineWidth = parseInt(lineWidthEl.value);
            ctx.beginPath();
            if (Math.random() < 0.5) {
                grid[i][j] = -1;
                ctx.moveTo(j * cellSize, i * cellSize);
                ctx.lineTo(j * cellSize + cellSize, i * cellSize + cellSize);
                ctx.stroke();
            } else {
                grid[i][j] = 1;
                ctx.moveTo(j * cellSize, i * cellSize + cellSize);
                ctx.lineTo(j * cellSize + cellSize, i * cellSize);
                ctx.stroke();
            }
        }
    }

    if (fillSquaresEl.checked) {
        for (let i = 0; i * cellSize < height; i++) {
            for (let j = 0; j * cellSize < width; j++) {
                if (grid[i][j] === 1 && grid[i][j + 1] === -1 && grid[i + 1][j] === -1 && grid[i + 1][j + 1] === 1) {
                    ctx.beginPath();
                    ctx.moveTo(j * cellSize + cellSize, i * cellSize);
                    ctx.lineTo(j * cellSize, i * cellSize + cellSize);
                    ctx.lineTo(j * cellSize + cellSize, i * cellSize + 2 * cellSize);
                    ctx.lineTo(j * cellSize + 2 * cellSize, i * cellSize + cellSize);
                    ctx.closePath();

                    ctx.fillStyle = squareFillColorEl.value;
                    ctx.fill();
                }
            }
        }
    }
}

const generateMaze = () => {
    const width = parseInt(widthEl.value);
    const height = parseInt(heightEl.value);
    const cellSize = parseInt(cellSizeEl.value);

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = backgroundColorEl.value;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i * cellSize < height; i++) {
        for (let j = 0; j * cellSize < width; j++) {
            ctx.strokeStyle = lineColorEl.value;
            ctx.lineWidth = parseInt(lineWidthEl.value);
            ctx.beginPath();
            if (grid[i][j] === -1) {
                ctx.moveTo(j * cellSize, i * cellSize);
                ctx.lineTo(j * cellSize + cellSize, i * cellSize + cellSize);
                ctx.stroke();
            } else {
                ctx.moveTo(j * cellSize, i * cellSize + cellSize);
                ctx.lineTo(j * cellSize + cellSize, i * cellSize);
                ctx.stroke();
            }
        }
    }

    if (fillSquaresEl.checked) {
        for (let i = 0; i * cellSize < height; i++) {
            for (let j = 0; j * cellSize < width; j++) {
                if (grid[i][j] === 1 && grid[i][j + 1] === -1 && grid[i + 1][j] === -1 && grid[i + 1][j + 1] === 1) {
                    ctx.beginPath();
                    ctx.moveTo(j * cellSize + cellSize, i * cellSize);
                    ctx.lineTo(j * cellSize, i * cellSize + cellSize);
                    ctx.lineTo(j * cellSize + cellSize, i * cellSize + 2 * cellSize);
                    ctx.lineTo(j * cellSize + 2 * cellSize, i * cellSize + cellSize);
                    ctx.closePath();

                    ctx.fillStyle = squareFillColorEl.value;
                    ctx.fill();
                }
            }
        }
    }
}

regenerateMaze(widthEl.value, heightEl.value, cellSizeEl.value);

fillSquaresEl.addEventListener('change', () => {
    generateMaze();
    storeConfig();
});

squareFillColorEl.addEventListener('input', () => {
    if (fillSquaresEl.checked) {
        generateMaze();
    }
    storeConfig();
});

backgroundColorEl.addEventListener('input', () => {
    generateMaze();
    storeConfig();
});

lineColorEl.addEventListener('input', () => {
    generateMaze();
    storeConfig();
});

cellSizeEl.addEventListener('input', () => {
    regenerateMaze();
    storeConfig();
});

widthEl.addEventListener('input', () => {
    regenerateMaze();
    storeConfig();
});

heightEl.addEventListener('input', () => {
    regenerateMaze();
    storeConfig();
});

lineWidthEl.addEventListener('input', () => {
    generateMaze();
    storeConfig();
});

const downloadImgButton = document.getElementById("downloadImgButton");
downloadImgButton.onclick = downloadCanvas;

const regenerateArtButton = document.getElementById("regenerateArtButton");
regenerateArtButton.onclick = regenerateMaze;

const restoreDefaultsButton = document.getElementById("restoreDefaultsButton");
restoreDefaultsButton.onclick = restoreDefaults;
