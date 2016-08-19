var player1;

	describe("Player. Create and Change", function() {

		it("Create and Customise Player ", function() {
			player1 = new App.Player({name: "PL1", sex: "male", elem:"#player1-holder"});
			assert.equal(player1.char.name, 'PL1');
			assert.equal(player1.char.sex, 'male');
			assert.equal(player1.char.race, 'human');
			assert.equal(player1.char.charClass, 'none');
		});

		it("Change Race", function() {
			assert.equal(player1.setRace('elf').race, 'elf');
		});

		it("Change Class", function() {
			assert.equal(player1.setCharClass('warrior').charClass, 'warrior');
		});

		it("Change Sex", function() {
			assert.equal(player1.setSex('female').sex, 'female');
		});
	});

	describe("Player's Level", function() {

		it("Get Level", function() {
			assert.equal(player1.char.level, 1);
		});

		it("Set Level + 2", function() {
			// player1.updateLevel(2);
			// assert.equal(player1.level, 3);
			assert.equal(player1.updateLevel(2).level, 3);
		});

		it("Set level -4", function() {
			assert.equal(player1.updateLevel(-4).level, 1);
		});
	});

	describe("Cards in Hand", function() {

		it("Initial count", function() {
			assert.equal(player1.getHandCount(), 0);
		});

		it("Take 2 cards", function() {
			player1.addItem(item1);
			player1.addItem(item2);
			assert.equal(player1.getHandCount(), 2);
		});

	});

	describe("Cards in Inventory", function() {

		it("Initial count", function() {
			assert.equal(player1.getInventoryCount(), 0);
		});

		it("Initial Power", function() {
			assert.equal(player1.getPower(), 1);
		});

		it("Set Level + 2 and Get Power", function() {
			assert.equal(player1.updateLevel(2).getPower(), 3);
		});

		it("Wear clothes. Get count of clothes", function() {
			player1.wearItem(item1);
			assert.equal(player1.getInventoryCount(), 1);
		});

		it("Check Power. Must be + 2", function() {
			assert.equal(player1.getPower(), 5);
		});

		describe("Try to wear clothes with Class / Race conditions", function() {
            it("Elf only. We are Elf", function() {
				player1.wearItem(item2);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Check Power. Must be + 5", function() {
				assert.equal(player1.getPower(), 10);
			});
			it("Change Race. We are not Elf. Elf only. Get count of clothes", function() {
				player1.setRace('human');
				player1.wearItem(item2);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Wizard only. Get count of clothes", function() {
				player1.wearItem(item3);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Change Class to Wizard. Wizard only. Get count of clothes", function() {
				player1.setCharClass('wizard');
				player1.wearItem(item3);
				assert.equal(player1.getInventoryCount(), 3);
			});
			it("Check Power. Must be + 15", function() {
				assert.equal(player1.getPower(), 25);
			});
		});

		describe("Try to wear clothes with Slot conditions", function() {
			it("Armor", function() {
				player1.wearItem(armor1);
				assert.equal(player1.getInventoryCount(), 4);
				assert.equal(player1.getPower(), 27);
			});
			it("Armor one more time. At this time we can't", function() {
				player1.wearItem(armor1);
				assert.equal(player1.getInventoryCount(), 4);
				assert.equal(player1.getPower(), 27);
			});
			it("Two-hand weapon", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 5);
			});
			it("Two-hand weapon one more time. At this time we can't", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 5);
			});
			it("Big clothes", function() {
				player1.wearItem(big1);
				assert.equal(player1.getInventoryCount(), 6);
			});
			it("Big clothes. At this time we can't", function() {
				player1.wearItem(big2);
				assert.equal(player1.getInventoryCount(), 6);
			});
			it("Change Race to Dwarf. And we can wear Big clothes two more times", function() {
				player1.setRace('dwarf');
				player1.wearItem(big2);
				player1.wearItem(big2);
				assert.equal(player1.getInventoryCount(), 8);
			});
			it("Clear Inventory", function() {
				player1.clearInventory();
				assert.equal(player1.getInventoryCount(), 0);
				assert.equal(player1.getPower(), player1.char.level);
			});
			it("One-hand weapon", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 1);
			});
			it("One-hand weapon. We can second time", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("One-hand weapon. We cannot third time", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Two-hand weapon. We have already worn 2 One-hand weapons. We can't", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Clear Inventory", function() {
				player1.clearInventory();
				assert.equal(player1.getInventoryCount(), 0);
				assert.equal(player1.getPower(), player1.char.level);
			});
			it("Two-hand weapon", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 1);
			});

			it("One-hand weapon. We have already worn Two-hand weapon. We can't", function() {
				// console.clear();
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 1);
			});
			it("Clear Inventory", function() {
				player1.clearInventory();
				assert.equal(player1.getInventoryCount(), 0);
				assert.equal(player1.getPower(), player1.char.level);
			});
			it("One-hand weapon", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 1);
			});
			it("Two-hand weapon. We have already worn One-hand weapon. We can't.", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 1);
			});

		});

	});

	describe("Fight Monster. Compare Power.", function() {
		player2 = new App.Player({name: "PL2", elem:"#player2-holder"});

		it("Compare Player2 with Monster 1. Level 1 w/o clothes. We can't", function() {
			assert.equal(player2.match(monster1), false);
		});
		it("Compare Player2 with Monster 1. With clothes we can", function() {
			player2.wearItem(item4);
			assert.equal(player2.match(monster1), true);
		});
		it("Compare Player1 with Monster 1. We can", function() {
			assert.equal(player1.match(monster1), true);
		});
		it("Compare Player1 with Monster 2. We can", function() {
			assert.equal(player1.match(monster1), true);
		});
		it("Player1 defeat Monster 2. And Get Level + 2", function() {
			player1.win(monster1);
			assert.equal(player1.char.level, 5);
            // Get treasures in amount of monster.win.treasure
		});
		it("Player2 defeat Monster 2. We can't. Level don't changed.", function() {
			player2.win(monster2);
			assert.equal(player2.char.level, 1);
		});
	});