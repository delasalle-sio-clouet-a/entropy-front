import { FlashMessage } from "./components/FlashMessage.js";
import { getCookie } from "./tools/cookie.js";
import { Api } from "./tools/api.js";
export class Application {
    //////////////////
    // constructeur //
    //////////////////
    constructor() {
        this.api = new Api(urlApi);
        this.startApplication(); // démarrage de l'application
    }
    startApplication() {
        this.userLogin = getCookie("auth_login");
        this.userToken = getCookie("auth_token");
        this.api.setToken(this.userToken);
        this.api.setUsername(this.userLogin);
        this.loginElement = document.getElementById("loginForm");
        this.loginElement.setApplication(this);
        this.signupElement = document.getElementById("signupForm");
        this.signupElement.setApplication(this);
        this.dashboardElement = document.getElementById("mainDashboard");
        this.dashboardElement.setApplication(this);
        let verificationToken = this.api.validateToken();
        verificationToken.then((resultat) => {
            if (resultat["statut"] == 1) {
                // utilisateur déjà connecté + token valide = afficher le dashboard
                this.showDashboard();
            }
            else {
                // token invalide = afficher la page de connexion
                this.showLogin();
            }
        });
        verificationToken.catch((reason) => {
            // afficher la page de connexion
            this.showLogin();
        });
        // si token valide -> afficher dashboard
        // sinon : afficher login
    }
    showDashboard() {
        this.dashboardElement.style.display = null;
        this.dashboardElement.fillUsersList();
        this.loginElement.style.display = "none";
        this.loginElement.resetInputs();
        this.signupElement.style.display = "none";
        this.signupElement.resetInputs();
        document.title = "OWUSP - Dadhboard";
    }
    showLogin() {
        this.dashboardElement.style.display = "none";
        this.dashboardElement.resetInputs();
        this.loginElement.style.display = null;
        this.loginElement.resetInputs();
        this.signupElement.style.display = "none";
        this.signupElement.resetInputs();
        document.title = "OWUSP - Se connecter";
    }
    showSignup() {
        this.dashboardElement.style.display = "none";
        this.dashboardElement.resetInputs();
        this.loginElement.style.display = "none";
        this.loginElement.resetInputs();
        this.signupElement.style.display = null;
        this.signupElement.resetInputs();
        document.title = "OWUSP - S'inscrire";
    }
    showErrorMessage(message) {
        let flash = new FlashMessage();
        flash.setType("error");
        flash.setMessage(message);
        document.body.appendChild(flash);
        flash.show();
    }
    showSuccessMessage(message) {
        let flash = new FlashMessage();
        flash.setType("success");
        flash.setMessage(message);
        document.body.appendChild(flash);
        flash.show();
    }
}
let app = new Application(); // démarrage de l'application
