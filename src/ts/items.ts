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
	condition: function (char) {
		if (char.race == 'elf') {
			return true;
		} else {
            char.player.log('danger', 'Only for Elf');
			return false;
		}
	}
};
var item3 = {
    id: "item3",
	name: "Item 3",
	power: 15,
	gold: 900,
	condition: function (char) {
		if (char.charClass == 'wizard') {
			return true;
		} else {
            char.player.log('danger', 'Only for Wizard');
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
	conditionalPower: function(char){
		if (char.race == 'elf') {
            char.player.log('info', 'Against Elf stronger on 6 points');
			return 6;
		}
		return 0
	},
	canRun: function(char){

	},
	win: {
		level : 2,
		treasure: 2
	},
	lose: function (char){
        char.updateLevel(-1);
	}
};
var monster2 = {
    id: "monster2",
	name: "Monster 2",
	level: 13,
	conditionalPower: function(char){
		return 0
	},
	canRun: function(char){
		if (char.level < 5) {
            char.player.log('info', 'Characters at level 5 and below could not to fight with this monster');
			return true;
		}
	},
	win: {
		level : 2,
		treasure: 2
	},
	lose: function (char){
        char.updateLevel(-1);
	}
};