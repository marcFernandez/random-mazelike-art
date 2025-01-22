// Function to download the canvas as PNG
const downloadCanvas = () => {
    const link = document.createElement('a');
    link.download = 'random-mazy-pattern.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

/* @type {HTMLInputElement} */
var widthEl = document.getElementById("width");
/* @type {HTMLInputElement} */
var heightEl = document.getElementById("height");
/* @type {HTMLInputElement} */
var cellSizeEl = document.getElementById("cell-size");

/* @type {HTMLCanvasElement} */
var canvas = document.getElementById('maze-canvas');
/* @type {HTMLCanvasRenderingContext2D} */
var ctx = canvas.getContext('2d');


console.log(widthEl.value, heightEl.value, cellSizeEl.value);
var width = 900;
var height = 600;
var cellSize = 40;
ctx.width = width;
ctx.height = height;

const generateMaze = (w, h, c) => {
    const width = parseInt(w);
    const height = parseInt(h);
    const cellSize = parseInt(c);

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < height; i += cellSize) {
        for (let j = 0; j < width; j += cellSize) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            if (Math.random() < 0.5) {
                ctx.moveTo(j, i);
                ctx.lineTo(j + cellSize, i + cellSize);
                ctx.stroke();
            } else {
                ctx.moveTo(j, i + cellSize);
                ctx.lineTo(j + cellSize, i);
                ctx.stroke();
            }
        }
    }
}

generateMaze(widthEl.value, heightEl.value, cellSizeEl.value);

cellSizeEl.addEventListener('input', (ev) => {
    generateMaze(widthEl.value, heightEl.value, cellSizeEl.value);
});

widthEl.addEventListener('input', (ev) => {
    generateMaze(widthEl.value, heightEl.value, cellSizeEl.value);
});

heightEl.addEventListener('input', (ev) => {
    generateMaze(widthEl.value, heightEl.value, cellSizeEl.value);
});

const downloadImgButton = document.getElementById("downloadImgButton");
downloadImgButton.onclick = downloadCanvas;
