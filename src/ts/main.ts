///<reference path='player.ts'/>
///<reference path='game-log.ts'/>
///<reference path='items.ts'/>



/* Set DOM Element for GameLog Singleton */
App.GameLog.getInstance({elem: "#log"});

/* Clone Player DOM Element */
var newPlayerEl:Element = <Element>document.getElementById("player1-holder").cloneNode(true);
newPlayerEl.setAttribute("id", "player2-holder");
document.getElementById("players").appendChild(newPlayerEl);


/* Create player classes and make some actions with them */
var player1 = new App.Player({name: "Player 1", elem: "#player1-holder"});
player1.updateLevel(2);
player1.wearItem(item1);
player1.wearItem(item1);
player1.wearItem(item4);
player1.addItem(item1);
player1.addItem(item2);

var player2 = new App.Player({name: "Player 2", elem: "#player2-holder", sex: "female"});
player2.wearItem(item4);
player2.wearItem(item1);
player2.addItem(item2);
player2.addItem(item3);
