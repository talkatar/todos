


function onInit() {
    // console.log('Ready')

    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
         <li onclick="onToggleTodo('${todo.id}')"
            class="${todo.isDone ? 'done' : ''}">
            ${todo.txt} importance: ${todo.importance} ,time: ${new Date(todo.createAt)}
            <button onclick="onRemoveTodo(event,'${todo.id}')" >X</button> 
             </li> `)

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.total-todos-count').innerText = getTotalTodosCount()
    document.querySelector('.active-todos-count').innerText = getActiveTodosCount()
    if (getActiveTodosCount()===0 && getTotalTodosCount()===0) {
        console.log('hi');
        var elNoTodos= document.querySelector('.no-todos')
        console.log(elNoTodos);
        document.querySelector('.no-todos').style.display = 'block'

    }

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (window.confirm("Are you sure you want to delete?")) {
        removeTodo(todoId)
        renderTodos()
    }
}


function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('input[name="todo-txt"]')
    if (elInput.value) {

        addTodo(elInput.value)
        renderTodos()
        elInput.value = ''
    }
}

function onSetFilter(filterBy) {
    console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSorting(sortingBy) {
    console.log('sortingBy', sortingBy)
    setSorting(sortingBy)
    renderTodos()
}




