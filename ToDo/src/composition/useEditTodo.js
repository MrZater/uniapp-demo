import {
    ref,
    computed
} from "vue";


/**
 * 修改todo操作
 * @param {*} todosRef 传入任务列表 
 * @returns 
 */
export default function useEditTodo(todosRef) {
    // 当前正在修改的todo
    let editingTodoRef = ref(null);
    // 修改的todo的原始值
    let praTitle = null;
    // 双击todo事件函数
    let editTodo = (todo) => {
        // 保存todo的原始值
        praTitle = todo.title;
        // 给当前正在修改的todo赋值
        editingTodoRef.value = todo;
    }
    // 完成修改todo事件函数
    let doneEdit = (todo) => {
        // 将当前正在修改的todo设为null
        editingTodoRef.value = null;
        // 处理当前todo的title
        let title = todo.title.trim()
        // 判断todo是否有值
        if (title) {
            // 有值  当前todo的title设为处理后的title
            todo.title = title;
        } else {
            // 没有值  删除该项任务
            // 得到当前todo在任务列表里的索引
            let index = todosRef.value.indexOf(todo)
            // 判断索引是否存在  防报错
            if (index >= 0) {
                // 删除任务列表里的该项
                todosRef.value.splice(index, 1);
            }
        }
    }
    // 取消修改事件函数
    let cancelEdit = (todo) => {
        // 将当前正在修改的todo设为null
        editingTodoRef.value = null;
        // 将原先保存的原始值还原给该todo
        todo.title = praTitle;
    }
    // 计算属性 修改所有todo的completed属性
    let allDoneRef = computed({
        get() {
            // 通过所有任务的completed是否都是true的到返回值
            return todosRef.value.filter(it => !it.completed).length === 0
        },
        // 传入勾选框的选择状态
        set(checked) {
            // 将选择状态给所有的todo的completed赋值
            todosRef.value.forEach(todo => {
                todo.completed = checked;
            })
        }
    })
    return {
        editingTodoRef,
        editTodo,
        doneEdit,
        cancelEdit,
        allDoneRef
    }
}