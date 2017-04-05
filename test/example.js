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