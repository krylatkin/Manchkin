///<reference path='player.ts'/>
module App {
    export class Char {
        player: Player;

        // Characters
        name: string;
        sex: string;
        level: number = 1;
        race: string = 'human';
        charClass: string = 'none';

        constructor (player, options){
            this.player = player;
            this.name = options.name || "Player";
            this.sex = options.sex || "male";
        }

        render(): void {
            this.player.elem.querySelector('.header-name').textContent  = this.name;
            this.player.elem.querySelector('.name').textContent  = this.name;
            this.player.elem.querySelector('.level').textContent  = ''+this.level;
            this.player.elem.querySelector('.race').textContent = this.race;
            this.player.elem.querySelector('.charClass').textContent = this.charClass;
            this.player.elem.querySelector('.sex').textContent = this.sex;
            this.getPower();
        }
        updateLevel(level): Char {
            var old = this.level;
            this.level += +level;
            this.level = (this.level > 0) ? this.level : 1;
            this.player.log('info','Level changed from ' + old + ' to ' + this.level);
            this.player.elem.querySelector('.level').textContent = ''+this.level;
            this.getPower();
            return this;
        }
        setRace(race): Char {
            // TODO: Then race is changing need to make inspection of unsuitable clothes by new race/class
            var old = this.race;
            this.race = race;
            this.player.log('info','Race changed from ' + old + ' to ' + this.race);
            this.player.elem.querySelector('.race').textContent = this.race;
            return this;
        }
        setCharClass(charClass): Char {
            var old = this.charClass;
            this.charClass = charClass;
            this.player.log('info','Class changed from ' + old + ' to ' + this.charClass);
            this.player.elem.querySelector('.charClass').textContent = this.charClass;
            return this;
        }
        setSex(sex): Char {
            var old = this.sex;
            this.sex = sex;
            this.player.log('info','Sex changed from ' + old + ' to ' + this.sex);
            this.player.elem.querySelector('.sex').textContent = this.sex;
            return this;
        }
        getPower(): number {
            var power = this.level + this.player.inventoryCl.getPower();
            this.player.elem.querySelector('.power').textContent = ''+power;
            return power;
        }

    }
}