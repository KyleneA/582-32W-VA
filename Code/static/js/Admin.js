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

    static fromObject(obj) {
        const id = obj.id || undefined;
        const name = obj.name || undefined;
        const email = obj.email || undefined;

        if (!id || !name || !email) {
            throw new Error("Admin instance was not created. Invalid data.");
        }

        return new this(id, name, email);
    }
}