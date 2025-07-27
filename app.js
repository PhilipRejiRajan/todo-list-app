const newTaskForm = document.getElementById('task-form')
const newTaskInput = document.getElementById('task-input')
const taskContainer = document.getElementById('task-container')
const submitButton = document.getElementById('submit-button')

let allTasks = [];

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    addTask()
})

function addTask() {
    const taskText = newTaskInput.value.trim()
    if(taskText.length > 0 || taskText.value == '') {
        allTasks.push(taskText)
        updateTaskContainer()
        newTaskInput.value = ''
    }
}

function createTask(task, taskIndex) {
    const taskID = 'task-' + taskIndex
    const newTask = document.createElement("div")
    newTask.className = 'tasks'
    newTask.innerHTML = `
    <input type="checkbox" name="${taskID}" id="${taskID}">
    <label for="${taskID}">
        <div class="task-text">${task}</div>
        <span class="custom-checkbox">
            <img src="icons/check-mark.png" class="check-mark">
        </span>
    </label>
    `
    return newTask
}

function updateTaskContainer() {
    taskContainer.innerHTML = ""
    allTasks.forEach((task, taskIndex) => {
        taskItem = createTask(task, taskIndex)
        taskContainer.append(taskItem)
    })
}