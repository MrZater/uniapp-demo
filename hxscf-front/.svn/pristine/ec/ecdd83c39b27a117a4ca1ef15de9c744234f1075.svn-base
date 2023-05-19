/*
 * @Author: min.liu
 * @Date: 2020-04-28 13:36:01
 * @LastEditors: mingliang.zhu
 * @LastEditTime: 2020-10-21 17:06:18
 * @Description:vue.config.js
 */

const FileManagerPlugin = require("filemanager-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const baseConfig = require("./baseConfig");
var path = require('path')

module.exports = {
  productionSourceMap: false,
  outputDir: baseConfig.packageName,
  devServer: {
    open: true,
    port: baseConfig.port,
    proxy: {
      "/approve": {
        target: baseConfig.targetUrl, //服务器地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/approve": ""
        }
      }
    }
  },
  // webpack配置
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.ts'],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
    //创建一个插件的实例对象
    // const htmlPlugin = new HtmlWebPackPlugin({
    //   template:path.join(__dirname,'./public/index.html'),//源文件
    //   title:`${baseConfig.browserTitle}`,
    // })
    // config.plugins.push(htmlPlugin)
    if(process.env.NODE_ENV == 'development'){
      config.mode = 'development'
    }else if(process.env.NODE_ENV == 'production'){
      config.mode = 'production'
      let fileManagerPlugin = new FileManagerPlugin({ 
        onEnd: {
          delete: [   //首先需要删除项目根目录下的dist.zip
            `./${baseConfig.packageName}.zip`,   
          ],
          archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
            {source: `./${baseConfig.packageName}`, destination: `./${baseConfig.packageName}.zip`},   
          ]
        }
      })
      
      config.plugins.push(fileManagerPlugin)
      
    }
    
  }
};
