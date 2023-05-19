module.exports = function(plop) {
    plop.setGenerator('generator',{
        description: '创建列表模板',
        prompts: [{
            type: 'input', // select
            message: '请输入模块名称如system(可省略)',
            name: 'modeName',
            default: ''
        },{
            type: 'input', // select
            message: '请输入文件夹名称如userManage(不可省略)',
            name: 'name'
        }],
        actions: [{
            type: 'add',
            path: '{{modeName}}' ?'src/views/{{modeName}}/{{name}}/index.vue':'src/views/{{name}}/index.vue', //文件存放路径
            templateFile: 'plop-templates/index.hbs' //模板文件
        },{
            type: 'add',
            path: '{{modeName}}' ?'src/views/{{modeName}}/{{name}}/Grid.vue':'src/views/{{name}}/Grid.vue', //文件存放路径
            templateFile: 'plop-templates/Grid.hbs' //模板文件
        },{
            type: 'add',
            path: '{{modeName}}' ?'src/views/{{modeName}}/{{name}}/Search.vue':'src/views/{{name}}/Search.vue', //文件存放路径
            templateFile: 'plop-templates/Search.hbs' //模板文件
        },{
            type: 'add',
            path: '{{modeName}}' ?'src/api/{{modeName}}/{{name}}.ts':'src/api/{{name}}.js', //文件存放路径
            templateFile: 'plop-templates/api.hbs' //api
        },{
            type: 'add',
            path: '{{modeName}}' ?'src/views/{{modeName}}/{{name}}/modules.ts':'src/views/{{name}}/modules.ts', //文件存放路径
            templateFile: 'plop-templates/modules.hbs' //文件夹下的modules.ts
        }]
    })
}