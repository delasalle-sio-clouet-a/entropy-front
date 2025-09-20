declare let urlApi; // valeur fournie par le document

export class CreerCompte {
    
    //////////////////////
    // attributs privés //
    //////////////////////
    private loginInput:HTMLInputElement;
    private passwordInput:HTMLInputElement;

    //////////////////
    // constructeur //
    //////////////////
    constructor() {
        // récupérer les éléments du document
        this.loginInput = <HTMLInputElement>document.getElementById("loginInput");
        this.passwordInput = <HTMLInputElement>document.getElementById("passwordInput");
    }
}