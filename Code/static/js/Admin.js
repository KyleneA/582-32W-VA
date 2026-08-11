export default class Admin {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.__role = "admin";
    }

    get role() {
        return this.__role;
    }

    get classLabel() {
        return `<${this.role} | id: ${this.id}>`
    }
}