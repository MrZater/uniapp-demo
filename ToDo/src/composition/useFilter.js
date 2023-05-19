// 导入vue中的方法
import {
    ref,
    // 挂载完成生命周期函数
    onMounted,
    // 销毁完成生命周期函数
    onUnmounted,
    // 计算属性
    computed
} from "vue";
import {
    filter
} from "../util/todoStorage";
// 分类类型数组
let validHash = ["all", "active", "completed"];


/**
 * 分类操作
 * @param {*} todosRef 
 * @returns 
 */
export default function useFilter(todosRef) {
    // 默认分类类型
    let visibilityRef = ref("all");
    // 监听hash值变化的函数
    let onHashChamge = () => {
        // 得到当前hash值
        let hash = location.hash.replace(/^#\//, '')
        // 判断当前hash是否是分类类型中的一种
        if (validHash.includes(hash)) {
            // 有效
            // 将默认类型改为当前hash的分类类型
            visibilityRef.value = hash;
        } else {
            // 无效的
            // 将hash值改为空
            location.hash = "";
            // 分类类型改为默认all
            visibilityRef.value = 'all';
        }
    }
    // 1. 组件挂在完成的生命周期函数
    onMounted(() => {
        // 组件挂载后监听hash值变化事件
        window.addEventListener("hashchange", onHashChamge)
    })
    // 2. 组件销毁后的生命周期函数
    onUnmounted(() => {
        // 组件销毁前取消监听hash值变化事件
        window.removeEventListener("hashchange", onHashChamge)
    })
    // 计算属性 任务列表分类
    let filteredTodosRef = computed(() => {
        return filter(todosRef.value, visibilityRef.value);
    })
    // 计算属性 得到未完成任务的数量
    let remainingRef = computed(() => {
        return filter(todosRef.value, "active").length;
    })
    // 计算属性 得到已完成任务的数量
    let completedRef = computed(() => {
        return filter(todosRef.value, "completed").length;
    })
    return {
        visibilityRef,
        filteredTodosRef,
        remainingRef,
        completedRef
    }
}