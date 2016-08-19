///<reference path='card.ts'/>
module App {
    export class Inventory extends Card {
        constructor(player:Player) {
            super(player);
        }

        renderHand(): void{
            var self = this;

            var items = this.cards.map(function(item: IItem, index, array){

                // Mark active card
                var stateClass = (index == self.active) ? ' active' : '';

                return '<li class="item inventory-item hand-item '+ stateClass +' " data-card="' + item.id + '" data-from="hand">'
                + '<b>' + item.name + '</b>'
                +' <p>Level: 1</p>'
                +' <p>Power: ' + item.power + '</p>'
                + '<p>Gold: ' + item.gold + '</p>'
                +'</li>';
            });

            this.player.elem.querySelector('.inventory-list').innerHTML = items.join('');
            this.player.elem.querySelector('.inventoryCount').textContent = ''+this.length();
        }
        getPower(): number {
            // Calc power of all wearing clothes (this.inventory)
            var power = 0;
            this.cards.forEach(function(currentValue, index, array){
                if (currentValue.power) {
                    power += currentValue.power;
                }
            });
            this.player.elem.querySelector('.power').textContent = ''+power;
            return power;
        }
        tryToWear(item:IItem): boolean {
            return this.checkItemCondition(item) && this.checkSlot(item) && this.checkBigItem(item);
        }
        checkItemCondition(item:IItem): boolean {
            if (typeof item.condition === 'function') {
                this.player.log('info', 'Clothes has condition to wear - ' + item.name);
                if ( item.condition(this.player.char) ) {
                    //this.player.log('info', 'Conditions are met - ' + item.name);
                    return true;
                } else {
                    this.player.log('danger', 'Cannot wear item - ' + item.name);
                    return false;
                }
            } else {
                //this.player.log('info', 'No conditions to wear - ' + item.name);
                return true;
            }
        }
        checkSlot(item:IItem): boolean {
            if (item.slot) {
                this.player.log('info', 'Clothes use slot (' + item.slot + ')  We need to check - ' + item.name);

                var handSlots = 0;
                // Loop through inventory for slot == item.slot
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
                    this.player.log('danger', 'Sorry. Slot had been already used.  - ' + item.name);
                    return false;
                } else {
                    this.player.log('success', 'Slot is empty - ' + item.name);
                }
            }

            return true;
        }
        checkBigItem(item:IItem): boolean {
            if (item.big) {
                console.log('Большая шмотка. Нужна проверка.');
                if (this.player.char.race == 'dwarf') {
                    this.player.log('success', 'Dwarf can wear unlimited count of Big clothes');
                    return true;
                }

                // Loop through inventory for item.big == true
                var bigIndex;
                var hasBigItem = this.cards.some(function(currentValue, index, array){
                    bigIndex = index;
                    return currentValue.big;
                });
                if (hasBigItem) {
                    this.player.log('danger', 'Have already worn Big clothes - ' + this.cards[bigIndex].name);
                    return false;
                } else {
                    //console.log('Don\'t wear big clothes');
                }
            }

            return true;
        }

        clearInventory(): void {
            this.player.log('info', 'Clear inventory');
            this.cards = [];
            this.renderHand();
        }

        // TODO Remove Item from Slot
        removeSlot(): void{}

        // TODO Sell Items from Inventory
        sellItems(items: Array<Number>): void{
            // TODO Input parameter array of indexes
            // Calc cost of items
            // If more than 1000 player.level(+1)
            // Remove items from inventory

        }

    }
}


