function Inventory (player){
    Card.apply(this, arguments);
}

// Наследование от Card
Inventory.prototype = Object.create(Card.prototype);
Inventory.prototype.constructor = Inventory;

Inventory.prototype.renderHand = function(){
    var self = this;

    var items = this.cards.map(function(item, index, array){

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
    this.player.elem.querySelector('.inventory-list').innerHTML = items.join('');
    this.player.elem.querySelector('.inventoryCount').innerText = this.length();
};

Inventory.prototype.getPower = function(){
    // Суммируем все power от вещей в this.inventory
    var power = 0;
    this.cards.forEach(function(currentValue, index, array){
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
        var notEmptySlot = this.cards.some(function(currentValue, index, array){
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
        var hasBigItem = this.cards.some(function(currentValue, index, array){
            bigIndex = index;
            return currentValue.big;
        });
        if (hasBigItem) {
            console.log('Уже есть большая шмотка', bigIndex, this.cards[bigIndex]);
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
    this.cards = [];
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
