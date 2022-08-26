class UI {

    constructor(taskForm, list, totale) {
        this.taskForm = taskForm
        this.list = list
        this.totale = totale
    }


    showTasks(data) {
        this.list.innerHTML = data.map(item => {
            // return `
            //     <li>
            //         <div class="info">
            //             <input type="radio">
            //             <span>${item.nameTask}</span>
            //         </div>
            //         <div class="action">
            //             <button data-id=${item.id} class="edit">edit</button>
            //             <button data-id=${item.id} class="delete">delete</button>
            //         </div>
            //     </li>
            // `

            /*
            
                            <div class="inputs">
                                <input ${item.complete ? "checked" : ""} type="radio" data-id=${item.id}>
                                <input type="text" ${!item.isEditing ? "readonly" : ""}   value=${item.nameTask}  style=${item.complete ? 'text-decoration:line-through' : ""} >
                            </div>

                   <div class="action">
                    <button data-id=${item.id} class="edit" ${item.complete ? "disabled" : ""}>edit</button>
                    <button data-id=${item.id}  class="delete">delete</button>
                    </div>
            */


            return `
            <li >
                <div class="input-group">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="radio" ${item.complete ? "checked" : ""} data-id=${item.id} >
                    </div>
                    <input data-id=${item.id} type="text" class="form-control edit"  value=${item.nameTask}  value=${item.nameTask}  style=${item.complete ? ('text-decoration:line-through') : ""
                } >
        <span data-id=${item.id} class="delete input-group-text">X</span>
                </div >
             
             </li >
            `
        }).join('')

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