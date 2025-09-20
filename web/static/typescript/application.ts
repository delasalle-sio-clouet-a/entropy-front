import { LoginForm } from "./components/LoginForm.js";
import { SignupForm } from "./components/SignupForm.js";
import { MainDashboard } from "./components/MainDashboard";
import { FlashMessage } from "./components/FlashMessage.js";
import { getCookie, deleteCookie, writeCookie } from "./tools/cookie.js";
import { Api } from "./tools/api.js";

declare let urlApi; // valeur fournie par le document
declare let minEntropy; // valeur fournie par le document
declare let maxRedundancy; // valeur fournie par le document

export class Application {

    //////////////////////
    // attributs privés //
    //////////////////////
    private loginElement:LoginForm;
    private signupElement:SignupForm;
    private dashboardElement:MainDashboard;

    private userLogin:string;
    private userToken:string;

    ///////////////////////
    // attributs publics //
    ///////////////////////
    public api:Api;

    //////////////////
    // constructeur //
    //////////////////
    constructor() {
        this.api = new Api(urlApi);
        this.startApplication(); // démarrage de l'application
    }

    private startApplication() {
        this.userLogin = getCookie("auth_login");
        this.userToken = getCookie("auth_token");
        this.api.setToken(this.userToken);
        this.api.setUsername(this.userLogin);

        this.loginElement = <LoginForm>document.getElementById("loginForm");
        this.loginElement.setApplication(this);
        this.signupElement = <SignupForm>document.getElementById("signupForm");
        this.signupElement.setApplication(this);
        this.dashboardElement = <MainDashboard>document.getElementById("mainDashboard");
        this.dashboardElement.setApplication(this);

        let verificationToken = this.api.validateToken();
        verificationToken.then((resultat) => {
            if(resultat["statut"] == 1) {
                // utilisateur déjà connecté + token valide = afficher le dashboard
                this.showDashboard();
            } else {
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

    public showDashboard() {
        this.dashboardElement.style.display = null;
        this.dashboardElement.fillUsersList();
        this.loginElement.style.display = "none";
        this.loginElement.resetInputs();
        this.signupElement.style.display = "none";
        this.signupElement.resetInputs();
        document.title = "OWUSP - Dadhboard";
    }
    public showLogin() {
        this.dashboardElement.style.display = "none";
        this.dashboardElement.resetInputs();
        this.loginElement.style.display = null;
        this.loginElement.resetInputs();
        this.signupElement.style.display = "none";
        this.signupElement.resetInputs();
        document.title = "OWUSP - Se connecter";
    }
    public showSignup() {
        this.dashboardElement.style.display = "none";
        this.dashboardElement.resetInputs();
        this.loginElement.style.display = "none";
        this.loginElement.resetInputs();
        this.signupElement.style.display = null;
        this.signupElement.resetInputs();
        document.title = "OWUSP - S'inscrire";
    }


    public showErrorMessage(message:string) {
        let flash = new FlashMessage();
        flash.setType("error");
        flash.setMessage(message);
        document.body.appendChild(flash);
        flash.show();
    }
    public showSuccessMessage(message:string) {
        let flash = new FlashMessage();
        flash.setType("success");
        flash.setMessage(message);
        document.body.appendChild(flash);
        flash.show();
    }
}

let app = new Application(); // démarrage de l'application