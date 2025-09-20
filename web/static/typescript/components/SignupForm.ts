import { Application } from "../application.js";
import { getEntropyValue, getRedundancyValue, getEntropyTextForValue } from "../tools/entropycalculator.js";

declare let minEntropy; // valeur fournie par le document
declare let maxRedundancy; // valeur fournie par le document

export class SignupForm extends HTMLElement {

    //////////////////////
    // attributs privés //
    //////////////////////
    private container:HTMLDivElement;
    private loginInput:HTMLInputElement;
    private passwordInput:HTMLInputElement;
    private submitButton:HTMLButtonElement;
    private cancelButton:HTMLButtonElement;

    private progressBar:HTMLProgressElement;
    private progressBarText:HTMLParagraphElement;

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

        this.progressBar = <HTMLProgressElement>this.shadowRoot.getElementById("password-strength-bar");
        this.progressBarText = <HTMLParagraphElement>this.shadowRoot.getElementById("password-strength-text");

        this.submitButton = <HTMLButtonElement>this.shadowRoot.getElementById("login-submit");
        this.cancelButton = <HTMLButtonElement>this.shadowRoot.getElementById("login-cancel-btn");

        // ajouter les events aux boutons
        this.submitButton.addEventListener("click", (event) => {
            this.submitButton.disabled = true;
            this.cancelButton.disabled = true;
            let pwdInput:string = (<HTMLInputElement>this.shadowRoot.getElementById("login-password")).value;
            let entropyScore:number = getEntropyValue(pwdInput);
            let redundancyScore:number = getRedundancyValue(pwdInput);
            if(entropyScore < minEntropy) {
                this.application.showErrorMessage("Le mot de passe est trop faible. Essayez avec un mot de passe plus complexe.");
                this.submitButton.disabled = false;
                this.cancelButton.disabled = false;
            }
            else if(redundancyScore > maxRedundancy) {
                this.application.showErrorMessage("Le mot de passe est trop redondant. Essayez avec un mot de passe plus complexe.");
                this.submitButton.disabled = false;
                this.cancelButton.disabled = false;
            }
            else {
                let requeteCreation = this.application.api.createAccount(this.loginInput.value, pwdInput);
                requeteCreation.then((resultat) => {
                    this.submitButton.disabled = false;
                    this.cancelButton.disabled = false;
                    if(resultat["statut"] == 1) {
                        // compte créé = retoruner sur la page login
                        this.application.showLogin();
                        this.application.showSuccessMessage("Création réussie. Veuillez vous connecter.");
                    } else {
                        // création refusée = afficher le message d'erreur
                        this.application.showErrorMessage(resultat["message"]);
                    }
                });
                requeteCreation.catch((reason) => {
                    this.submitButton.disabled = false;
                    this.cancelButton.disabled = false;
                    this.application.showErrorMessage("Une erreur est survenue. Veuillez réessayer.");
                });
            }
        });
        this.cancelButton.addEventListener("click", (event) => {
            this.application.showLogin();
        });

        // ajouter un event sur l'input password
        this.passwordInput.addEventListener("input", (event) => {
            let input:string = (<HTMLInputElement>this.shadowRoot.getElementById("login-password")).value;
            let score:number = getEntropyValue(input);
            // mettre à jour le score et le texte affiché
            let texte:string = getEntropyTextForValue(score);
            this.progressBar.value = score;
            this.progressBarText.innerText = texte;
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
        progress {
            height: 10px;
            vertical-align: middle;
            border-radius: 5px;
            background: #111;

            /* important pour que les pseudo-éléments soient stylables */
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none
        }
        `;
        this.shadowRoot.appendChild(style);
    }

    private insertHtml() {
        let html = `
        <h2>Open Web Unsecured School Project</h2>
        <hr><br/>
        <h2 style="text-align:center">S'inscrire</h2>

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
                <td>Force du mot de passe :</td>
                <td>
                    <progress id="password-strength-bar" max="5" min="0" value="0" style="display:inline"></progress>
                    <p id="password-strength-text" style="display:inline;font-size:0.7em;vertical-align:middle">Trop faible</p>
                </td>
            <tr/>
            <tr>
                <td colspan="2">
                    <button type="button" id="login-submit" style="display:block;margin:auto;width:33%">Envoyer</button>
                </td>
            </tr>
        </table>
        
        <br/>
        <div style="text-align:center">
            <button style="font-size:0.8em;width:20%" id="login-cancel-btn">Annuler</a>
        </div>
        `;
        this.container.innerHTML = html;
    }


}

customElements.define("signup-form", SignupForm);