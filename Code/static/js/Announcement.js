export default class Announcement {
    constructor(
        id, 
        title, 
        body, 
        createdAt, 
        authorId, 
        affectedArea, 
        urgency, 
        startDate, 
        endDate, 
        imageURL
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createAt = createdAt;
        this.authorId = authorId;
        this.affectedArea = affectedArea.split(",").join(", ");
        this.urgency = urgency;
        this.startDate = startDate.substring(0, startDate.length - 12);
        this.endDate = endDate.substring(0, startDate.length - 12);
        this.imageURL = imageURL;
    }

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

        return "-";
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
        const authorId = obj.authorId || undefined;
        const affectedArea = obj.affectedArea || undefined;
        const urgency = obj.urgency || undefined;
        const startDate = obj.startDate || "";
        const endDate = obj.endDate || "";
        const imageURL = obj.imageURL || "";
        
        console.log(id, title, body, createdAt, authorId, affectedArea, urgency, startDate, endDate, imageURL);
        console.log(obj);

        if (!id || !title || !body || !createdAt || !authorId || !affectedArea || !urgency) {
            throw new Error("Announcement instance was not created. Invalid data.")
        }

        return new this(id, title, body, createdAt, authorId, affectedArea, urgency, startDate, endDate, imageURL);
    }
}