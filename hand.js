function Hand (player){
    this.player = player;
    this.hand = []; // this.cards = [];
    // Активная карта
    this.active = undefined;
    //alert('hand');

    //var self = this;
}

Hand.prototype.renderHand = function(){
    var self = this;

    var items = this.hand.map(function(item, index, array){

        // Помечаем активную карту
        var stateClass = (index == self.active) ? ' active' : '';

        return '<li class="item hand-item '+ stateClass +' " data-card="' + item.id + '" data-from="hand">'
        + '<b>' + item.name + '</b>'
        +' <p>Level: 1</p>'
        +' <p>Power: ' + item.power + '</p>'
        + '<p>Gold: ' + item.gold + '</p>'
        +'</li>';
    });

    console.log(items);
    this.player.elem.querySelector('.hand-list').innerHTML = items.join('');
    this.player.elem.querySelector('.handCount').innerText = this.length();
};

Hand.prototype.add = function(item){
    this.hand.push(item);
};

Hand.prototype.length = function(){
    return this.hand.length;
};

Hand.prototype.select = function(event, elCardList, cardList){
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

Hand.prototype.doHandAction = function(event){
    console.log(event);
    var action = event.target.getAttribute('data-action');
    if (!action) return false;
    console.log(action);
    console.log(this.active);
    switch (action) {
        case 'itemDel':
            alert('itemDel: ' + this.active);
            this.hand.splice(this.active, 1);
            this.active = undefined;
            this.renderHand();
            break;
        case 'itemWear':
            alert('itemWear: ' + this.active);
            break;
        default:
            alert('default');
    }
};
