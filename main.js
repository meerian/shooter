import { addBullet, bulletLocationUpdate, drawBullets } from "./bullet.js";
import { addEnemy, drawEnemies, enemyLocationUpate } from "./enemy.js";
import { drawExperiences, experienceLocationUpate } from "./experience.js";
import { defaultUser,drawUser,userLocationUpdate } from "./user.js";

var canvas = document.getElementById("myCanvas");
var scoreboard = document.getElementById("Score");
var lives = document.getElementById("Lives");
var pauseButton = document.getElementById("Pause");
var ctx = canvas.getContext("2d");
var score = 0;
var pause = true;
export var canvasLocation = [];
for (var i = 0; i < canvas.height * 2; i++) {
    canvasLocation[i] = new Array(1000).fill(0);
}

pauseButton.onclick = function() {
    pauseButton.innerHTML = "Pause";
    pause = !pause;
};

function drawAll() {
    drawEnemies();
    drawBullets();
    drawUser();
    drawExperiences();
}

function startScore() {
    if (!pause) {
        score = score + 1;
        scoreboard.innerHTML = "Score: " + score;
    }
    setTimeout(startScore, 1000);
}

export function updateScore(x) {
    score += x;
    scoreboard.innerHTML = "Score: " + score;
}

function bulletAutofire() {
    addBullet(defaultUser.x, defaultUser.y, defaultUser.direction);
    setTimeout(bulletAutofire, 500);
}

function enemySpawnLocation() {
    if (!pause) {
        let check = Math.floor(Math.random() * 4 + 1);
        let x = 0;
        let y = 0;
        //Randomises enemy spawn location
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
    }
    let spawnTime = 10 + 1000 /  Math.log(score + 2);
    setTimeout(enemySpawnLocation, spawnTime);
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
    lives.innerHTML = "Lives: " + defaultUser.lives;
    ctx.fillText("Lives: " + defaultUser.lives, canvas.width - 65, 20);
}

function draw() {
    if (!pause) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height); //colours canvas white
        drawAll(); //draws all enemies, bullets and user
        drawValue(); //display score
        drawLives(); //display lives
        userLocationUpdate(); //updates user location based on keystrokes
        enemyLocationUpate(); //updates enemy location to next frame
        bulletLocationUpdate(); //updates bullet location to next frame
        experienceLocationUpate();
    }

    requestAnimationFrame(draw);
}

function start() {
    startScore();
    enemySpawnLocation();
    bulletAutofire();
    draw();
}

start();