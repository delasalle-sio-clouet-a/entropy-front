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
        console.log(url);
        let formData = new FormData();
        formData.append("username", this.username);
        console.log(formData);
        const resultat = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + this.token,
            },
            body: formData,
            signal: AbortSignal.timeout(3000)
        });
        return resultat.json();
    }
}
