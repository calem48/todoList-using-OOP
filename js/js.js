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
let ui = new UI(taskForm, list, totale)



// show items 
function addTask(e) {
    e.preventDefault();

    const input = this.querySelector('input[type="text"]');
    if (input.value === '') {
        return ui.showNotification("please put a value");
    }

    let task = new Task(input.value)

    storge.setItem(task)
    let data = storge.getItem()
    ui.showTasks(data)
    ui.totaleItems(data)
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
            ui.totaleItems(data)
            ui.showNotification("remove successfully")
        }
    }
}


function editTask(e) {
    let id = e.target.dataset.id
    if (id) {
        if (e.target.classList.contains("edit")) {
            let { id: idItem } = storge.getItem().find(item => item.id === id)

            let func = e.target.addEventListener("change", function () {
                console.log('hhh');
                let data = storge.getItem().map(item => {
                    return item.id === idItem ? { ...item, nameTask: e.target.value } : item
                })
                storge.update(data)
                ui.showNotification("updated successfully")
                ui.showTasks(data)
                return removeEventListener('change', func)
            })

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
    ui.totaleItems(data)
    ui.showTasks(data)
}

function activeTask() {
    let count = 0
    let data = storge.getItem().filter(item => {
        count = !item.complete ? count + 1 : count
        return !item.complete
    })
    // storge.update(data)
    ui.totaleItems(count)
    ui.showTasks(data)
}

function tasksComplete() {
    let count = 0
    let data = storge.getItem().filter(item => {
        count = item.complete ? count + 1 : count
        return item.complete
    })
    // storge.update(data)
    ui.totaleItems(count)
    ui.showTasks(data)
}


function clearAllTasks() {
    storge.clearAllData()
    let data = storge.getItem()

    ui.totaleItems(data)
    ui.showTasks(data)
    ui.showNotification("delet all items successfully")
}



