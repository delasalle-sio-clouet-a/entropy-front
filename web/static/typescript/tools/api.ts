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