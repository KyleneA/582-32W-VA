export class AnnouncementCard extends HTMLElement {
    constructor() {
        super();

        this._announcementDetails = null;
        this.__isExpanded = false;
        this._highlight = false;
        this._section = null

        const shadow = this.attachShadow({
            mode: "open"
        });

        const template = document.getElementById("template-announcement");
        const clone = template.content.cloneNode(true);

        shadow.appendChild(clone);
    }

    set announcementDetails(value) {
        this._announcementDetails = value;
    }

    get announcementDetails() {
        return this._announcementDetails;
    }

    set isExpanded(value) {
        if (typeof value === "boolean") {
            this.__isExpanded = value;
        }
    }

    get isExpanded() {
        return this.__isExpanded;
    }

    set highlight(value) {
        if (typeof value === "boolean") {
            this._highlight = value;
        }    
    }

    get highlight() {
        return this._highlight;
    }

    set section(value) {
        this._section = value;
    }

    get section() {
        return this._section;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const card = this.shadowRoot;
        const announcement = this.announcementDetails;

        card.querySelector(".title").textContent = announcement.title;

        card.querySelector("div.details-div div.detail p.area").textContent = announcement.affectedArea;

        card.querySelector("div.details-div div.detail p.urgency").textContent = announcement.urgency;

        card.querySelector("div.details-div div.detail p.duration").textContent = announcement.duration;

        const body = card.querySelector("div.body-div p.body");
        body.textContent = announcement.body;

        const image = card.querySelector("div.image");
        if (!announcement.imageURL) {
            image.style.display = "none";
        }

        else {
            image.style.backgroundImage = announcement.urlImageString;
        }

        const expandBtn = card.querySelector("button.btn.expand")
        const cardContents = card.querySelector(".card-contents");

        expandBtn.addEventListener("click", () => {
            if (!this.isExpanded) {
                body.className = "body expanded";
                cardContents.className = "card-contents expanded";
                expandBtn.textContent = "Minimize";
                
                this.isExpanded = true;
                return;
            }
            
            if (this.isExpanded) {
                body.className = "body";
                cardContents.className = "card-contents";
                expandBtn.textContent = "See details";
                
                this.isExpanded = false;
                return;
            }
        });

        const closeBtn = card.querySelector("button.btn.close");
        const immediateAnnouncementsSection = this.section;
        const main = document.querySelector("main");
        
        closeBtn.addEventListener("click", () => {
            immediateAnnouncementsSection.removeChild(this);
            
            if (!immediateAnnouncementsSection.childNode) {
                main.removeChild(immediateAnnouncementsSection.parentElement);
            }
        })

        if (!this.highlight) {
            closeBtn.style.display = "none";
        }
    }
}

customElements.define("announcement-card", AnnouncementCard);