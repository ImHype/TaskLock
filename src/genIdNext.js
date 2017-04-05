module.exports =  function genIdNext() { // uid
    let currentId = 0
    return function getNext() {
        return ++currentId
    }
}