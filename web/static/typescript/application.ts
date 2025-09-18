import { LoginForm } from "./components/LoginForm.js";
import { SignupForm } from "./components/SignupForm.js";
import { MainDashboard } from "./components/MainDashboard";
import { FlashMessage } from "./components/FlashMessage.js";
import { getCookie, deleteCookie, writeCookie } from "./tools/cookie.js";
import { Api } from "./tools/api.js";

declare let urlApi; // valeur fournie par le document

export class Application {

    //////////////////////
    // attributs privés //
    //////////////////////
    private loginElement:LoginForm;
    private signupElement:SignupForm;
    private dashboardElement:MainDashboard;

    private api:Api;

    private userLogin:string;
    private userToken:string;

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


        this.loginElement = <LoginForm>document.getElementById("loginForm");
        this.loginElement.setApplication(this);
        this.signupElement = <SignupForm>document.getElementById("signupForm");
        this.signupElement.setApplication(this);
        this.dashboardElement = <MainDashboard>document.getElementById("mainDashboard");
        this.dashboardElement.setApplication(this);

        // à faire : valider le token lu depuis le cookie

        // si token valide -> afficher dashboard
        // sinon : afficher login
        this.showLogin();
    }

    private showDashboard() {
        this.dashboardElement.style.display = null;
        this.loginElement.style.display = "none";
        this.signupElement.style.display = "none";
    }
    private showLogin() {
        this.dashboardElement.style.display = "none";
        this.loginElement.style.display = null;
        this.signupElement.style.display = "none";
    }
    public showSignup() {
        this.dashboardElement.style.display = "none";
        this.loginElement.style.display = "none";
        this.signupElement.style.display = null;
    }
}

let app = new Application(); // démarrage de l'application