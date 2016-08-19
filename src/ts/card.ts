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
            this.player.log('info', 'Taked card - ' + item.name);
            this.cards.push(item);
        }

        length():number {
            return this.cards.length;
        }

        selectCard(event):void {
            var elCardList = event.target.closest('ul.card-list');
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
            }
        }

        select(event, elCardList, cardList):void {
            var self = this;

            // Get the card element
            var elItem = event.target.closest('.item');
            if (!elItem) return;

            // Get the card name
            var card = elItem.getAttribute('data-card');
            console.log(window[card]);

            // Set no active class for all cards
            var elCards = elCardList.querySelectorAll('.item');
            [].forEach.call(elCards, function(currentValue, index, array) {
                currentValue.className = currentValue.className.replace( /(?:^|\s)active(?!\S)/g , '' );
                if (currentValue == elItem) {
                    self.active = index;
                }
            });
            // Set active class for selected card
            elItem.classList.add('active');
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