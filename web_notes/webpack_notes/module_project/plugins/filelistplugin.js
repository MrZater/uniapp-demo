module.exports = class FileListPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap("FileListPlugin", function (Compilation) {
            let fileList = []
            for (let key in Compilation.assets) {
                let content = `【${key}】
大小：${Compilation.assets[key].size()/1000}KB`;
                fileList.push(content)
            }
            let str = fileList.join('\n\n')
            Compilation.assets['filelist.txt'] = {
                source() {
                    return str;
                },
                size() {
                    return str.length;
                }
            }
        })
    }
}