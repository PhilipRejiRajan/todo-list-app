const newTaskForm = document.getElementById('task-form')
const newTaskInput = document.getElementById('task-input')
const taskContainer = document.getElementById('task-container')
const submitButton = document.getElementById('submit-button')
const clearAllButton = document.getElementById('clear-all-button')

const yellowColorButton = document.getElementById('yellow-color-button')
const blueColorButton = document.getElementById('blue-color-button')
const greenColorButton = document.getElementById('green-color-button')

let allTasks = loadTasks()
updateTaskContainer()

document.addEventListener('DOMContentLoaded', () => {
    todoLastEdited()
    getSheetTheme()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    addTask()
})

clearAllButton.addEventListener('click', () => {
    clearAllTasks()
})

yellowColorButton.addEventListener('click', () => {
    document.body.className = 'yellow-color'
    localStorage.setItem('sheetTheme', 'yellow-color')
})

blueColorButton.addEventListener('click', () => {
    document.body.className = 'blue-color'
    localStorage.setItem('sheetTheme', 'blue-color')
})

greenColorButton.addEventListener('click', () => {
    document.body.className = 'green-color'
    localStorage.setItem('sheetTheme', 'green-color')
})

function addTask() {
    const taskText = newTaskInput.value.trim()
    if(taskText.length > 0 || taskText.value == '') {
        const taskObject = {
            createdTime: taskCreatedTime(),
            text: taskText,
            completed: false
        }
        allTasks.push(taskObject)
        updateTaskContainer()
        saveTasks()
        newTaskInput.value = ''
        todoLastEdited()
    }
    else{
        alert('Enter a new task!')
    }
}

function createTask(task, taskIndex) {
    const taskID = 'task-' + taskIndex
    const newTask = document.createElement("div")
    const taskText = task.text
    const taskCreatedOn = task.createdTime
    newTask.className = 'tasks'
    newTask.innerHTML = `
    <input type="checkbox" name="${taskID}" id="${taskID}">
    <label for="${taskID}">
        <div class="task-text">${taskText}</div>
        <span class="custom-checkbox">
            <img src="icons/check-mark.png" class="check-mark">
        </span>
        </label>
    <div class="created-on-date">Created on: ${taskCreatedOn}</div>
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
    localStorage.removeItem('tasks')
    taskContainer.innerHTML = ''
    location.reload()
}

function taskCreatedTime () {
    const createdTime = Date.now()
    //todoLastEdited()
    return createdTime
}

function todoLastEdited() {
    const allTasksLength = allTasks.length
    if ( allTasksLength > 0 ) {
        const savedTime = allTasks[ allTasksLength - 1 ].createdTime
        const timeNow = Date.now()
        const timeDiff = timeNow - savedTime
    
        const secondsDiff = Math.floor( timeDiff / 1000 )
        const minutesDiff = Math.floor( secondsDiff / 60 )
        const hoursDiff = Math.floor( minutesDiff / 60 )
        const daysDiff = Math.floor( hoursDiff / 24 )
    
    
        let editMessage = ""
    
        if (secondsDiff < 60) {
            editMessage = "Edited just now."
        }
        else if (minutesDiff === 1) {
            editMessage = "Edited 1 minute ago."
        } 
        else if (minutesDiff < 60) {
            editMessage = `Edited ${minutesDiff} minutes ago.`
        } 
        else if (hoursDiff === 1) {
            editMessage = "Edited 1 hour ago."
        } 
        else if (hoursDiff < 24) {
            editMessage = `Edited ${hoursDiff} hours ago.`
        } 
        else if (daysDiff === 1) {
            editMessage = "Edited 1 day ago."
        } 
        else {
            editMessage = `Edited ${daysDiff} days ago.`
        }
    
        document.getElementById('last-edited-message').innerText = editMessage
    }
}

function getSheetTheme() {
    const sheetTheme = localStorage.getItem('sheetTheme')
    document.body.className = sheetTheme
}
