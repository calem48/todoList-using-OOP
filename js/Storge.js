class Storge {
    constructor() {
        this.name = 'taskList'
    }

    setItem() {
        let data = this.getItem()
        localStorage.setItem(this.name, JSON.stringify(this.name))
    }

    getItem() {
        return JSON.parse(localStorage.getItem(this.name)) || []
    }

}

export default Storge