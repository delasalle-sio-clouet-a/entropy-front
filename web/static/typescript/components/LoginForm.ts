import { Application } from "../application.js";
import { writeCookie } from "../tools/cookie.js";

export class LoginForm extends HTMLElement {

    //////////////////////
    // attributs privés //
    //////////////////////
    private container:HTMLDivElement;
    private loginInput:HTMLInputElement;
    private passwordInput:HTMLInputElement;
    private submitButton:HTMLButtonElement;
    private signupButton:HTMLButtonElement;

    private application:Application;

    //////////////////
    // constructeur //
    //////////////////
    constructor() {
        super();

        // créer un sous-document pour y ajouter des éléments HTML
        this.attachShadow({mode:"open"});

        // création des éléments
        this.container = document.createElement("div");
        this.container.style.position = "fixed";
        this.container.style.left = "0"; this.container.style.right = "0";
        this.container.style.bottom = "0"; this.container.style.top = "0";

        this.shadowRoot.appendChild(this.container);
        this.insertHtml();

        this.loginInput = <HTMLInputElement>this.shadowRoot.getElementById("login-username");
        this.passwordInput = <HTMLInputElement>this.shadowRoot.getElementById("login-password");

        this.submitButton = <HTMLButtonElement>this.shadowRoot.getElementById("login-submit");
        this.signupButton = <HTMLButtonElement>this.shadowRoot.getElementById("login-signup-btn");

        // ajouter les events aux boutons
        this.submitButton.addEventListener("click", (event) => {
            this.submitButton.disabled = true;
            this.signupButton.disabled = true;
            let loginSaisie:string = this.loginInput.value;
            let passwordSaisie:string = this.passwordInput.value;
            
            if(loginSaisie.trim().length <= 0 || passwordSaisie.trim().length <= 0) {
                this.application.showErrorMessage("Identifiants invalides.");
                this.submitButton.disabled = false;
                this.signupButton.disabled = false;
            }
            else {
                let requeteConnexion = this.application.api.login(loginSaisie, passwordSaisie);
                requeteConnexion.then((resultat) => {
                    this.submitButton.disabled = false;
                    this.signupButton.disabled = false;
                    if(resultat["statut"] == 1) {
                        // connexion acceptée = écriture des cookies (username+token) et affichage dashboard
                        writeCookie("auth_login", loginSaisie);
                        writeCookie("auth_token", resultat["token"]);
                        this.application.api.setUsername(loginSaisie);
                        this.application.api.setToken(resultat["token"]);
                        this.application.showDashboard();
                        this.application.showSuccessMessage("Connexion réussie.");
                    } else {
                        // connexion refusée = afficher un message d'erreur
                        this.application.showErrorMessage("Identifiants invalides.");
                    }
                });
                requeteConnexion.catch((reason) => {
                    this.submitButton.disabled = false;
                    this.signupButton.disabled = false;
                    this.application.showErrorMessage("Une erreur est survenue. Veuillez réessayer.");
                });
                // todo : appel api
            }
        });

        this.signupButton.addEventListener("click", (event) => {
            this.application.showSignup();
        });
    }

    ////////////////////////
    // méthodes publiques //
    ////////////////////////
    public setApplication(app:Application) { this.application = app; }

    public resetInputs() {
        this.loginInput.value = null;
        this.passwordInput.value = null;
    }



    //////////////////////
    // méthodes privées //
    //////////////////////
    connectedCallback() {
        // affichage des éléments
        // style
        const style:HTMLStyleElement = document.createElement("style");
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

    private insertHtml() {
        let html = `
        <h2>Open Web Unsecured School Project</h2>
        <hr><br/>
        <h2 style="text-align:center">Se connecter</h2>

        <table style="margin:auto;padding:15px;border:1px solid #555;border-radius:9px;min-width:500px">
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
                    <button type="button" id="login-submit" style="display:block;margin:auto;width:33%">Envoyer</button>
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

customElements.define("login-form", LoginForm);