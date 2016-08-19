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
            if (this.player.char.charClass == 'warrior' ? playerPower >= monsterPower : playerPower > monsterPower) {
                this.player.log('info', 'You can defeat the monster - ' + monster.name);
                return true;
            } else {
                this.player.log('warning', 'You cannot defeat the monster - ' + monster.name);
                return false;
            }
        }

        run(monster:IMonster):boolean {
            if (monster.canRun(this.player.char)) {
                this.player.log('info', 'You could not to fight with the monster - ' + monster.name);
                return true;
            }
        }

        win(monster:IMonster):void {
            if (this.match(monster)) {
                this.player.log('success', 'You defeat the monster! - ' + monster.name);
                this.player.char.updateLevel(monster.win.level);
                // TODO: Get treasures in amount of monster.win.treasure
            }
        }
    }
}