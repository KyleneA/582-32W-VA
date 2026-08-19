export default class Resident {
    constructor(id, name, email, apartment, lockerLocation, leaseDate, parkingStatus) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.apartment = apartment;
        this.lockerLocation = lockerLocation;
        this.leaseDate = leaseDate.substring(4, leaseDate.length - 12);
        this.parkingStatus = parkingStatus;
        this.__role = "resident";
    }

    get role() {
        return this.__role;
    }

    get displayName() {
        const names = this.name.split(" ");
        const firstName = names[0];
        const lastInitial = names.at(-1)[0].toUpperCase();
        return firstName + lastInitial;
    }

    get classLabel() {
        return `<${this.__role} | id: ${this.id}>`
    }

    static fromObject(obj) {
        const id = obj.id || undefined;
        const name = obj.name || undefined;
        const email = obj.email || undefined;
        const apartment = obj.apartment || undefined;
        const lockerLocation = obj.lockerLocation || undefined;
        const leaseDate = obj.leaseDate || undefined;
        const parkingStatus = obj.parkingStatus || undefined;

        if (!id || !name || !email || !apartment || !lockerLocation || !leaseDate || !parkingStatus) {
            throw new Error("Admin instance was not created. Invalid data.");
        }

        return new this(id, name, email, apartment, lockerLocation, leaseDate, parkingStatus);
    }
}