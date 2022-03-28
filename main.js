import { addBullet, bulletLocationUpdate } from "./bullet.js";
import { addEnemy, enemyLocationUpate } from "./enemy.js";
import { defaultUser,userLocationUpdate } from "./user.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var score = 0;
var startTime = new Date().getTime();
export var canvasLocation = [];
for (var i = 0; i < canvas.height * 2; i++) {
    canvasLocation[i] = new Array(1000).fill(0);
}

function drawAll() {
    for (var i = 0; i < canvasLocation.length; i++) {
        for (var j = 0; j < canvasLocation[0].length; j++) {
            if (canvasLocation[i][j] != 0) {
                canvasLocation[i][j].draw();
            }
        }
    }
}

function startScore() {
    var cur = new Date().getTime();
    score = Math.floor((cur - startTime) / 1000);
    setTimeout(startScore, 100);
}

export function updateScore(x) {
    score += x;
}

function bulletAutofire() {
    addBullet(defaultUser.x, defaultUser.y, defaultUser.direction);
    setTimeout(bulletAutofire, 500);
}

function enemySpawnLocation() {
    var check = Math.floor(Math.random() * 4 + 1);
    var x = 0;
    var y = 0;
    switch(check) {
        case 1:
            x = Math.floor(Math.random() * (canvas.width - 1));
            break;
        case 2:
            y = Math.floor(Math.random() * (canvas.width - 1));
            break;
        case 3:
            x = Math.floor(Math.random() * (canvas.width - 1));
            y = canvas.width - 1;
            break;
        case 4:
            x = canvas.width - 1;
            y = Math.floor(Math.random() * (canvas.width - 1));
            break;
    }
    addEnemy(x, y);
    setTimeout(enemySpawnLocation, 1000);
}

export function endGame() {
    alert("YOU LOSE! Your score is: " + score);
    document.location.reload();
}

function drawValue() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score:" + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + defaultUser.lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas
    drawAll(); //updates all locations
    drawValue();
    drawLives();
    userLocationUpdate(); //updates user location based on keystrokes
    enemyLocationUpate(); //updates enemy location to next frame
    bulletLocationUpdate(); //updates bullet location to next frame

    requestAnimationFrame(draw);
}

function start() {
    startScore();
    enemySpawnLocation();
    bulletAutofire();
    draw();
}

start();