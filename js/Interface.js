class UI {

    constructor(taskForm, list) {
        this.taskForm = taskForm
        this.list = list
    }


    showTasks(data) {
        this.list.innerHTML = data.map(item => {
            return `
                <li>
                    <div class="info">
                        <input type="radio">
                        <span>${item.nameTask}</span>
                    </div>
                    <div class="action">
                        <button data-id=${item.id} class="edit">edit</button>
                        <button data-id=${item.id} class="delete">delete</button>
                    </div>
                </li>
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
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }



}

export default UI