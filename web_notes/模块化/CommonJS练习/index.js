let pokers = []; // 扑克牌数组
let Poker = require('./poker'); // 导入扑克牌的构造函数
for (let i = 1; i <= 13; i++) {
    for (let j = 1; j <= 4; j++) {
        let poker = new Poker(j, i);
        pokers.push(poker);
    }
}
pokers.push(new Poker(-null, 14), new Poker(null, 15));
pokers = pokers.map(item => {
    return item.toString();
});
let util = require('./util')
util.sortRandom(pokers);
// for (let p of pokers) {
//     console.log(p.toString());
// }
let player1 = pokers.slice(0, 16);
let player2 = pokers.slice(17, 33);
let player3 = pokers.slice(34, 51);
let desk = pokers.slice(51);

console.log('玩家1');
util.print(player1)

console.log('玩家2');
util.print(player2)

console.log('玩家3');
util.print(player3)

console.log('桌面');
util.print(desk)