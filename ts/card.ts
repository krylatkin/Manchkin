///<reference path='player.ts'/>
module App {
    export class Card {
        player: Player;
        cards: IItem[] = [];
        active: number = undefined; // Активная карта

        constructor(player:Player) {
            this.player = player;
        }

        renderHand(){}  // Abstract Class

        add(item:IItem){
            this.cards.push(item);
        }
        length():number {
            return this.cards.length;
        }
        selectCard(event):void {
            //console.log(event);
            var elCardList = event.target.closest('ul.card-list');
            console.log(elCardList);
            //var cardList = elCardList.hasAttribute('data-list') ? elCardList.getAttribute('data-list') : undefined;
            var cardList = elCardList.getAttribute('data-list');
            if (!cardList) return;

            // Определяем из какого списка карта
            switch (cardList) {
                case 'inventory':
                    this.player.inventoryCl.select(event, elCardList, cardList);
                    break;
                case 'hand' :
                    this.player.handCl.select(event, elCardList, cardList);
                    break;
                default:
                    alert( 'default' );
                    //return false;
            }
        }
        select(event, elCardList, cardList):void {
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
                    console.log(self);
                    self.active = index;
                }
            });
            elItem.classList.add('active');
            console.log(self.active);
        }
        deleteCard(card):void {
            alert('itemDel: ' + this.active);
            if (card !== undefined) {
                this.cards.splice(this.active, 1);
            }
            this.active = undefined;
            this.renderHand();
        }
    }
}