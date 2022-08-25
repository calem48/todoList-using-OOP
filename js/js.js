import { UI, Storge, Task } from './index.js';

//get elements
let taskForm = document.querySelector('.task-form')
let list = document.querySelector('.list ul')

// my events
addEventListener("DOMContentLoaded", () => ui.showTasks(storge.getItem()))
taskForm.addEventListener("submit", addTask)
list.addEventListener("click", deleteTask)
list.addEventListener('click', editTask)
list.addEventListener('click', complete)

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

    // let input = e.target.parentElement.previousElementSibling.querySelector('input[type="radio"]')
    // console.log(input);

}






