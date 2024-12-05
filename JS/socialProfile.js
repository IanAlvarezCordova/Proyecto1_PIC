class SocialProfile extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .perfil-container {
                    font-family: 'Arial', sans-serif;
                    background-color: #f7f7f7;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    width: 300px;
                    padding: 20px;
                    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
                    margin: 0 auto;
                    text-align: center;
                }

                .perfil-container img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 2px solid #4caf50;
                    margin-bottom: 10px;
                }

                .perfil-container h2 {
                    font-size: 1.5rem;
                    color: #333;
                    margin: 10px 0;
                }

                .perfil-container p {
                    font-size: 1rem;
                    color: #555;
                    line-height: 1.4;
                }

                .perfil-container p.highlight {
                    color: #4caf50;
                    font-weight: bold;
                }
            </style>
            <div class="perfil-container">
                <img src="./JS/yoo.jpg" alt="Foto de perfil">
                <h2>Ian Alvarez</h2>
                <p>Quito - Ecuador</p>
                <p>23 años </p>
                <p class="highlight">Desarrollador Componentes Web :)</p>
            </div>
        `;

        this.shadow.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('social-profile', SocialProfile);
