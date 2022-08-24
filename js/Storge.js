class Storge {
    constructor() {
        this.name = 'taskList'
    }

    setItem(data) {
        let tasks = this.getItem()
        tasks.push(data)
        localStorage.setItem(this.name, JSON.stringify(tasks))
    }

    getItem() {
        return JSON.parse(localStorage.getItem(this.name)) || []
    }

    update(data) {
        return localStorage.setItem(this.name, JSON.stringify(data))
    }

    clearAllData() {
        localStorage.removeItem(this.name)
    }

}

export default Storge