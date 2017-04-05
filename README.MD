# TaskLock
> TaskLock 本质是一条队列，用于限制一条通道内同时允许多少次异步操作

## 如何使用
```javascript
const TaskLock = require('../')
const taskLock = new TaskLock({
    limit: 1
})

taskLock.push({
    run: () => new Promise(function (resolve) {
        setTimeout(function () {
            resolve(3000)
        }, 3000)
    })
})
.then(function (value) {
    console.log('value', value)
})
.catch(e => {
    console.log('e', e)
})

taskLock.push({
    run: () => new Promise(function (resolve) {
         setTimeout(function () {
            resolve(2000)
        }, 2000)
    })
})
.then(function (value) {
    console.log('value', value)
})
.catch(e => {
    console.log('e', e)
})
```

会在 3000 毫秒后输出 3000，而后 2000 毫秒后输出 2000