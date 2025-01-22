/* @type {HTMLCanvasElement} */
const canvas = document.getElementById('maze-canvas');
/* @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

const cellSize = 40;

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, width, height);

for (let i = 0; i < height; i += cellSize) {
    for (let j = 0; j < width; j += cellSize) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (Math.random() < 0.5) {
            ctx.moveTo(j, i);
            ctx.lineTo(j + cellSize, i+cellSize);
            ctx.stroke();
        } else {
            ctx.moveTo(j, i+cellSize);
            ctx.lineTo(j+cellSize, i);
            ctx.stroke();
        }
    }
}
