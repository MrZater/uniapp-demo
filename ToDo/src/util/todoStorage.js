let LOCAL_KEY = "todomvc";
/**
 * 生成一个任务的唯一编号，时间戳+四位随机数
 */
export function generateId() {
    return Date.now() + Math.random().toString().substr(2, 4);
}
/**
 * 获取目前所有的任务
 * @returns 
 */
export function fetch() {
    // 查看localstorage中是否有以LOCAL_KEY的值为键
    let result = localStorage.getItem(LOCAL_KEY);
    if (result) {
        // console.log(result);
        return JSON.parse(result);
    }
    // 若任务列表不存在，返回一个空数组作为任务列表容器
    return [];
}
/**
 * 保存所有任务
 * @param {*} todos 任务列表 
 */
export function save(todos) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}
/**
 * 对任务列表分类函数
 * @param {*} todos 任务列表
 * @param {*} visibility 类型
 * @returns 
 */
export function filter(todos, visibility) {
    if (visibility === 'all') {
        // 判断是否是all
        return todos;
    } else if (visibility === 'active') {
        // 判断completed是否是false
        return todos.filter((todo) => !todo.completed)
    } else if (visibility === 'completed') {
        // 判断completed是否是true
        return todos.filter((todo) => todo.completed)
    }
    // 抛出不是分类类型的错误
    throw new Error('invalid visibility value!!!')
}