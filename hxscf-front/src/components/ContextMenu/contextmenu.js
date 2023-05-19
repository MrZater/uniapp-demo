import Context from "./context"

let contextInstance

function getInstance() {
    let instance = contextInstance || Context.newInstance()
    return instance
}

function contextmenu(
    position = {
        left: 0,
        top: 0
    },
    menus = []
) {
    let instance = getInstance()
    instance.update(position, menus)
}

export default contextmenu
