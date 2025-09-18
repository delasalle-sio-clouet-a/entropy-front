export class MainDashboard extends HTMLElement {
    //////////////////
    // constructeur //
    //////////////////
    constructor() {
        super();
        // création des éléments
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.left = "0";
        this.container.style.right = "0";
        this.container.style.bottom = "0";
        this.container.style.top = "0";
        // créer un sous-document pour y ajouter des éléments HTML
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(this.container);
    }
    setApplication(app) { this.application = app; }
    //////////////////////
    // méthodes privées //
    //////////////////////
    connectedCallback() {
        // affichage des éléments
        // style
        const style = document.createElement("style");
        style.textContent = `
        div {
            opacity: 100%;
        }
        div
        input {
            background: #222;
            color: #eee;
            transition-duration: 0.2s;
            width: 100%;
            border: 1px solid #555;
            border-radius: 7px;
            padding: 5px;
        }
        input:focus {
            background: #373737;
            color: #fff;
            transition-duration: 0.2s;
        }
        button {
            background: #222;
            color: #eee;
            transition-duration: 0.2s;
            border: 1px solid #555;
            border-radius: 9px;
            padding: 5px;
        }
        button:hover {
            background: #373737;
            transition-duration: 0.2s;
        }
        `;
        this.shadowRoot.appendChild(style);
    }
}
customElements.define("main-dashboard", MainDashboard);
