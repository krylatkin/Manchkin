function Player (par) {
    // DOM
    if (par.elem === undefined) throw new Error("Не задан DOM Element");
    // this.elem = document.getElementById(par.elem);
    this.elem = document.querySelector(par.elem);
    console.log(this.elem);
    if (this.elem === null) throw new Error("Элемент отсутствует в DOM");

    this.char = new Char(this, par);
    this.inventoryCl = new Inventory(this);
    this.handCl = new Hand(this);
    this.battle = new Battle(this);

    this.render = function(){
        this.char.render();
        this.inventoryCl.renderHand();
        this.handCl.renderHand();
    };

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

    // Инвентарь
    this.addItem = function(item){
        this.handCl.add(item);
        this.handCl.renderHand();
    };
    // Одеть предмет
    this.wearItem = function (item){
        console.log('wearItem  ', 'Собираемся одевать  ',item);
        if (this.inventoryCl.tryToWear(item)) {
            console.log('wearItem  ', 'Все проверки прошли надеваем  ' ,item);
            this.inventoryCl.add(item);
        }
        this.char.getPower();
        this.inventoryCl.renderHand();
    };


    // Для тестов
    this.getInventoryCount = function(){
        return this.inventoryCl.length();
    };

    this.getHandCount = function(){
        return this.handCl.length();
    };
    this.clearInventory = function(){
        this.inventoryCl.clearInventory();
    };
    this.getPower = function(){
        return this.char.getPower();
    };

    // Для тестов и Actions
    this.updateLevel = function(level){
        return this.char.updateLevel(level);
    };
    this.setRace = function(race){
        return this.char.setRace(race);
    };
    this.setCharClass = function(charClass){
        return this.char.setCharClass(charClass);
    };
    this.setSex = function(sex){
        return this.char.setSex(sex);
    };

    // Бой для тестов
    this.match = function(monster){
        return this.battle.match(monster);
    };
    this.run = function(monster){
        this.battle.run(monster);
    };
    this.win = function(monster){
        this.battle.win(monster);
    };

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