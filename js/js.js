import { UI, Storge, Task } from './index.js';

//get elements
let taskForm = document.querySelector('.task-form')
let list = document.querySelector('.list ul')

// my events
addEventListener("DOMContentLoaded", () => ui.showTasks(storge.getItem()))
taskForm.addEventListener("submit", addTask)
list.addEventListener("click", deleteTask)
list.addEventListener("click", editTask)

//init my objects
let storge = new Storge()
let ui = new UI(taskForm, list)



// show items 
function addTask(e) {
    e.preventDefault();

    const input = this.querySelector('input[type="text"]').value;
    if (input === '') {
        return ui.showNotification("please put a value");
    }

    let task = new Task(input)
    storge.setItem(task)
    let data = storge.getItem()
    ui.showTasks(data)
    ui.showNotification("added successfully");
}


function deleteTask(e) {
    let id = e.target.dataset.id
    if (id) {
        if (e.target.classList.contains("delete")) {
            let data = storge.getItem().filter(item => item.id !== id)
            storge.update(data)
            ui.showTasks(data)
        }
    }
}


function editTask(e) {
    let id = e.target.dataset.id
    if (id) {
        if (e.target.classList.contains("edit")) {

            let { nameTask, id: idItem } = storge.getItem().find(item => item.id === id)
            let input = taskForm.getElementsByClassName('name')
            input.value = nameTask
            taskForm.querySelector('input[type = "submit"]').value = "update"

            // let data = storge.map(item => {
            //     return idItem === item.id ? item.nameTask = input.value : item
            // })

        }
    }
}






