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
    insertHtml() {
        let html = `
        <h2>Open Web Unsecured School Project</h2>
        <hr><br/>
        <h2 style="text-align:center">Dashboard</h2>
            <table style="margin:auto;padding:15px;border:1px #555;border-radius:9px;min-width:500px">
                <tr>
                    <td style="width:50%">Nom d'utilisateur :</td>
                    <td style="width:50%">
                        <input type="text" id="login-username" style="width:95%">
                    </td>
                </tr>
                <tr>
                    <td>Mot de passe :</td>
                    <td>
                        <input type="password" id="login-password" style="width:95%">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <button type="button" id="login-submit">Envoyer</button>
                    </td>
                </tr>
            </table>
        <br/>
        <div style="text-align:center">
            <i style="font-size:0.7em">Pas de compte ? -></i> <button style="font-size:0.8em" id="login-signup-btn">Créer un compte</a>
        </div>
        `;
        this.container.innerHTML = html;
    }
}
customElements.define("main-dashboard", MainDashboard);
