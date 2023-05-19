import {
    ref,
    watchEffect
} from "vue";
// 导入工具函数
import * as todoStorage from "../util/todoStorage";


/**
 * 生成任务列表
 * @returns 
 */
export default function useTodoList() {
    // 调用工具函数中的fetch方法得到todosRef数据
    let todosRef = ref(todoStorage.fetch());
    // window.todosRef = todosRef;// 测试
    // 监控todosRef
    watchEffect(() => {
        // 若todosRef改变，即调用工具函数中的save方法，将其保存到localstorage中
        todoStorage.save(todosRef.value);
    });
    return {
        todosRef
    }
}