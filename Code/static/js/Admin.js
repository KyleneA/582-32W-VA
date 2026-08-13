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

    get displayName() {
        const names = this.name.split(" ");
        const firstName = names[0];
        const lastInitial = names.at(-1)[0];
        return firstName + lastInitial;
    }

    get classLabel() {
        return `<${this.role} | id: ${this.id}>`
    }
}