const genIdNext =  require('./genIdNext')
const Events = require('events')

const idNext = genIdNext()
const msg = new Events()

class TaskLock {
    constructor({
        limit = 1
    } = {}) {
        this.queue = []
        this.limit = limit
    }

    push({run}) {
        const id = idNext()
        const canNext = this.canNext()
        this.queue.push({
            run: () => Promise.resolve().then(run), id
        })
        
        if (canNext) {
            this.next()
        }

        return new Promise((resolve, reject) => {
            msg.once(`task-${id}`, function ({result, error}) {
                if (error !== undefined) {
                    return reject(error) 
                }
                resolve(result)
            })
        })
    }

    canNext() {
        return this.queue.length < this.limit
    }

    shift() {
        this.queue.shift()
        if (!this.canNext()) {
            this.next()
        }
    }

    next() {
        const {run, id} = this.queue[0]
        const self = this
        run()
            .then(result => {
                msg.emit(`task-${id}`, {result})
                self.shift()
            }).catch(error => {
                msg.emit(`task-${id}`, {error})
                self.shift()
            })
    }
}

module.exports = TaskLock