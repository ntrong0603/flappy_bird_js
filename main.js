const cvs = document.getElementById("board");
const ctx = cvs.getContext("2d");
// khai báo thành phần trong game
let bird = new Image();
bird.src = "images/bird.png";

let bg = new Image();
bg.src = "images/bg.png";

let fg = new Image();
fg.src = "images/fg.png";

let pipeNorth = new Image();
pipeNorth.src = "images/pipeNorth.png";

let pipeSouth = new Image();
pipeSouth.src = "images/pipeSouth.png";
// Âm thanh
let fly = new Audio();
fly.src = "sounds/fly.mp3";

let scor = new Audio();
scor.src = "sounds/score.mp3";
// =============
// khai báo các giá trị ban đầu
// Khoảng cách giữa 2 ống
let gap = 85;
// Tọa độ ống nước dưới
let constant;

// Tọa độ của chim
let bX = 10;
let bY = 150;

// mức độ rơi của chim (1,5 pixel)
let gravity = 1.5;

let score = 0;

// Mảng ống nước
var pipe = [];

// ống nước ban đầu
pipe[0] = {
    x: cvs.width,
    y: 0
};

let endGame = false;

document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

function draw() {

    if (endGame) {
        return;
    }

    ctx.drawImage(bg, 0, 0);


    for (var i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if(pipe[i].x < -(pipeNorth.width)) {
            pipe.shift();
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            endGame = true;
        }

        if(bY >= (cvs.height - fg.height)) {
            endGame = true;
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);

}

draw();


