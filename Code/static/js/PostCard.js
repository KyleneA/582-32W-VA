export class PostCard extends HTMLElement {
    constructor() {
        super();

        this._postDetails = null;
        this.__isExpanded = false;

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
        return this._postDetails
    }

    set isExpanded(value) {
        if (typeof value === "boolean") {
            this.__isExpanded = value;
        }
    }

    get isExpanded() {
        return this.__isExpanded;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const card = this.shadowRoot;
        const post = this.postDetails;

        
    }
}

customElements.define("post-card", PostCard);