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
        this.loginElement = document.getElementById("loginForm");
        this.loginElement.setApplication(this);
        this.signupElement = document.getElementById("signupForm");
        this.signupElement.setApplication(this);
        this.dashboardElement = document.getElementById("mainDashboard");
        this.dashboardElement.setApplication(this);
        // à faire : valider le token lu depuis le cookie
        // si token valide -> afficher dashboard
        // sinon : afficher login
        this.showLogin();
    }
    showDashboard() {
        this.dashboardElement.style.display = null;
        this.loginElement.style.display = "none";
        this.loginElement.resetInputs();
        this.signupElement.style.display = "none";
        this.signupElement.resetInputs();
        document.title = "OWUSP - Dadhboard";
    }
    showLogin() {
        this.dashboardElement.style.display = "none";
        this.loginElement.style.display = null;
        this.loginElement.resetInputs();
        this.signupElement.style.display = "none";
        this.signupElement.resetInputs();
        document.title = "OWUSP - Se connecter";
    }
    showSignup() {
        this.dashboardElement.style.display = "none";
        this.loginElement.style.display = "none";
        this.loginElement.resetInputs();
        this.signupElement.style.display = null;
        this.signupElement.resetInputs();
        document.title = "OWUSP - S'inscrire";
    }
}
let app = new Application(); // démarrage de l'application
