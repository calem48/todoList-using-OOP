class UI {

    constructor(taskForm, list, totale) {
        this.taskForm = taskForm
        this.list = list
        this.totale = totale
    }

    addElment(item) {
        let li = document.createElement('li')
        // let show = item.complete ? "show" : "hide"
        // li.classList.add(show)
        li.innerHTML = `
            <div class="input-group">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="radio" ${item.complete ? "checked" : ""} data-id=${item.id} >
                </div>
            
                <textarea rows="1"  ${item.complete ? "disabled" : ""} data-id=${item.id} type="text" class="form-control edit ${item.complete ? "completed" : ""}">${item.nameTask}</textarea>
                <span data-id=${item.id} class="delete input-group-text">X</span>
            </div >
        `
        this.list.appendChild(li)
    }

    showTasks(data) {
        data.forEach(item => {
            this.addElment(item)
        })
    }


    showNotification(text) {
        Toastify({
            text: text,
            className: "info",
            duration: 2000,
            position: "center",
            style: {
                background: "linear-gradient(135deg, rgb(87, 221, 255), rgb(192, 88, 243))",
            }
        }).showToast();
    }

    totaleItems(data) {
        if (typeof (data) === "number") {
            return this.totale.innerHTML = data + " items"
        }
        this.totale.innerHTML = data.length + " items"
    }



}

export default UI