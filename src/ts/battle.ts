///<reference path='player.ts'/>
module App {
    export class Battle {
        player: Player;

        constructor(player:Player) {
            this.player = player;
        }

        match(monster:IMonster):boolean {
            var monsterPower = monster.level + monster.conditionalPower(this.player.char);
            var playerPower = this.player.char.getPower();
            console.log('match', monsterPower + ' vs ' + playerPower);
            if (this.player.char.charClass == 'warrior' ? playerPower >= monsterPower : playerPower > monsterPower) {
                console.log('Побеждаем');
                return true;
            } else {
                console.log('Проигрываем');
                return false;
            }
        }

        run(monster:IMonster):boolean {
            if (monster.canRun(this.player.char)) {
                console.log('Можно не атаковать');
                return true;
            }
        }

        win(monster:IMonster):void {
            if (this.match(monster)) {
                this.player.char.updateLevel(monster.win.level);
                // Получить кол-во win.treasure
            }
        }
    }
}