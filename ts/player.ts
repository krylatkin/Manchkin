///<reference path='battle.ts'/>
///<reference path='hand.ts'/>
///<reference path='inventory.ts'/>
///<reference path='char.ts'/>
module App {
    export class Player {
        elem: Element;

        char: Char;
        inventoryCl: Inventory;
        handCl: Hand;
        battle: Battle;

        constructor(par) {
            // DOM
            if (par.elem === undefined) throw new Error("Не задан DOM Element");
            // this.elem = document.getElementById(par.elem);
            this.elem = document.querySelector(par.elem);
            console.log(this.elem);
            if (this.elem === null) throw new Error("Элемент отсутствует в DOM");

            this.char = new App.Char(this, par);
            this.inventoryCl = new App.Inventory(this);
            this.handCl = new App.Hand(this);
            this.battle = new App.Battle(this);

            var self = this;
            bindEvents.apply(this);
            this.render();

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

            // События
            function bindEvents() {

                this.elem.onclick = function (event) {
                    console.log(event.target);

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

        // Инвентарь
        addItem(item){
            this.handCl.add(item);
            this.handCl.renderHand();
        }
        // Одеть предмет
        wearItem (item){
            console.log('wearItem  ', 'Собираемся одевать  ',item);
            if (this.inventoryCl.tryToWear(item)) {
                console.log('wearItem  ', 'Все проверки прошли надеваем  ' ,item);
                this.inventoryCl.add(item);
            }
            this.char.getPower();
            this.inventoryCl.renderHand();
        }


        // Для тестов
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
        // Для тестов и Actions
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
        // Бой для тестов
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