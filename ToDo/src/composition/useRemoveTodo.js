/**
 * 删除操作
 * @param {*} todosRef 
 * @returns 
 */
export default function useRemoveTodo(todosRef) {
    // 单个删除操作
    let removeOne = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1);
    }
    // 删除所有完成项操作
    let removeCompleted = () => {
        todosRef.value = todosRef.value.filter(todo => !todo.completed);
    }
    return {
        removeOne,
        removeCompleted
    }
}