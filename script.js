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

    this.inventoryCl = new Inventory(this);
    this.handCl = new Hand(this);

    this.render = function(){
        this.elem.querySelector('.name').textContent  = this.name;
        this.elem.querySelector('.level').textContent  = this.level;
        this.elem.querySelector('.race').innerText = this.race;
        this.elem.querySelector('.charClass').innerText = this.charClass;
        this.elem.querySelector('.sex').innerText = this.sex;
        this.getPower(); //this.elem.querySelector('.power').innerText = this.power;
        this.inventoryCl.renderHand();
        this.handCl.renderHand();
    };

    // События
    var self = this;


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
             self.handCl.doHandAction(event);
         }

         return false;
     };

/*
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
        //doHandAction(event);
        self.handCl.doHandAction(event);
    });
*/

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
                self.inventoryCl.select(event, elCardList, cardList);
                break;
            case 'hand' :
                self.handCl.select(event, elCardList, cardList);
                break;
            default:
                alert( 'default' );
                return false;
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
        this.handCl.add(item);
        this.handCl.renderHand();
    };
    // Одеть предмет
    this.wearItem = function (item){
        console.log('wearItem  ', 'Собираемся одевать  ',item);
        if (this.inventoryCl.tryToWear(item)) {
            console.log('wearItem  ', 'Все проверки прошли надеваем  ' ,item);
            this.inventoryCl.add(item);
        }
        this.getPower();
        this.inventoryCl.renderHand();
    };

    // Бой
    this.getPower = function(){
        var power = this.level + this.inventoryCl.getPower();
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

    // Для тестов
    this.getInventoryCount = function(){
        return this.inventoryCl.length();
    };

    this.getHandCount = function(){
        return this.handCl.length();
    };
    this.clearInventory = function(){
        this.inventoryCl.clearInventory();
    };
}