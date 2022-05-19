import { pauseGame, resumeGame } from "../handlers/gameplayHandler.js";
import { parseRelic } from "../handlers/relicHandler.js"

// -------------------------------------------------------------------------------

class relicPage extends page {
    constructor() {
        super(relicContainer);
        this.relics = [];
    }

    init() {
        curPage.chooseRelics();
        curPage.createPage();
        curPage.stage();
    }

    //Randomly chooses 3 upgrades
    chooseRelics() {
        let counter = 3;
        while (counter > 0) {
            let check = Math.floor(Math.random() * 3 + 1);
            if (!this.relics.includes(check)) {
                this.relics.push(check);
                counter--;
            }
        }
        for (let i = 0; i < this.relics.length; i++) {
            this.relics[i] = parseRelic(this.relics[i], relicContainer);
        }
    }

    createPage() {
        let x = app.renderer.height / 2;
        let y = app.renderer.width / 3;
        while (this.relics[0]) {
            let curRec = this.relics.pop();

            //Create relicBox
            let box = new PIXI.Sprite(new PIXI.Texture.from('images/relic_textbox.png'));
            box.x = x;
            box.y = y;
            box.anchor.set(0.5);
            box.interactive = true;
            box.click = function () { addRelic(curRec); }
            box.on("mouseover", function (event) {
                curRec.showDescription();
            });

            box.on("mouseout", function (event) {
                curRec.hideDescription();
            });
            this.container.addChild(box);

            //Create relic image
            curRec.drawRelic(x, y);

            //Creates the text
            drawText(new PIXI.Text(curRec.getName(), textStyle), x + 22, y, this.container);
            y = y + app.renderer.width / 6;
        }

        //Create relicDescBox
        let descBox = new PIXI.Graphics();
        descBox.lineStyle(2, 0x235823, 1);
        descBox.beginFill(0xFCFBE4);
        descBox.drawRect(x - 200, y - 50, 400, 100);
        descBox.endFill();
        this.container.addChild(descBox);
    }
}

// -------------------------------------------------------------------------------

//Variables
const relicContainer = new PIXI.Container();
var curPage = 0;

// -------------------------------------------------------------------------------

export function relicHandler() {
    pauseGame();
    curPage = new relicPage();
    curPage.init();
}

//Parse upgrade and apply based on choice selected
function addRelic(relic) {
    relic.add();
    curPage.cleanup();
    resumeGame();
}
