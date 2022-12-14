import { UI, Storge, Task } from './index.js';

//get elements
let taskForm = document.querySelector('.task-form')
let list = document.querySelector('.list ul')
let totale = document.querySelector('.total-item')
let all = document.querySelector('.all')
let active = document.querySelector('.active')
let comp = document.querySelector('.completed')
let clear = document.querySelector('.clear-item')
let darkLight = document.querySelector('.icon')



// my events
addEventListener("DOMContentLoaded", () => {
    totale.innerHTML = storge.getItem().length + " items"
    ui.showTasks(storge.getItem())
    st.update({ show: false })
    if (darkMode.getItem().length === 0) {
        darkMode.update({ dark: false })
    }
    darkMode.getItem().dark ? document.body.classList.add("act") : document.body.classList.remove("act")
    ui.showIconLightDark(darkMode.getItem().dark)
})


taskForm.addEventListener("submit", addTask)
list.addEventListener("click", deleteTask)
list.addEventListener('click', editTask)
list.addEventListener('click', complete)
all.addEventListener('click', allTasks)
active.addEventListener('click', activeTask)
comp.addEventListener('click', tasksComplete)
clear.addEventListener('click', clearAllTasks)
darkLight.addEventListener("click", switchMode)

//init my objects
let storge = new Storge('taskList')
let st = new Storge('show')
let darkMode = new Storge('dark')
let ui = new UI(taskForm, list, totale, darkLight)


function addTask(e) {
    let da = JSON.parse(localStorage.getItem('show')) || null
    e.preventDefault();

    if (da.show) {
        const input = this.querySelector('input[type="text"]');
        if (input.value === '') {
            return ui.showNotification("please put a value");
        }
        let task = new Task(input.value)
        storge.setItem(task)
        ui.showNotification("item added success")
        input.value = ''
    } else {
        const input = this.querySelector('input[type="text"]');
        if (input.value === '') {
            return ui.showNotification("please put a value");
        }
        let task = new Task(input.value)
        storge.setItem(task)
        ui.addElment(task)
        ui.showNotification("item added success")
        input.value = ''
    }
    ui.totaleItems(storge.getItem().length)
}




function deleteTask(e) {
    let id = e.target.dataset.id
    if (id) {
        if (e.target.classList.contains("delete")) {
            let data = storge.getItem().filter(item => item.id !== id)
            e.target.parentElement.parentElement.remove()
            storge.update(data)
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

            let handlEdit = function (e) {

                let data = storge.getItem().map(item => {
                    return item.id === idItem ? { ...item, nameTask: e.target.value } : item
                })

                storge.update(data)
                e.target.innerHTML = e.target.value
                ui.showNotification("updated successfully")
                this.removeEventListener("change", handlEdit, false)
                e.stopImmediatePropagation()
            }
            e.target.addEventListener("change", handlEdit, false)
        }
    }

    // this.removeEventListener("click", editTask, false)
}


// when click at radio button toggle true to false or false to true
function complete(e) {
    if (e.target.type === 'radio') {
        let id = e.target.dataset.id

        let { id: idItem } = storge.getItem().find(item => item.id === id)
        let data = storge.getItem().map(item => {
            return item.id === idItem ? { ...item, complete: !item.complete } : item
        })
        storge.update(data)
        list.innerHTML = ''
        ui.showTasks(data)
    }
}

function allTasks() {
    showSiwtch(false)
    let data = storge.getItem()
    storge.update(data)
    list.innerHTML = ''
    ui.showTasks(data)
}

function activeTask() {
    showSiwtch(false)

    let count = 0
    let data = storge.getItem().filter(item => {
        count = !item.complete ? count + 1 : count
        return !item.complete
    })

    list.innerHTML = ''
    ui.totaleItems(count)
    ui.showTasks(data)
}

function tasksComplete() {

    showSiwtch(true)
    let count = 0
    let data = storge.getItem().filter(item => {

        count = item.complete ? count + 1 : count
        return item.complete
    })

    list.innerHTML = ''
    ui.totaleItems(count)
    ui.showTasks(data)

}

function showSiwtch(toggle) {
    let data = st.getItem()
    data.show = toggle
    st.update(data)
}


function clearAllTasks() {
    storge.clearAllData()
    let data = storge.getItem()
    ui.totaleItems(data)
    list.innerHTML = ''
    ui.showNotification("delet all items successfully")
}



function switchMode() {
    let data = darkMode.getItem()
    ui.darkModeLightDark(data.dark)
    darkMode.update({ dark: !data.dark })
    // this.querySelector("svg").style = "transition: 2s;transform: rotate(360deg);"
    this.classList.toggle("act")
}