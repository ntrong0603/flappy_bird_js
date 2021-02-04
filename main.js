const cvs = document.getElementById("board");
const ctx = cvs.getContext("2d");
// khai báo thành phần trong game
var bird = new Image();
bird.src = "images/bird.png";

var bg = new Image();
bg.src = "images/bg.png";

var fg = new Image();
fg.src = "images/fg.png";

var pipeNorth = new Image();
pipeNorth.src = "images/pipeNorth.png";

var pipeSouth = new Image();
pipeSouth.src = "images/pipeSouth.png";
// Âm thanh
var fly = new Audio();
fly.src = "sounds/fly.mp3";

var scor = new Audio();
scor.src = "sounds/score.mp3";
// =============
//kích thước khung hình
cvs.width = window.innerWidth;
cvs.height = 512;
// khai báo các giá trị ban đầu
// Khoảng cách giữa 2 ống
var gap = 125;
// Tọa độ ống nước dưới
var constant;

// Tọa độ của chim
var bX = 10;
var bY = 150;

// mức độ rơi của chim (1,5 pixel)
var gravity = 1.5;
var jump = 30;

var score = 0;

// Mảng ống nước
var pipe = [];
var movePipeX = 0;

var playGame = false;
var endGame = false;

document.addEventListener("keydown", moveUp);

function main() {
    createdPipeFirst();
}
main();
function createdPipeFirst() {
    var pipeX = gap;
    var length = Math.round(cvs.width / gap) + 1;
    if (length == 'Infinity') {
        length = 3;
    }
    for (var i = 0; i < length; i++) {
        pipe.push({
            x: pipeX,
            y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        });
        pipeX += gap;
    }
}
function createBackgournd() {
    var widthBg = bg.width;
    var length = Math.round(cvs.width / widthBg);
    if (length == 'Infinity') {
        length = 3;
    }
    var pointX = 0;
    for (var i = 0; i < length; i++) {
        ctx.drawImage(bg, pointX, 0);
        pointX += widthBg;
    }
}
function createFooterBackgournd() {
    var widthBg = fg.width;
    var length = Math.round(cvs.width / widthBg) + 1;
    if (length == 'Infinity') {
        length = 3;
    }
    var pointX = 0;
    for (var i = 0; i < length; i++) {
        ctx.drawImage(fg, pointX, cvs.height - fg.height);
        pointX += widthBg;
    }
    // Footerback ground
}
function play() {
    bX = 10;
    bY = 150;
    // Mảng ống nước
    pipe = [];

    // ống nước ban đầu
    pipe[0] = {
        x: cvs.width,
        y: 0
    };
    endGame = false;
    draw();
}

function moveUp() {
    bY -= jump;
    if (bY <= 0) {
        bY = 0;
    }
    fly.play();
}

function draw() {

    if (endGame) {
        return;
    }
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    createBackgournd();
    movePipeX++;
    if (movePipeX == gap) {
        pipe.push({
            x: pipe[pipe.length - 1].x + gap,
            y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        });
        console.log = "11";
        movePipeX = 0;
    }
    for (var i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        

        if (pipe[i].x < -(pipeNorth.width + 10)) {
            pipe.shift();
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant) || bY + bird.height >= cvs.height - fg.height) {
            endGame = true;
        }

        if (bY >= (cvs.height - fg.height)) {
            endGame = true;
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }


    }
    createFooterBackgournd();
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);

}

draw();


