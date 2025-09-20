import { deleteCookie } from "../tools/cookie.js";
export class MainDashboard extends HTMLElement {
    //////////////////
    // constructeur //
    //////////////////
    constructor() {
        super();
        // création des éléments
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.left = "0";
        this.container.style.right = "0";
        this.container.style.bottom = "0";
        this.container.style.top = "0";
        // créer un sous-document pour y ajouter des éléments HTML
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(this.container);
        this.insertHtml();
        this.logoutButton = this.shadowRoot.getElementById("logout-btn");
        this.usersTable = this.shadowRoot.getElementById("users-table");
        // ajouter les events aux boutons
        this.logoutButton.addEventListener("click", (event) => {
            // le + important est de delete côté client
            // si le delete côté serveur plante, on n'annule pas la déconnexion client
            deleteCookie("auth_login");
            deleteCookie("auth_token");
            let requeteLogout = this.application.api.logout();
            requeteLogout.then((resultat) => {
                // réinitialiser les identifiants de l'api
                this.application.api.setToken(null);
                this.application.api.setUsername(null);
                // rediriger vers la page de login
                this.application.showLogin();
                this.application.showSuccessMessage("Déconnexion réussie.");
            });
            requeteLogout.catch((reason) => {
                // réinitialiser les identifiants de l'api
                this.application.api.setToken(null);
                this.application.api.setUsername(null);
                // rediriger vers la page de login
                this.application.showLogin();
                this.application.showSuccessMessage("Déconnexion réussie.");
            });
        });
    }
    setApplication(app) { this.application = app; }
    //////////////////////
    // méthodes privées //
    //////////////////////
    connectedCallback() {
        // affichage des éléments
        // style
        const style = document.createElement("style");
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
        table {
            min-width: 33%;
            background: #111;
            margin: auto;
            padding: 10px;
            border: 1px solid #555;
            border-radius: 9px;
        }
        `;
        this.shadowRoot.appendChild(style);
    }
    insertHtml() {
        let html = `
        <h2>Open Web Unsecured School Project</h2>
        <hr><br/>
        <h2 style="text-align:center">Dashboard</h2>
        <button type="button" id="logout-btn" style="display:block;margin:auto;width:20%">Déconnexion</button><br/>
        <h3 style="text-align:center">Liste des utilisateurs :</h3><br/>

        <table id="users-table">
        </table>
        `;
        this.container.innerHTML = html;
    }
    resetInputs() {
        // vider la liste des utilisateurs
        while (this.usersTable.rows.length > 0) {
            this.usersTable.deleteRow(0);
        }
    }
    fillUsersList() {
        // récupérer la liste des utilisateurs et les intégrer dans le tableau
        let requeteUsers = this.application.api.getUsers();
        requeteUsers.then((resultat) => {
            if (resultat["statut"] == 0) {
                this.application.showErrorMessage("Le chargement des données a échoué. Veuillez réessayer.");
            }
            else {
                resultat["Users"].forEach(element => {
                    let row = this.usersTable.insertRow();
                    let cell1 = row.insertCell();
                    let cell2 = row.insertCell();
                    cell1.innerText = element["id"];
                    cell2.innerText = element["username"];
                });
            }
        });
        requeteUsers.catch((reason) => {
            this.application.showErrorMessage("Le chargement des données a échoué. Veuillez réessayer.");
        });
    }
}
customElements.define("main-dashboard", MainDashboard);
