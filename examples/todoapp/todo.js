const todos = ['study JS', 'proactive Nodejs', 'create framework']

const addTodoInputEl = document.querySelector('#todo-input')
const addTodoBtnEl = document.querySelector('#add-todo-btn')
const todoListEl = document.querySelector('#todos-list')

function removeTodo(index) {
    todos.splice(index, 1)
    todoListEl.childNodes[index].remove()
}

function updateTodo(idx, desc) {
    todos[idx] = desc
    const todo = renderTodoList(desc)
    todoListEl.replaceChild(todo, todoListEl.childNodes[idx])
}

function addTodoBtn() {
    const desc = addTodoInputEl.value
    todos.push(desc)
    const todo = renderTodoList(desc)
    todoListEl.append(todo)
    addTodoInputEl.value = ''
    addTodoBtn.disabled = true
}

function createNewChild(todo) {
    const li = document.createElement('li')
    const input = document.createElement('input')
    input.type = 'text'
    input.value = todo
    li.append(input)

    const saveBtn = document.createElement('button')
    saveBtn.textContent ='Save'
    saveBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        updateTodo(idx, input.value)
    })
    li.append(saveBtn)


    const cancelBtn = document.createElement('button')
    cancelBtn.textContent ='Cancel'
    cancelBtn.addEventListener('click', () => {
        const idx = todos.indexOf(todo)
        todoListEl.replaceChild(renderTodoList(todo), todoListEl.childNodes(idx))
    })
    li.append(cancelBtn)
    return li
}

function renderTodoList(todo) {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.textContent = todo
    span.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo)
        todoListEl.replaceChild(createNewChild(todo), todoListEl.childNodes[idx])
    })
    li.append(span)

    const button = document.createElement('button')
    button.textContent ='Done'
    button.addEventListener('click', () => {
        const idx= todos.indexOf(todo)
        removeTodo(idx)
    })

    li.append(button)
    return li
}

// Initialize the view

for (const todo of todos) {
    todoListEl.append(renderTodoList(todo))
}

addTodoBtnEl.addEventListener('click', () => {
    addTodoBtn()
})

addTodoInputEl.addEventListener('input', () => {
    addTodoBtnEl.disabled = addTodoInputEl.value.length < 3
})
