module App {
    export class Battle {
        player:any;

        constructor(player:any) {
            this.player = player;
        }

        match(monster:any):boolean {
            var monsterPower = monster.level + monster.conditionalPower(this);
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

        run(monster:any):boolean {
            if (monster.canRun(this)) {
                console.log('Можно не атаковать');
                return true;
            }
        }

        win(monster:any):void {
            if (this.match(monster)) {
                this.player.char.updateLevel(monster.win.level);
                // Получить кол-во win.treasure
            }
        }
    }
}