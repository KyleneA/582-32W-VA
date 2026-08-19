export class PostCard extends HTMLElement {
    constructor() {
        super();

        this._postDetails = null;
        this.__isExpanded = false;
        this._isManagePage = false 

        const shadow = this.attachShadow({
            mode: "open"
        });

        const template = document.getElementById("template-post");
        const clone = template.content.cloneNode(true);

        shadow.appendChild(clone);
    }

    set postDetails(value) {
        this._postDetails = value;
    }

    get postDetails() {
        return this._postDetails;
    }

    set isExpanded(value) {
        if (typeof value === "boolean") {
            this.__isExpanded = value;
        }
    }

    get isExpanded() {
        return this.__isExpanded;
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
        const post = this.postDetails;

        const tag = card.querySelector("div.post-details p.content-type");
        tag.textContent = post.category;
        
        // options: "to give away", "in search of", "something to share"
        if (post.category === "to give away") {
            tag.style.backgroundColor = "#003CA3";
        }

        if (post.category === "in search of") {
            tag.style.backgroundColor = "#008048";
        }

        if (post.category === "something to share") {
            tag.style.backgroundColor = "#A36300";
        }

        card.querySelector("div.post-details p.content-date").textContent = post.createdAt;

        card.querySelector(".title").textContent = post.title;

        card.querySelector("div.details-div div.detail p.author").textContent = post.authorDisplayName;

        card.querySelector("div.details-div div.detail p.duration").textContent = post.duration;

        card.querySelector("div.details-div div.detail p.contact").textContent = post.contactInfo;

        const body = card.querySelector("div.body-div p.body");
        body.textContent = post.body;

        const image = card.querySelector("div.image");
        const textContentDiv = card.querySelector("div.text-content");
        if (!post.imageURL) {
            image.style.display = "none";
            textContentDiv.style.width = "100%";
        }

        else {
            image.style.backgroundImage = post.urlImageString;
        }

        if (this.isManagePage) {
            card.querySelector('article.post-card').className = 'post-card manage';
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
    }
}

customElements.define("post-card", PostCard);