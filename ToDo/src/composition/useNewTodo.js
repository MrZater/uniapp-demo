import {
    ref
} from "vue";
import {
    generateId
} from "../util/todoStorage";



/**
 * 生成新的todo
 * @param {*} todosRef 
 * @returns 
 */
export default function useNewTodo(todosRef) {
    // 即输入框中的文本，用v-model与文本框绑定
    let newTodoRef = ref(""); // 新任务的标题
    // 添加新任务方法
    let addTodo = () => {
        // 获取newTodoRef的value(文本框value),去除首尾空格
        let value = newTodoRef.value && newTodoRef.value.trim();
        // 判断是否是空字符串
        if (!value) {
            return;
        }
        // 若不是空字符串，生成一个任务对象，将其加入到任务队列中
        let todo = {
            id: generateId(),
            title: value,
            completed: false
        }
        todosRef.value.push(todo);
        newTodoRef.value = "";
    }
    return {
        newTodoRef,
        addTodo
    }
}