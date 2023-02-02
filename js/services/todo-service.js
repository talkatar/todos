
var gTodos
var gFilterBy = 'all'
// var gsortingBy = 'txt'
const STORAGE_KEY = 'todosDB'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos
    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)
}

function addTodo(txt) {
    const todo = _createTodo(txt)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)
}

function setFilter(filterBy) {
    gFilterBy = filterBy

}


function setSorting(sortingBy) {

    if (sortingBy === 'txt') sortByName()

    else if (sortingBy === 'importance') sortByImportance()

    else sortByTime()




}

function getTotalTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)

    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt) {
    return {
        id: _makeId(),
        txt,
        isDone: false,
        importance: getRandomInt(1, 4),
        createAt: Date.now()
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}


function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is inclusive and the minimum is inclusive
}

function sortByName() {
    gTodos.sort((a, b) => {
        const txtA = a.txt.toUpperCase()
        const txtB = b.txt.toUpperCase()
        if (txtA < txtB) return -1
        if (txtA > txtB) return 1
        return 0
    })
}

function sortByImportance() {
    gTodos.sort((a, b) => (b.importance - a.importance))

}

function sortByTime() {
    gTodos.sort((a, b) => (b.createAt - a.createAt))


}
