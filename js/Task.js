class Task {
    constructor(nameTask) {
        this.id = new Date().getTime().toString()
        this.nameTask = nameTask
        this.complete = false
        this.isEditing = false
    }
}

export default Task