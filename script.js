var Player = (function(window,undefined){

//window.Player = Player;

    //JavaScript private methods
    //http://stackoverflow.com/questions/55611/javascript-private-methods

    // Использовать паттерн Модуль
    // Прототип заменить на this

function Player (par) {
    // Функция проверки входных параметров
    //if (!this.check(par)) return false;
    this.init(par);
     var self = this;
     this.bindEvents();
}

    function create(par){
        return new Player(par);
    }

function init(par) {
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

    this.render();
}

Player.prototype.init = init;
Player.prototype.bindEvents = bindEvents;

// Методы
Player.prototype.render = render;
Player.prototype.renderInventory = renderInventory;
Player.prototype.renderHand = renderHand;

// Изменение персонажа
Player.prototype.setRace = setRace;
Player.prototype.setCharClass = setCharClass;
Player.prototype.setSex = setSex;
Player.prototype.updateLevel = updateLevel;

// Events
Player.prototype.doPlayerAction = doPlayerAction;
Player.prototype.selectCard = selectCard;
Player.prototype.doHandAction = doHandAction;

// Шмот
Player.prototype.addItem = addItem;
Player.prototype.getHandCount = getHandCount;
Player.prototype.getInventoryCount = getInventoryCount;
Player.prototype.clearInventory = clearInventory;
Player.prototype.sellInventoryItems = sellInventoryItems;
Player.prototype.wearItem = wearItem;
Player.prototype.checkItemCondition = checkItemCondition;
Player.prototype.checkSlot = checkSlot;
Player.prototype.checkBigItem = checkBigItem;
Player.prototype.removeSlot = removeSlot;

// Бой
Player.prototype.getPower = getPower;
Player.prototype.match = match;
Player.prototype.run = run;
Player.prototype.win = win;

function bindEvents(){

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
        console.log(this);
        console.log(self);
        self.doPlayerAction(event);
    });

    // Select card
    [].forEach.call(this.elem.querySelectorAll("ul.card-list"), function(el){
        el.addEventListener("click", function(event) {
            self.selectCard(event);
        });
    });

    // Hand Actions
    this.elem.querySelector(".hand-actions").addEventListener("click", function(event) {
        self.doHandAction(event);
    });
}

function render(){
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
}


function renderInventory(){
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
}

function renderHand(){
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
}

function doHandAction (event){
    console.log(event);
    var action = event.target.getAttribute('data-action');
    if (!action) return false;
    console.log(action);
    console.log(this.active);
    switch (action) {
        case 'itemDel':
            alert('itemDel: ' + this.active['hand']);
            //this.handDel(this.active['hand']);
            this.hand.splice(this.active['hand'], 1);
            this.renderHand();
            break;
        case 'itemWear':
            alert('itemWear: ' + this.active['hand']);
            break;
        default:
            alert('default');
    }
}

function doPlayerAction (event){
    var action = event.target.getAttribute('data-action');
    if (!action) return false;
    console.log(action);
    if(typeof this[action] == "function") {
        console.log("function");
        if (event.target.hasAttribute('data-action-item')) {
            var actionItem = event.target.getAttribute('data-action-item');
            console.log(actionItem);
            console.log(window[actionItem]);
            this[action](window[actionItem]);
        } else if (event.target.hasAttribute('data-action-options')) {
            var actionOptions = event.target.getAttribute('data-action-options');
            console.log(actionOptions);
            this[action](actionOptions);
        } else {
            this[action]();
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
            select.call(this, cardList);
            break;
        case 'hand' :
            select.call(this, cardList);
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
        var self = this;
        [].forEach.call(elCards, function(currentValue, index, array) {
            currentValue.className = currentValue.className.replace( /(?:^|\s)active(?!\S)/g , '' );
            if (currentValue == elItem) {
                console.log('active:  ', index);
                self.active[cardList] = index;
            }
        });
        elItem.classList.add('active');
        console.log(this.active);
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

function updateLevel(level){
    var old = this.level;
    this.level += +level;
    this.level = (this.level > 0) ? this.level : 1;
    console.log('Уровень изменен с ' + old + ' на ' + this.level);
    console.log(this);
    this.elem.querySelector('.level').innerText = this.level;
    this.getPower();
    return this;
}


function setRace(race){
    // При изменении расы или класса делаем проверку на наличие неподходящего шмота по расе/классу.
    // Сделать проверку по вещам подходящим в старой расе и снять их
    var old = this.race;
    this.race = race;
    console.log('Раса изменена с ' + old + ' на ' + this.race);
    console.log(this);
    this.elem.querySelector('.race').innerText = this.race;
    return this;
}

function setCharClass (charClass){
    var old = this.charClass;
    this.charClass = charClass;
    console.log('Класс изменен с ' + old + ' на ' + this.charClass);
    console.log(this);
    this.elem.querySelector('.charClass').innerText = this.charClass;
    return this;
}

function setSex(sex){
    var old = this.sex;
    this.sex = sex;
    console.log('Пол изменен с ' + old + ' на ' + this.sex);
    console.log(this);
    this.elem.querySelector('.sex').innerText = this.sex;
    return this;
}

// Инвентарь

function addItem(item){
    console.log(item);
    this.hand.push(item);
    console.log(this.hand);
    this.elem.querySelector('.handCount').innerText = this.hand.length;
    this.renderHand();
}

function getHandCount(){
    this.elem.querySelector('.handCount').innerText = this.hand.length;
    return this.hand.length;
}

function getInventoryCount(){
    this.elem.querySelector('.inventoryCount').innerText = this.inventory.length;
    return this.inventory.length;
}

function clearInventory(){
    console.log('Удаляем все из инвенторя');
    this.inventory = [];
    this.elem.querySelector('.inventoryCount').innerText = this.inventory.length;
}

function sellInventoryItems(arr){
    // Входящий параметр - индексы в массиве inventory
    // Считаем на какую сумму продает предметов
    var gold;
    // Удаляем индекс из inventory (сдвигаем)
    // Округляем до целого в меньшую степень
    // И если > 1, то прибавляем уровень
}

// Одеть предмет

function wearItem(item){
    console.log('wearItem  ', 'Собираемся одевать  ',item);
    if (this.checkItemCondition(item) && this.checkSlot(item) && this.checkBigItem(item) ) {
        console.log('wearItem  ', 'Все проверки прошли надеваем  ' ,item);
        this.inventory.push(item);
    }
    this.getPower();
    this.getInventoryCount();
    this.renderInventory();
}

function checkItemCondition(item){
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

}

function checkSlot(item){
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
}

function checkBigItem(item){
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
}

function removeSlot(slot){
    // Убрать предмет из слота slot
}
// Бой

function getPower(){
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
}

function match(monster){
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
}

function run(monster){
    if (monster.canRun(this)) {
        console.log('Можно не атаковать');
        return true;
    }
}

function win(moster){
    if (this.match(moster)) {
        this.updateLevel(moster.win.level);
        // Получить кол-во win.treasure
    }
}

//return Player;
return {
    create : create
}

})(window, undefined);