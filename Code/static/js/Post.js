export default class Post {
    constructor(
        id, 
        title, 
        body, 
        createdAt,
        status, 
        authorId, 
        category,
        isApproved,
        contactInfo,
        startDate,
        endDate,
        imageURL
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.status = status;
        this.authorId = authorId;
        this.category = category;
        this.isApproved = isApproved;
        this.contactInfo = contactInfo;
        this.startDate = startDate.substring(0, startDate.length - 12);
        this.endDate = endDate.substring(0, startDate.length - 12);
        this.imageURL = imageURL;
    }

    // will do on backend
    // set isApproved(value) {
    //     if (typeof(value) === "boolean") {
    //         this.__isApproved = value;
    //     }

    //     else {
    //         throw new Error("isApproved must be a boolean value.")
    //     }
    // }

    // get isApproved() {
    //     return this.__isApproved;
    // }

    get duration(){
        if (this.startDate && this.endDate) {
            return `${this.startDate} to ${this.endDate}`;
        }

        else if (this.startDate) {
            return `From ${this.startDate}`;
        }

        else if (this.endDate) {
            return `Until ${this.startDate}`;
        }

        return "n/a";
    }

    get urlImageString() {
        return `url(${this.imageURL})`;
    }

    get classLabel() {
        return `<Announcement | ${this.id}>`
    }

    static fromObject(obj) {
        const id = obj.id || undefined;
        const title = obj.title || undefined;
        const body = obj.body || undefined;
        const createdAt = obj.createdAt || undefined;
        const status = obj.status || undefined;
        const authorId = obj.authorId || undefined;
        const category = obj.category || undefined;
        const isApproved = obj.isApproved || undefined;
        const contactInfo = obj.contactInfo || "";
        const startDate = obj.startDate || "";
        const endDate = obj.endDate || "";
        const imageURL = obj.imageURL || "";        
        
        if (!id || !title || !body || !createdAt || !status || !authorId || !category || !isApproved ) {
            throw new Error("Announcement instance was not created. Invalid data.")
        }

        return new this(id, title, body, createdAt, status, authorId, category, isApproved, contactInfo, startDate, endDate, imageURL);
    }
}