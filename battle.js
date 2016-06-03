function Battle (player){
    this.player = player;
}

Battle.prototype.match = function(monster){
    var monsterPower = monster.level + monster.conditionalPower(this);
    var playerPower = this.player.char.getPower();
    console.log('match', monsterPower + ' vs ' + playerPower );
    if (this.charClass == 'warrior' ? playerPower >= monsterPower : playerPower > monsterPower ) {
        console.log('Побеждаем');
        return true;
    } else {
        console.log('Проигрываем');
        return false;
    }
};
Battle.prototype.run = function(monster){
    if (monster.canRun(this)) {
        console.log('Можно не атаковать');
        return true;
    }
};
Battle.prototype.win = function(monster){
    if (this.match(monster)) {
        this.player.char.updateLevel(monster.win.level);
        // Получить кол-во win.treasure
    }
};