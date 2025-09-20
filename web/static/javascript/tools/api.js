export class Api {
    //////////////////
    // constructeur //
    //////////////////
    constructor(urlApi) {
        this.urlApi = urlApi;
    }
    ////////////////////////
    // méthodes publiques //
    ////////////////////////
    setUsername(username) { this.username = username; }
    setToken(token) { this.token = token; }
    async validateToken() {
        let url = this.urlApi + "/verifiertoken";
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
    async createAccount(_username, _password) {
        let url = this.urlApi + "/creercompte";
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
    async login(_username, _password) {
        let url = this.urlApi + "/connexion";
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
    async logout() {
        let url = this.urlApi + "/deconnexion";
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
    async getUsers() {
        let url = this.urlApi + "/dashboard/users";
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
