module.exports = {

    /**
     * 将一个数组随机打乱
     * @param {*} arr 
     */
    sortRandom: arr => {
        arr.sort((a, b) => {
            return Math.random() - 0.5;
        })
    },
    print(pokers) {
        let str = '';
        for (let i = 0; i < pokers.length; i++) {
            let p = pokers[i]
            str += p.toString() + ' ';
        }
        console.log(str);
    }
}