///<reference path='player.ts'/>
console.log('first');
var player1 = new App.Player({name: "PL1", elem:"#player1-holder"});
// player1.render();
console.log(player1);
player1.updateLevel(2);
player1.wearItem(item1);
player1.wearItem(item1);
player1.wearItem(item4);
player1.addItem(item1);
player1.addItem(item2);