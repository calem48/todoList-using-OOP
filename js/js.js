import { UI, Storge, Task } from './index.js';

//get elements
let taskForm = document.querySelector('.task-form')
let list = document.querySelector('.list ul')
let totale = document.querySelector('.total-item')
let all = document.querySelector('.all')
let active = document.querySelector('.active')
let comp = document.querySelector('.completed')
let clear = document.querySelector('.clear-item')

// my events
addEventListener("DOMContentLoaded", () => {
    totale.innerHTML = storge.getItem().length + " items"
    ui.showTasks(storge.getItem())
})
taskForm.addEventListener("submit", addTask)
list.addEventListener("click", deleteTask)
list.addEventListener('click', editTask)
list.addEventListener('click', complete)
all.addEventListener('click', allTasks)
active.addEventListener('click', activeTask)
comp.addEventListener('click', tasksComplete)
clear.addEventListener('click', clearAllTasks)


//init my objects
let storge = new Storge()
let ui = new UI(taskForm, list)



// show items 
function addTask(e) {
    e.preventDefault();

    const input = this.querySelector('input[type="text"]');
    if (input.value === '') {
        return ui.showNotification("please put a value");
    }

    let task = new Task(input)

    storge.setItem(task)
    let data = storge.getItem()
    ui.showTasks(data)
    totale.innerHTML = data.length + " items"
    input.value = ''
    ui.showNotification("added successfully");

}


function deleteTask(e) {
    let id = e.target.dataset.id
    if (id) {
        if (e.target.classList.contains("delete")) {
            let data = storge.getItem().filter(item => item.id !== id)
            storge.update(data)
            ui.showTasks(data)
            totale.innerHTML = data.length
            ui.showNotification("remove successfully")
        }
    }
}


function editTask(e) {
    let id = e.target.dataset.id
    if (id) {
        if (e.target.classList.contains("edit")) {
            let { id: idItem } = storge.getItem().find(item => item.id === id)
            let input = e.target.parentElement.previousElementSibling.querySelector('input[type="text"]')
            input.removeAttribute("readonly")
            e.target.innerHTML = 'save'


            e.target.addEventListener('click', function () {
                if (input.value === '') {
                    return ui.showNotification("please put a value");
                }
                let data = storge.getItem().map(item => {
                    return item.id === idItem ? { ...item, nameTask: input.value } : item
                })

                storge.update(data)
                ui.showNotification("updated successfully")
                ui.showTasks(data)
            })
            e.target.removeEventListener("click", editTask)
        }
    }
}



function complete(e) {
    if (e.target.type === 'radio') {
        let id = e.target.dataset.id
        let { id: idItem } = storge.getItem().find(item => item.id === id)

        let data = storge.getItem().map(item => {
            return item.id === idItem ? { ...item, complete: !item.complete } : item
        })
        storge.update(data)
        ui.showTasks(data)

    }
}

function allTasks() {


    let data = storge.getItem()
    storge.update(data)

    ui.showTasks(data)
}

function activeTask() {
    let data = storge.getItem().filter(item => {
        return !item.complete
    })
    // storge.update(data)
    ui.showTasks(data)
}

function tasksComplete() {
    let data = storge.getItem().filter(item => {
        return item.complete
    })
    // storge.update(data)

    ui.showTasks(data)
}


function clearAllTasks() {
    storge.clearAllData()
    let data = storge.getItem()
    totale.innerHTML = data.length
    ui.showTasks(data)
}



