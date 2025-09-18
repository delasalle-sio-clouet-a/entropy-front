export class LoginForm extends HTMLElement {
    //////////////////
    // constructeur //
    //////////////////
    constructor() {
        super();
        // créer un sous-document pour y ajouter des éléments HTML
        this.attachShadow({ mode: "open" });
        // création des éléments
        this.container = document.createElement("div");
        this.container.style.position = "fixed";
        this.container.style.left = "0";
        this.container.style.right = "0";
        this.container.style.bottom = "0";
        this.container.style.top = "0";
        this.shadowRoot.appendChild(this.container);
        this.insertHtml();
        this.loginInput = this.shadowRoot.getElementById("login-username");
        this.passwordInput = this.shadowRoot.getElementById("login-password");
        this.submitButton = this.shadowRoot.getElementById("login-submit");
        this.signupButton = this.shadowRoot.getElementById("login-signup-btn");
        // ajouter les events aux boutons
        this.submitButton.addEventListener("click", (event) => {
            // todo
        });
        this.signupButton.addEventListener("click", (event) => {
            this.application.showSignup();
        });
    }
    ////////////////////////
    // méthodes publiques //
    ////////////////////////
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
        <h2 style="text-align:center">Se connecter</h2>
            <table style="margin:auto;padding:15px;border:1px #555;border-radius:9px">
                <tr>
                    <td>Nom d'utilisateur :</td>
                    <td>
                        <input type="text" id="login-username">
                    </td>
                </tr>
                <tr>
                    <td>Mot de passe :</td>
                    <td>
                        <input type="password" id="login-password">
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
            <button style="font-size:0.8em" id="login-signup-btn">Créer un compte</a>
        </div>
        `;
        this.container.innerHTML = html;
    }
}
customElements.define("login-form", LoginForm);
