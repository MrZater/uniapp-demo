/*
 * @Author: mingliang.zhu
 * @Date: 2020-12-09 15:18:57
 * @LastEditors: weiwei.xue
 * @LastEditTime: 2020-12-10 11:40:42
 * @Description: 
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const modulesFiles = require.context('./views', true, /\.ts$/)


const modules = modulesFiles.keys().reduce((modules, modulePath) => {

    // set './app.js' => 'app'
    // console.log(modulePath, '000')
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    var name = moduleName.replace("/modules", "").split('/');

    const value = modulesFiles(modulePath);

    modules[name.length > 1 ? name[name.length - 1] : name[0]] = value.default;

    return modules;

}, {});
export default new Vuex.Store({
    modules,
    state: {

    },
    mutations: {

    },
    actions: {

    }
})
