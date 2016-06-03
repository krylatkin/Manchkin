var player1;

	describe("Создание и изменение персонажа", function() {

		// before(function() { alert("Начало тестов"); });
		// after(function() { alert("Конец тестов"); });

		// beforeEach(function() { alert("Вход в тест"); });
		// afterEach(function() { alert("Выход из теста"); });

		it("Создание игрока", function() {
			player1 = new Player({name: "PL1", sex: "male", elem:"#player1-holder"});
			assert.equal(player1.char.name, 'PL1');
			assert.equal(player1.char.sex, 'male');
			assert.equal(player1.char.race, 'human');
			assert.equal(player1.char.charClass, 'none');
		});

		it("Измение расы", function() {
			assert.equal(player1.setRace('elf').race, 'elf');
		});

		it("Измение класса", function() {
			assert.equal(player1.setCharClass('warrior').charClass, 'warrior');
		});

		it("Измение пола", function() {
			assert.equal(player1.setSex('female').sex, 'female');
		});
	});

	describe("Уровень", function() {

		it("Узнать уровень", function() {
			assert.equal(player1.char.level, 1);
		});

		it("Измение уровня на 2", function() {
			// player1.updateLevel(2);
			// assert.equal(player1.level, 3);
			assert.equal(player1.updateLevel(2).level, 3);
		});

		it("Измение уровня на -4", function() {
			assert.equal(player1.updateLevel(-4).level, 1);
		});
	});

	describe("Карты в руке", function() {

		it("Начальное кол-во", function() {
			assert.equal(player1.getHandCount(), 0);
		});

		it("Берем 2 карты", function() {
			player1.addItem(item1);
			player1.addItem(item2);
			assert.equal(player1.getHandCount(), 2);
		});

	});

	describe("Инвентарь", function() {

		it("Начальное кол-во", function() {
			assert.equal(player1.getInventoryCount(), 0);
		});

		it("Начальная мощность", function() {
			assert.equal(player1.getPower(), 1);
		});

		it("Увеличиваем уровень на 2 и проверяем мощность", function() {
			assert.equal(player1.updateLevel(2).getPower(), 3);
		});

		it("Одеваем шмотку. Проверяем кол-во", function() {
			player1.wearItem(item1);
			assert.equal(player1.getInventoryCount(), 1);
		});

		it("Перепроверяем мощность +2", function() {
			assert.equal(player1.getPower(), 5);
		});

		describe("Проверка шмота с условиями классов и рас", function() {
			it("Одеваем шмотку. Только для эльфа. Мы эльфы. Проверяем кол-во", function() {
				player1.wearItem(item2);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Перепроверяем мощность +5", function() {
				assert.equal(player1.getPower(), 10);
			});
			it("Меняем расу. Пробуем надеться шмотку для эльфа. Проверяем кол-во", function() {
				player1.setRace('human');
				player1.wearItem(item2);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Пробуем надеться шмотку для wizard. Проверяем кол-во", function() {
				player1.wearItem(item3);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Меняем класс на wizard. Пробуем надеться шмотку для wizard. Проверяем кол-во", function() {
				player1.setCharClass('wizard');
				player1.wearItem(item3);
				assert.equal(player1.getInventoryCount(), 3);
			});
			it("Перепроверяем мощность +15", function() {
				assert.equal(player1.getPower(), 25);
			});
		});

		describe("Проверка шмота со слотами", function() {
			it("Одеваем бронник", function() {
				player1.wearItem(armor1);
				assert.equal(player1.getInventoryCount(), 4);
				assert.equal(player1.getPower(), 27);
			});
			it("Одеваем бронник еще раз. На этот раз не получится.", function() {
				player1.wearItem(armor1);
				assert.equal(player1.getInventoryCount(), 4);
				assert.equal(player1.getPower(), 27);
			});
			it("Одеваем двуручное оружие", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 5);
			});
			it("Одеваем двуручное оружие еще раз. На этот раз не получится.", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 5);
			});
			it("Одеваем большой предмет", function() {
				player1.wearItem(big1);
				assert.equal(player1.getInventoryCount(), 6);
			});
			it("Одеваем большой предмет еще раз. На этот раз не получится.", function() {
				player1.wearItem(big2);
				assert.equal(player1.getInventoryCount(), 6);
			});
			it("Меняем расу на Дварф. И одеваем большой предмет еще 2 раза.", function() {
				player1.setRace('dwarf');
				player1.wearItem(big2);
				player1.wearItem(big2);
				assert.equal(player1.getInventoryCount(), 8);
			});
			it("Очищаем весь инвентарь", function() {
				player1.clearInventory();
				assert.equal(player1.getInventoryCount(), 0);
				assert.equal(player1.getPower(), player1.char.level);
			});
			it("Одеваем одноручное оружие", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 1);
			});
			it("Одеваем одноручное оружие. Второй раз можно", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Одеваем одноручное оружие. Третий раз уже нельзя", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Одеваем двуручное оружие. В руках уже 2 оружия. Неполучится.", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 2);
			});
			it("Очищаем весь инвентарь", function() {
				player1.clearInventory();
				assert.equal(player1.getInventoryCount(), 0);
				assert.equal(player1.getPower(), player1.char.level);
			});
			it("Одеваем двуручное оружие", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 1);
			});

			it("Одеваем одноручное оружие. Уже одето двуручное. Поэтому не получится", function() {
				// console.clear();
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 1);
			});
			it("Очищаем весь инвентарь", function() {
				player1.clearInventory();
				assert.equal(player1.getInventoryCount(), 0);
				assert.equal(player1.getPower(), player1.char.level);
			});
			it("Одеваем одноручное оружие", function() {
				player1.wearItem(hand1);
				assert.equal(player1.getInventoryCount(), 1);
			});
			it("Одеваем двуручное оружие. В руках 1 оружие, но все равно неполучится.", function() {
				player1.wearItem(twohand1);
				assert.equal(player1.getInventoryCount(), 1);
			});

		});

	});

	describe("Сражение с монстром", function() {
		player2 = new Player({name: "PL2", elem:"#player2-holder"});

		it("Сравнить Player2 силы с Monster 1. Уровень 1 без шмота. Не справимся", function() {
			assert.equal(player2.match(monster1), false);
		});
		it("Сравнить Player2 силы с Monster 1. Оденем и попробуем еще.", function() {
			player2.wearItem(item4);
			assert.equal(player2.match(monster1), true);
		});
		it("Сравнить Player1 силы с Monster 1", function() {
			assert.equal(player1.match(monster1), true);
		});
		it("Сравнить Player1 силы с Monster 2", function() {
			assert.equal(player1.match(monster1), true);
		});
		it("Победить Monster 2", function() {
			player1.win(monster1);
			assert.equal(player1.char.level, 5);
			// Получить кол-во win.treasure
		});
		it("Победить Monster 2. Player2 не справиться.", function() {
			player2.win(monster2);
			assert.equal(player2.char.level, 1);
		});
	});