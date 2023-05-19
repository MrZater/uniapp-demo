import ContextMenu from "./index.vue"
import Vue from "vue"

ContextMenu.newInstance = properties => {
    let props = properties || {}
    const Instance = new Vue({
        props: props,
        render(h) {
            return h(ContextMenu, {
                props: props
            })
        }
    })

    const component = Instance.$mount()
    document.body.append(component.$el)

    const contextmenu = Instance.$children[0]

    return {
        update(position, menus) {
            contextmenu.update(position, menus)
        }
    }
}

export default ContextMenu
