const newTaskForm = document.getElementById('task-form')
const newTaskInput = document.getElementById('task-input')
const taskContainer = document.getElementById('task-container')
const submitButton = document.getElementById('submit-button')
const clearAllButton = document.getElementById('menu-icon')

let allTasks = loadTasks()
updateTaskContainer()

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    addTask()
})

clearAllButton.addEventListener('click', () => {
    clearAllTasks()
})

function addTask() {
    const taskText = newTaskInput.value.trim()
    if(taskText.length > 0 || taskText.value == '') {
        const taskObject = {
            text: taskText,
            completed: false
        }
        allTasks.push(taskObject)
        updateTaskContainer()
        saveTasks()
        newTaskInput.value = ''
    }
}

function createTask(task, taskIndex) {
    const taskID = 'task-' + taskIndex
    const newTask = document.createElement("div")
    const taskText = task.text
    newTask.className = 'tasks'
    newTask.innerHTML = `
    <input type="checkbox" name="${taskID}" id="${taskID}">
    <label for="${taskID}">
        <div class="task-text">${taskText}</div>
        <span class="custom-checkbox">
            <img src="icons/check-mark.png" class="check-mark">
        </span>
    </label>
    `
    const checkBox = newTask.querySelector('input')
    checkBox.addEventListener('change', () => {
        allTasks[taskIndex].completed = checkBox.checked
        saveTasks()
    })
    checkBox.checked = task.completed
    return newTask
}

function updateTaskContainer() {
    taskContainer.innerHTML = ""
    allTasks.forEach((task, taskIndex) => {
        taskItem = createTask(task, taskIndex)
        taskContainer.append(taskItem)
    })
}

function saveTasks() {
    const tasksJSON = JSON.stringify(allTasks)
    localStorage.setItem('tasks',  tasksJSON)
}

function loadTasks() {
    const tasks = localStorage.getItem('tasks') || "[]"
    return JSON.parse(tasks)
}

function clearAllTasks() {
    localStorage.clear()
    taskContainer.innerHTML = ''
    location.reload()
}