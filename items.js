var item1 = {
    id: "item1",
	name: "Item 1",
	power: 2,
	gold: 200
};
var item2 = {
    id: "item2",
	name: "Item 2",
	power: 5,
	gold: 200,
	condition: function (player) {
		// console.log(player);
		if (player.race == 'elf') {
			return true;			
		} else {
			console.log('Только для elf');
			return false;
		}
	}
};
var item3 = {
    id: "item3",
	name: "Item 3",
	power: 15,
	gold: 900,
	condition: function (player) {
		// console.log(player);
		if (player.charClass == 'wizard') {
			return true;			
		} else {
			console.log('Только для wizard');
			return false;
		}
	}
};
var item4 = {
	id: "item4",
    name: "Item 4",
	power: 6,
	gold: 700
};
var head1 = {
    id: "head1",
	name: "Head 1",
	power: 2,
	gold: 200,
	slot: 'head'
};
var armor1 = {
    id: "armor1",
	name: "Armor 1",
	power: 2,
	gold: 200,
	slot: 'armor'
};
var armor2 = {
    id: "armor2",
	name: "Armor 2",
	power: 3,
	gold: 200,
	slot: 'armor'
};
var hand1 = {
    id: "hand1",
	name: "Hand 1",
	power: 3,
	gold: 200,
	slot: 'hand'
};
var hand2 = {
    id: "hand2",
	name: "Hand 2",
	power: 3,
	gold: 200,
	slot: 'hand'
};
var twohand1 = {
    id: "twohand1",
	name: "Twohand 1",
	power: 3,
	gold: 200,
	slot: 'twohand'
};
var big1 = {
    id: "head1",
	name: "Big 1",
	power: 3,
	gold: 200,
	big: true
};
var big2 = {
    id: "big2",
	name: "Big 2",
	power: 3,
	gold: 200,
	big: true
};
var bigHand1 = {
    id: "bigHand1",
	name: "Big 	Hand 1",
	power: 3,
	gold: 200,
	slot: 'hand',
	big: true
};

var monster1 = {
    id: "monster1",
	name: "Monster 1",
	level: 2,
	conditionalPower: function(player){
		if (player.race == 'elf') {
			console.log('Против elf сила на 6 больше');
			return 6;
		}
		return 0
	},
	canRun: function(player){

	},
	win: {
		level : 2,
		treasure: 2
	},
	lose: function (player){
		player.updateLevel(-1);
	}
};
var monster2 = {
    id: "monster2",
	name: "Monster 2",
	level: 13,
	conditionalPower: function(player){
		return 0
	},
	canRun: function(player){
		if (player.level < 5) {
			console.log('Монстр не преследует персонажей меньше 5 уровня');
			return true;
		}
	},
	win: {
		level : 2,
		treasure: 2
	},
	lose: function (player){
		player.updateLevel(-1);
	}
};