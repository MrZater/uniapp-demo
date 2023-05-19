let getMovies = require('./getMovies.js');
let fs = require('fs'); //导入NodeJs的核心模块

getMovies().then(movies => { //得到爬到的数据，进行Promise处理
    let json = JSON.stringify(movies) //将数据转化为JSON格式
    //调用nodejs的核心模块fs的writeFile，得到数据文件
    fs.writeFile('./包管理器/text/movies.json', json, () => { //参数一：文件名及位置；参数二：数据格式；参数三：回调函数
        console.log('获取成功');
    })
})