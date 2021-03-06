///<reference path='card.ts'/>
module App {
    export class Hand extends Card {
        constructor(player:Player) {
            super(player);
        }

        renderHand(): void{
            var self = this;

            var items = this.cards.map(function(item: IItem, index, array){

                // Mark active card
                var stateClass = (index == self.active) ? ' active' : '';

                return '<li class="item hand-item '+ stateClass +' " data-card="' + item.id + '" data-from="hand">'
                + '<b>' + item.name + '</b>'
                +' <p>Level: 1</p>'
                +' <p>Power: ' + item.power + '</p>'
                + '<p>Gold: ' + item.gold + '</p>'
                +'</li>';
            });

            //console.log(items);
            this.player.elem.querySelector('.hand-list').innerHTML = items.join('');
            this.player.elem.querySelector('.handCount').textContent = ''+this.length();
        }
        doHandAction(event){
            console.debug(event);
            var action = event.target.getAttribute('data-action');
            if (!action) return false;
            console.debug(action);
            switch (action) {
                case 'itemDel':
                    this.deleteCard(this.active);
                    break;
                case 'itemWear':
                    alert('itemWear: ' + this.active);
                    break;
                default:
                    alert('default');
            }
        }
    }
}


