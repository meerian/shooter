import { canvasLocation } from "./main.js";
import { enemy } from "./enemy.js";

export function bulletCollide(bullet) {
    var current = canvasLocation[bullet.x * 2][bullet.y * 2];
    if (current instanceof enemy) {
        current.isAlive = false;
        canvasLocation[bullet.x * 2][bullet.y * 2] = 0;
        bullet.isAlive = false;
    }
}