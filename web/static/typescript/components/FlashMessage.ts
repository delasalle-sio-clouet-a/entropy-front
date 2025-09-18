export class FlashMessage extends HTMLElement {
    private container:HTMLDivElement;
    private paragraph:HTMLParagraphElement;
    private fadeOutTime:number; // durée avant que le message disparaisse, en millisecondes

    constructor() {
        super();

        // création des éléments
        this.container = document.createElement("div");
        this.container.style.position = "fixed";
        this.container.style.left = "25px"; this.container.style.right = "25px"; this.container.style.bottom = "25px";
        this.container.style.border = "2px solid black"; this.container.style.borderRadius = "11px";

        this.paragraph = document.createElement("p");
        this.paragraph.style.textAlign = "center"; this.paragraph.style.fontWeight = "bold";
        this.paragraph.style.fontSize = "1em";

        this.fadeOutTime = 1000; // valeur par défaut, sera redéfinie avec setType()

        // créer un sous-document pour y ajouter des éléments HTML
        this.attachShadow({mode:"open"});
    }

    connectedCallback() {
        // affichage des éléments
        // style
        const style:HTMLStyleElement = document.createElement("style");
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
        `;
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(this.container); this.container.appendChild(this.paragraph);
    }

    public setMessage(_message:string) { this.paragraph.innerText = _message; }
    public setType(_type:string) {
        if(_type.toLowerCase() == "success") {
            // changer les couleurs et la durée du timeout avant le fade out
            this.fadeOutTime = 2500;
            this.paragraph.style.color = "#006600"; // vert foncé
            this.container.style.border = "2px solid #006600"; // vert foncé
            this.container.style.background = "#e6ffe6"; // vert clair
        }
        else if(_type.toLowerCase() == "error") {
            // changer les couleurs et la durée du timeout avant le fade out
            this.fadeOutTime = 4500;
            this.paragraph.style.color = "#660000"; // rouge foncé
            this.container.style.border = "2px solid #660000"; // rouge foncé
            this.container.style.background = "#ffe6e6"; // rouge clair
        }
        else { } // le rien faire si le nouveau type est inconnu
    }

    public show() {
        setTimeout(this.fadeOut, this.fadeOutTime, this.container); // disparaître après X secondes
    }

    fadeOut(element:HTMLElement) {
        let duration:number = 2000;
        let opacity = 1;  // Opacité initiale (complètement visible)
        const intervalTime = 25;  // Temps entre chaque mise à jour (en ms)
        const decrement = intervalTime / duration;  // Décrément de l'opacité par intervalle

        const interval = setInterval(() =>
        {
            opacity -= decrement;
            if (opacity <= 0) {
                clearInterval(interval);
                opacity = 0;
                element.style.display = 'none';  // Cacher l'élément une fois l'effet terminé
            }
            element.style.opacity = opacity.toString();
        }, intervalTime);
    }
}

customElements.define("flash-message", FlashMessage);