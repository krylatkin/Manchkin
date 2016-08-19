///<reference path='types.ts'/>
///<reference path='battle.ts'/>
///<reference path='hand.ts'/>
///<reference path='inventory.ts'/>
///<reference path='char.ts'/>
///<reference path='game-log.ts'/>
module App {
    export class Player {
        elem: HTMLElement;

        char: Char;
        inventoryCl: Inventory;
        handCl: Hand;
        battle: Battle;

        constructor(options) {
            // DOM
            if (options.elem === undefined) throw new Error("Error: Not defined the DOM Element");
            this.elem = <HTMLElement>document.querySelector(options.elem);
            console.log(this.elem);
            if (this.elem === null) throw new Error("Error: Element does not exist in DOM");

            this.char = new App.Char(this, options);
            this.inventoryCl = new App.Inventory(this);
            this.handCl = new App.Hand(this);
            this.battle = new App.Battle(this);

            var self = this;
            bindEvents.apply(this);
            this.render();

            function doPlayerAction (event){
                var action = event.target.getAttribute('data-action');
                if (!action) return false;
                if(typeof self[action] == "function") {
                    if (event.target.hasAttribute('data-action-item')) {
                        var actionItem = event.target.getAttribute('data-action-item');
                        self[action](window[actionItem]);
                    } else if (event.target.hasAttribute('data-action-options')) {
                        var actionOptions = event.target.getAttribute('data-action-options');
                        self[action](actionOptions);
                    } else {
                        self[action]();
                    }
                }
            }

            // Events
            function bindEvents() {

                this.elem.onclick = function (event) {

                    // Player Actions
                    if (event.target.closest('.player-actions')) {
                        doPlayerAction(event);
                    }

                    // Select card
                    if (event.target.closest('ul.card-list')) {
                        self.handCl.selectCard(event);
                    }

                    // Hand Actions
                    if (event.target.closest('.hand-actions')) {
                        self.handCl.doHandAction(event);
                    }

                    return false;
                };

                // Behavior
                // https://learn.javascript.ru/behavior
                // document.onclick = function(event) {
                // 	if (!event.target.hasAttribute('data-counter')) return;

                // 	var counter = event.target;

                // 	counter.innerHTML++;
                // };

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
            }
        }

        render():void {
            this.char.render();
            this.inventoryCl.renderHand();
            this.handCl.renderHand();
        }

        // Hand
        addItem(item: IItem){
            this.handCl.add(item);
            this.handCl.renderHand();
        }

        // Inventory
        wearItem (item: IItem){
            console.log('wearItem  ', 'Собираемся одевать  ',item);
            this.log('default', 'Trying to wear - ' + item.name);
            if (this.inventoryCl.tryToWear(item)) {
                console.log('wearItem  ', 'Все проверки прошли надеваем  ' ,item);
                this.log('success', 'Successfully wearing - ' + item.name);
                this.inventoryCl.add(item);
            }
            this.char.getPower();
            this.inventoryCl.renderHand();
        }

        log(type: string="default", text: string=""):void {
            GameLog.getInstance().log(this, text, type);
        }

        /* Shortcuts for methods  */
        getInventoryCount():number {
            return this.inventoryCl.length();
        }
        getHandCount():number {
            return this.handCl.length();
        }
        clearInventory():void {
            this.inventoryCl.clearInventory();
        }
        getPower():number {
            return this.char.getPower();
        }
        updateLevel(level){
            return this.char.updateLevel(level);
        }
        setRace(race){
            return this.char.setRace(race);
        }
        setCharClass(charClass){
            return this.char.setCharClass(charClass);
        }
        setSex(sex){
            return this.char.setSex(sex);
        }
        match(monster){
            return this.battle.match(monster);
        }
        run(monster){
            this.battle.run(monster);
        }
        win(monster){
            this.battle.win(monster);
        }

    }

}