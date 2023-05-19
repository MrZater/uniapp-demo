let axios = require('axios');
let cheerio = require('cheerio');
/**
 * 获取网页的HTML文本
 * @returns 
 */
async function getMoviesHTML() {
    // 发送网络请求得到响应数据
    let resp = await axios.get('https://movie.douban.com/chart');
    // console.log(resp);
    return resp.data; //获取响应数据中的data（HTML文本）
}

/**
 * 通过HTML文本，获取数据
 * @returns 
 */
async function getMoviesData() {
    let html = await getMoviesHTML(); //调用getMoviesHTML函数，获取网页的HTML文本
    let $ = cheerio.load(html); //调用cheerio库中的load方法，将HTML文本转化为dom对象
    let trs = $('tr.item'); //获取到包含数据的dom对象，类数组
    let movies = []; //创建数组用于保存数据
    for (let i = 0; i < trs.length; i++) { //循环遍历这些dom对象类数组
        let tr = trs[i];
        let m = await getMovie($(tr)); //将该对象用$()包裹成jq对象，调用getMovies函数获取数据
        movies.push(m); //将数据保存在数组中
    }
    return movies; //返回数组
}


/**
 *  得到jq对象中的数据的函数
 * @param {*} tr 
 * @returns 
 */
function getMovie(tr) {
    let name = tr.find('div.pl2 a').text(); //获取tr中的带有电影名的dom，利用text方法获取电影名的信息（字符串）
    name = name.replace(/\s/g, ''); //去掉空格
    name = name.split('/')[0]; //将电影名的信息字符串以 /  分割成数组，拿到数组第一项的数据，即电影名
    let img = tr.find('a.nbg img').attr('src'); //读取带有电影图片的jq对象的src属性，获取图片地址
    let detail = tr.find('div.pl2 p.pl').text(); //读取带有电影简介的jq对象的文泵内容，获取电影描述
    // 将这些数据传入一个对象返回
    return {
        name,
        img,
        detail
    }
}

module.exports = getMoviesData; //将getMoviesData函数导出