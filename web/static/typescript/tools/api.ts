export class Api {
    
    //////////////////////
    // attributs privés //
    //////////////////////
    private urlApi:string;
    private username:string;
    private token:string;

    //////////////////
    // constructeur //
    //////////////////
    constructor(urlApi:string) {
        this.urlApi = urlApi;
    }

    ////////////////////////
    // méthodes publiques //
    ////////////////////////
    public setUsername(username:string) { this.username = username; }
    public setToken(token:string) { this.token = token; }

    public async validateToken() {
        let url:string = this.urlApi + "/verifiertoken";

        let formData = new FormData();
        formData.append("username", this.username);

        const resultat = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + this.token,
            },
            body: formData,
            signal: AbortSignal.timeout(5000)
        });

        return resultat.json();
    }

    public async createAccount(_username:string, _password:string) {
        let url:string = this.urlApi + "/creercompte";

        let formData = new FormData();
        formData.append("username", _username);
        formData.append("password", _password);

        const resultat = await fetch(url, {
            method: 'POST',
            body: formData,
            signal: AbortSignal.timeout(5000)
        });

        return resultat.json();
    }

    public async login(_username:string, _password:string) {
        let url:string = this.urlApi + "/connexion";

        let formData = new FormData();
        formData.append("username", _username);
        formData.append("password", _password);

        const resultat = await fetch(url, {
            method: 'POST',
            body: formData,
            signal: AbortSignal.timeout(5000)
        });

        return resultat.json();
    }

    public async logout() {
        let url:string = this.urlApi + "/deconnexion";

        let formData = new FormData();
        formData.append("username", this.username);

        const resultat = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + this.token,
            },
            body: formData,
            signal: AbortSignal.timeout(5000)
        });

        return resultat.json();
    }

    public async getUsers() {
        let url:string = this.urlApi + "/dashboard/users";

        let formData = new FormData();
        formData.append("username", this.username);

        const resultat = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + this.token,
            },
            body: formData,
            signal: AbortSignal.timeout(5000)
        });

        return resultat.json();
    }
}