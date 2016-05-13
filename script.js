function Player (par) {
    // DOM
    if (par.elem === undefined) throw new Error("Не задан DOM Element");
    // this.elem = document.getElementById(par.elem);
    this.elem = document.querySelector(par.elem);
    console.log(this.elem);
    if (this.elem === null) throw new Error("Элемент отсутствует в DOM");

    // Свойства
    this.name = par.name || "Player";
    this.sex = par.sex || "male";
    this.level = 1;
    this.race = 'human';
    this.charClass = 'none';
    this.inventory = [];
    //this.inventoryActive = -1;
    this.hand = [];
    //this.handActive = -1;
    this.active = {};

    this.render = function(){
        this.elem.querySelector('.name').textContent  = this.name;
        this.elem.querySelector('.level').textContent  = this.level;
        this.elem.querySelector('.race').innerText = this.race;
        this.elem.querySelector('.charClass').innerText = this.charClass;
        this.elem.querySelector('.sex').innerText = this.sex;
        this.getPower(); //this.elem.querySelector('.power').innerText = this.power;
        this.elem.querySelector('.handCount').innerText = this.hand.length;
        this.elem.querySelector('.inventoryCount').innerText = this.inventory.length;
        this.renderInventory();
        this.renderHand();
    };

    this.renderInventory = function(){
        var items = this.inventory.map(function(item, index, array){
            //var html =
            return '<li class="item inventory-item" data-card="' + item.id + '" data-from="inventory">'
                //+ '<p>Name: Name</p>'
                + '<b>' + item.name + '</b>'
                +' <p>Level: 1</p>'
                +' <p>Power: ' + item.power + '</p>'
                + '<p>Gold: ' + item.gold + '</p>'
            +'</li>';
            //return html;
        });
        console.log(items);
        this.elem.querySelector('.inventory-list').innerHTML = items.join('');
    };

    this.renderHand = function(){
        var items = this.hand.map(function(item, index, array){
            return '<li class="item hand-item" data-card="' + item.id + '" data-from="hand">'
            + '<b>' + item.name + '</b>'
            +' <p>Level: 1</p>'
            +' <p>Power: ' + item.power + '</p>'
            + '<p>Gold: ' + item.gold + '</p>'
            +'</li>';
        });
        console.log(items);
        this.elem.querySelector('.hand-list').innerHTML = items.join('');
    };


    // События
    var self = this;

    /*
     this.elem.onclick = function(event){
     console.log(event.target);

     // Player Actions
     if (event.target.closest('.player-actions')) {
     doPlayerAction(event);
     }

     // Select card
     if (event.target.closest('ul.card-list')) {
     selectCard(event);
     }

     // Hand Actions
     if (event.target.closest('.hand-actions')) {
     doHandAction(event);
     }

     return false;
     };
     */

    // https://davidwalsh.name/event-delegate
    // Player Actions
    this.elem.querySelector(".player-actions").addEventListener("click", function(event) {
        doPlayerAction(event);
    });

    // Select card
    [].forEach.call(this.elem.querySelectorAll("ul.card-list"), function(el){
        el.addEventListener("click", function(event) {
            selectCard(event);
        });
    });

    // Hand Actions
    this.elem.querySelector(".hand-actions").addEventListener("click", function(event) {
        doHandAction(event);
    });

    function doHandAction (event){
        console.log(event);
        var action = event.target.getAttribute('data-action');
        if (!action) return false;
        console.log(action);
        console.log(self.active);
        switch (action) {
            case 'itemDel':
                alert('itemDel: ' + self.active['hand']);
                //self.handDel(self.active['hand']);
                self.hand.splice(self.active['hand'], 1);
                self.renderHand();
                break;
            case 'itemWear':
                alert('itemWear: ' + self.active['hand']);
                break;
            default:
                alert('default');
        }
    }

    function doPlayerAction (event){
        var action = event.target.getAttribute('data-action');
        if (!action) return false;
        console.log(action);
        if(typeof self[action] == "function") {
            console.log("function");
            if (event.target.hasAttribute('data-action-item')) {
                var actionItem = event.target.getAttribute('data-action-item');
                console.log(actionItem);
                console.log(window[actionItem]);
                self[action](window[actionItem]);
            } else if (event.target.hasAttribute('data-action-options')) {
                var actionOptions = event.target.getAttribute('data-action-options');
                console.log(actionOptions);
                self[action](actionOptions);
            } else {
                self[action]();
            }
        }
    }

    function selectCard (event) {
        //console.log(event);
        var elCardList = event.target.closest('ul.card-list');
        console.log(elCardList);
        //var cardList = elCardList.hasAttribute('data-list') ? elCardList.getAttribute('data-list') : undefined;
        var cardList = elCardList.getAttribute('data-list');
        if (!cardList) return false;

        // Определяем из какого списка карта
        switch (cardList) {
            case 'inventory':
                select(cardList);
                break;
            case 'hand' :
                select(cardList);
                break;
            default:
                alert( 'default' );
                return false;
        }

        function select(cardList) {
            console.log(cardList);
            // Определяем э лемент карты
            var elItem = event.target.closest('.item');
            console.log(elItem);

            // Определяем карту
            //var card = elItem.hasAttribute('data-card') ? elItem.getAttribute('data-card') : undefined;
            var card = elItem.getAttribute('data-card');
            console.log(window[card]);

            // Установка состояния активности
            var elCards = elCardList.querySelectorAll('.item');
            [].forEach.call(elCards, function(currentValue, index, array) {
                currentValue.className = currentValue.className.replace( /(?:^|\s)active(?!\S)/g , '' );
                if (currentValue == elItem) {
                    console.log('active:  ', index);
                    self.active[cardList] = index;
                }
            });
            elItem.classList.add('active');
            console.log(self.active);
        }
    }

    // Behavior
    // https://learn.javascript.ru/behavior
    // document.onclick = function(event) {
    // 	if (!event.target.hasAttribute('data-counter')) return;

    // 	var counter = event.target;

    // 	counter.innerHTML++;
    // };


    // Изменение персонажа
    this.updateLevel = function(level){
        var old = this.level;
        this.level += +level;
        this.level = (this.level > 0) ? this.level : 1;
        console.log('Уровень изменен с ' + old + ' на ' + this.level);
        console.log(this);
        this.elem.querySelector('.level').innerText = this.level;
        this.getPower();
        return this;
    };
    this.setRace = function(race){
        // При изменении расы или класса делаем проверку на наличие неподходящего шмота по расе/классу.
        // Сделать проверку по вещам подходящим в старой расе и снять их
        var old = this.race;
        this.race = race;
        console.log('Раса изменена с ' + old + ' на ' + this.race);
        console.log(this);
        this.elem.querySelector('.race').innerText = this.race;
        return this;
    };
    this.setCharClass = function(charClass){
        var old = this.charClass;
        this.charClass = charClass;
        console.log('Класс изменен с ' + old + ' на ' + this.charClass);
        console.log(this);
        this.elem.querySelector('.charClass').innerText = this.charClass;
        return this;
    };
    this.setSex = function(sex){
        var old = this.sex;
        this.sex = sex;
        console.log('Пол изменен с ' + old + ' на ' + this.sex);
        console.log(this);
        this.elem.querySelector('.sex').innerText = this.sex;
        return this;
    };

    // Инвентарь
    this.addItem = function(item){
        console.log(item);
        this.hand.push(item);
        console.log(this.hand);
        this.elem.querySelector('.handCount').innerText = this.hand.length;
        this.renderHand();
    };
    this.getHandCount = function(){
        this.elem.querySelector('.handCount').innerText = this.hand.length;
        return this.hand.length;
    };
    this.getInventoryCount = function(){
        this.elem.querySelector('.inventoryCount').innerText = this.inventory.length;
        return this.inventory.length;
    };
    this.clearInventory = function(){
        console.log('Удаляем все из инвенторя');
        this.inventory = [];
        this.elem.querySelector('.inventoryCount').innerText = this.inventory.length;
    };
    this.sellInventoryItems = function(arr){
        // Входящий параметр - индексы в массиве inventory
        // Считаем на какую сумму продает предметов
        var gold;
        // Удаляем индекс из inventory (сдвигаем)
        // Округляем до целого в меньшую степень
        // И если > 1, то прибавляем уровень
    };

    // Одеть предмет
    this.wearItem = function (item){
        console.log('wearItem  ', 'Собираемся одевать  ',item);
        if (this.checkItemCondition(item) && this.checkSlot(item) && this.checkBigItem(item) ) {
            console.log('wearItem  ', 'Все проверки прошли надеваем  ' ,item);
            this.inventory.push(item);
        }
        this.getPower();
        this.getInventoryCount();
        this.renderInventory();
    };
    this.checkItemCondition = function(item){
        if (typeof item.condition === 'function') {
            console.log('Есть условия на шмотку');
            if ( item.condition(this) ) {
                console.log('Условия пройдены. Нам подходит!');
                return true;
            } else {
                console.log('Условия не пройдены.');
                return false;
            }
        } else {
            console.log('Условий нет.');
            return true;
        }

    };
    this.checkSlot = function(item){
        if (item.slot) {
            console.log('Шмотка занимает слот. Нужна проверка.');

            var handSlots = 0;
            // Перебираем player1.inventory на наличие slot == item.slot
            var notEmptySlot = player1.inventory.some(function(currentValue, index, array){
                if (currentValue.slot == 'hand' || currentValue.slot == 'twohand' ) {
                    handSlots += item.slot == 'hand' ? 1 : 0;
                    handSlots += item.slot == 'twohand' ? 2 : 0;

                    if (currentValue.slot == 'twohand') {
                        handSlots += 2;
                    }
                    if (handSlots < 2) {
                        handSlots++;
                        return false;
                    } else return true; //currentValue.slot == item.slot;
                }
                return currentValue.slot == item.slot;
            });
            if (notEmptySlot) {
                console.log('Слот уже занят');
                return false;
            } else {
                console.log('Слот позволяет надеть');
            }
        }

        return true;
    };
    this.checkBigItem = function(item){
        if (item.big) {
            console.log('Большая шмотка. Нужна проверка.');
            if (this.race == 'dwarf') {
                console.log('checkBigItem  ', 'Dwarf может одевать неограниченное кол-во больших шмоток')
                return true;
            }

            // Перебираем player1.inventory на наличие  item.big == true
            var bigIndex;
            var hasBigItem = player1.inventory.some(function(currentValue, index, array){
                bigIndex = index;
                return currentValue.big;
            });
            if (hasBigItem) {
                console.log('Уже есть большая шмотка', bigIndex, player1.inventory[bigIndex]);
                return false;
            } else {
                console.log('Больших шмоток еще не надето');
            }
        }

        return true;
    };
    this.removeSlot = function(slot){
        // Убрать предмет из слота slot
    };
    // Бой
    this.getPower = function(){
        // Суммируем все power от вещей в this.inventory
        var power = this.level;
        console.log('inventory  ',this.inventory);
        this.inventory.forEach(function(currentValue, index, array){
            if (currentValue.power) {
                power += currentValue.power;
            }
        });
        console.log('power  ', power);
        this.elem.querySelector('.power').innerText = power;
        return power;
    };
    this.match = function(monster){
        var monsterPower = monster.level + monster.conditionalPower(this);
        var playerPower = this.getPower();
        console.log('match', monsterPower + ' vs ' + playerPower );
        if (this.charClass == 'warrior' ? playerPower >= monsterPower : playerPower > monsterPower ) {
            console.log('Побеждаем');
            return true;
        } else {
            console.log('Проигрываем');
            return false;
        }
    };
    this.run = function(monster){
        if (monster.canRun(this)) {
            console.log('Можно не атаковать');
            return true;
        }
    };
    this.win = function(moster){
        if (this.match(moster)) {
            this.updateLevel(moster.win.level);
            // Получить кол-во win.treasure
        }
    };
    this.render();
}