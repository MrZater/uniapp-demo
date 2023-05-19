```js
        let obj = {
            a: 1,
            b: 3,
            c: function () {
                let func = () => {
                    console.log(this);
                }
                return func
            }
        }
        let f = obj.c;//f为全局变量
        let newFunc = f();//全局变量调用函数，this指向window，相当于window.f()
        newFunc();//箭头函数的this跟随外环境this指向

        let newFunc1 = obj.c();//obj调用返回函数，this指向obj
        newFunc1();//箭头函数的this跟随外环境this指向

```