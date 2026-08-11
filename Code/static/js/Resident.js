export default class Admin {
    constructor(id, name, email, apartment, lockerLocation, leaseDate, parkingStatus) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.apartment = apartment;
        this.lockerLocation = lockerLocation;
        this.leaseDate = leaseDate;
        this.parkingStatus = parkingStatus;
        this.__role = "resident";
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
        return `<${this.__role} | id: ${this.id}>`
    }
}