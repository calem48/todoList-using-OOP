class UI {

    constructor(taskForm, list, totale, darkLight) {
        this.taskForm = taskForm
        this.list = list
        this.totale = totale
        this.darkLight = darkLight
    }

    addElment(item) {
        let li = document.createElement('li')
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


    darkModeLightDark(data) {
        this.darkLight.innerHTML = data ?
            ` <svg  xmlns="http://www.w3.org/2000/svg" width="26" height="26"  >
                <path fill="#FFF" fill-rule="evenodd"
                d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
             </svg>`
            :
            `
            <svg   xmlns="http://www.w3.org/2000/svg" width="26" height="26" >
                <path fill="#ccc" fill-rule="evenodd"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
            </svg>
        `
        !data ? document.body.classList.add("act") : document.body.classList.remove("act")
        console.log(this.darkLight);
    }

    showIconLightDark(data) {
        this.darkLight.innerHTML = !data ?
            ` <svg  xmlns="http://www.w3.org/2000/svg" width="26" height="26"  >
            <path fill="#FFF" fill-rule="evenodd"
            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" />
         </svg>`
            :
            `
        <svg   xmlns="http://www.w3.org/2000/svg" width="26" height="26" >
            <path fill="#ccc" fill-rule="evenodd"
            d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" />
        </svg>
    `
    }

}

export default UI