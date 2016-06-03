function Char (player, par){
    this.player = player;

    // Характеристики
    this.name = par.name || "Player";
    this.sex = par.sex || "male";
    this.level = 1;
    this.race = 'human';
    this.charClass = 'none';
}

Char.prototype.render = function(){
    this.player.elem.querySelector('.name').textContent  = this.name;
    this.player.elem.querySelector('.level').textContent  = this.level;
    this.player.elem.querySelector('.race').innerText = this.race;
    this.player.elem.querySelector('.charClass').innerText = this.charClass;
    this.player.elem.querySelector('.sex').innerText = this.sex;

    this.getPower(); //this.elem.querySelector('.power').innerText = this.power;
    //this.inventoryCl.renderHand();
    //this.handCl.renderHand();
};


// Изменение персонажа
Char.prototype.updateLevel = function(level){
    var old = this.level;
    this.level += +level;
    this.level = (this.level > 0) ? this.level : 1;
    console.log('Уровень изменен с ' + old + ' на ' + this.level);
    console.log(this);
    this.player.elem.querySelector('.level').innerText = this.level;
    this.getPower();
    return this;
};
Char.prototype.setRace = function(race){
    // При изменении расы или класса делаем проверку на наличие неподходящего шмота по расе/классу.
    // Сделать проверку по вещам подходящим в старой расе и снять их
    var old = this.race;
    this.race = race;
    console.log('Раса изменена с ' + old + ' на ' + this.race);
    console.log(this);
    this.player.elem.querySelector('.race').innerText = this.race;
    return this;
};
Char.prototype.setCharClass = function(charClass){
    var old = this.charClass;
    this.charClass = charClass;
    console.log('Класс изменен с ' + old + ' на ' + this.charClass);
    console.log(this);
    this.player.elem.querySelector('.charClass').innerText = this.charClass;
    return this;
};
Char.prototype.setSex = function(sex){
    var old = this.sex;
    this.sex = sex;
    console.log('Пол изменен с ' + old + ' на ' + this.sex);
    console.log(this);
    this.player.elem.querySelector('.sex').innerText = this.sex;
    return this;
};

Char.prototype.getPower = function(){
    var power = this.level + this.player.inventoryCl.getPower();
    console.log('power  ', power);
    this.player.elem.querySelector('.power').innerText = power;
    return power;
};