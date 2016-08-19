module App {
    /* Singleton Pattern */
    export class GameLog {

        private static _instance:GameLog;
        elem:HTMLElement;

        constructor(options?) {
            if (GameLog._instance) {
                throw new Error("Error: Instantiation failed: Use GameLog.getInstance() instead of new.");
            }
            GameLog._instance = this;

            options = options || {};
            options.elem = options.elem || "#log";
            if (options.elem === undefined) throw new Error("Error: Not defined the DOM Element");
            this.elem = <HTMLElement>document.querySelector(options.elem);
            if (this.elem === null) throw new Error("Error: Element does not exist in DOM");
        }

        public static getInstance(options?):GameLog {
            if( GameLog._instance === undefined ) {
                GameLog._instance = new GameLog(options);
            }
            return GameLog._instance;
        }

        public log(player:any, text:string, type:string = "default"):void {
            var div = document.createElement('div');
            div.className = "alert-" + type;
            div.innerHTML = "<strong>" + player.char.name + ": </strong>" + text;
            this.elem.insertBefore(div, this.elem.childNodes[0]);  // Insert before the first child
        }

    }
}