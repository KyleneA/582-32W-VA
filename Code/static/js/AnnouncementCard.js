export class AnnouncementCard extends HTMLElement {
    constructor() {
        super();

        this._announcementDetails = null;
        this.__isExpanded = false;
        this._highlight = false;
        this._section = null;
        this._isManagePage = false;

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

    set isManagePage(value) {
        if (typeof value === "boolean") {
            this._isManagePage = value;
        }
    }

    get isManagePage() {
        return this._isManagePage;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const card = this.shadowRoot;
        const announcement = this.announcementDetails;

        card.querySelector("div.announcement-details p.content-date").textContent = announcement.createdAt;

        card.querySelector(".title").textContent = announcement.title;

        card.querySelector("div.details-div div.detail p.area").textContent = announcement.affectedArea;

        card.querySelector("div.details-div div.detail p.urgency").textContent = announcement.urgency;

        card.querySelector("div.details-div div.detail p.duration").textContent = announcement.duration;

        const body = card.querySelector("div.body-div p.body");
        body.textContent = announcement.body;

        const image = card.querySelector("div.image");
        const textContentDiv = card.querySelector("div.text-content");
        if (!announcement.imageURL) {
            image.style.display = "none";
            textContentDiv.style.width = "100%";
        }

        else {
            image.style.backgroundImage = announcement.urlImageString;
        }

        if (this.isManagePage) {
            card.querySelector('article.announcement-card').className = 'announcement-card manage';
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
            const isEmptySection = immediateAnnouncementsSection.querySelectorAll('announcement-card').length < 1;

            if (isEmptySection) {
                main.removeChild(immediateAnnouncementsSection.parentElement);
            }
        });

        if (!this.highlight) {
            closeBtn.style.display = "none";
        }
    }
}

customElements.define("announcement-card", AnnouncementCard);