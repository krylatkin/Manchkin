function Inventory (player){
    this.player = player;
    this.hand = []; // this.cards = [];
    // Активная карта
    this.active = undefined;
    //alert('inventory');

    //var self = this;
}

Inventory.prototype.renderHand = function(){
    var self = this;

    var items = this.hand.map(function(item, index, array){

        // Помечаем активную карту
        var stateClass = (index == self.active) ? ' active' : '';

        return '<li class="item inventory-item hand-item '+ stateClass +' " data-card="' + item.id + '" data-from="hand">'
        + '<b>' + item.name + '</b>'
        +' <p>Level: 1</p>'
        +' <p>Power: ' + item.power + '</p>'
        + '<p>Gold: ' + item.gold + '</p>'
        +'</li>';
    });

    console.log(items);

    console.log(this);
    this.player.elem.querySelector('.inventory-list').innerHTML = items.join('');
    this.player.elem.querySelector('.inventoryCount').innerText = this.length();
};

Inventory.prototype.add = function(item){
    this.hand.push(item);
};

Inventory.prototype.length = function(){
    return this.hand.length;
};

Inventory.prototype.select = function(event, elCardList, cardList){
    var self = this;

    console.log(cardList);
    // Определяем элемент карты
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
            //self.active[cardList] = index;
            console.log(self);
            self.active = index;
        }
    });
    elItem.classList.add('active');
    console.log(self.active);
};

Inventory.prototype.getPower = function(){
    // Суммируем все power от вещей в this.inventory
    var power = 0;
    this.hand.forEach(function(currentValue, index, array){
        if (currentValue.power) {
            power += currentValue.power;
        }
    });
    console.log('power  ', power);
    this.player.elem.querySelector('.power').innerText = power;
    return power;
};

Inventory.prototype.tryToWear = function(item){
    return this.checkItemCondition(item) && this.checkSlot(item) && this.checkBigItem(item);
};

Inventory.prototype.checkItemCondition = function(item){
    if (typeof item.condition === 'function') {
        console.log('Есть условия на шмотку');
        if ( item.condition(this.player.char) ) {
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

Inventory.prototype.checkSlot = function(item){
    if (item.slot) {
        console.log('Шмотка занимает слот. Нужна проверка.');

        var handSlots = 0;
        // Перебираем player1.inventory на наличие slot == item.slot
        var notEmptySlot = this.hand.some(function(currentValue, index, array){
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
Inventory.prototype.checkBigItem = function(item){
    if (item.big) {
        console.log('Большая шмотка. Нужна проверка.');
        if (this.player.char.race == 'dwarf') {
            console.log('checkBigItem  ', 'Dwarf может одевать неограниченное кол-во больших шмоток');
            return true;
        }

        // Перебираем player1.inventory на наличие  item.big == true
        var bigIndex;
        var hasBigItem = this.hand.some(function(currentValue, index, array){
            bigIndex = index;
            return currentValue.big;
        });
        if (hasBigItem) {
            console.log('Уже есть большая шмотка', bigIndex, this.hand[bigIndex]);
            return false;
        } else {
            console.log('Больших шмоток еще не надето');
        }
    }

    return true;
};


/*
Inventory.prototype.removeSlot = function(slot){
    // Убрать предмет из слота slot
};
*/


Inventory.prototype.clearInventory = function(){
    console.log('Удаляем все из инвенторя');
    this.hand = [];
    this.renderHand();
};


/*
this.sellInventoryItems = function(arr){
    // Входящий параметр - индексы в массиве inventory
    // Считаем на какую сумму продает предметов
    var gold;
    // Удаляем индекс из inventory (сдвигаем)
    // Округляем до целого в меньшую степень
    // И если > 1, то прибавляем уровень
};*/
