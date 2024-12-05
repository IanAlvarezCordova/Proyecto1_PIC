class Footer extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');

        template.innerHTML = `
            <style>
                .footer {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 10px;
                    background-color: #333;
                    
                    color: #fff;
                    font-size: 1rem;
                    position: fixed;
                    bottom: 0;

                    left: 0;
                    width: 100%;
                }
            </style>
            <footer class="footer">
                &copy; Derechos reservados Ian Alvarez- 2024  &copy;
            </footer>
        `;

        
        shadow.appendChild(template.content.cloneNode(true));
    }
}

window.customElements.define('my-footer', Footer);
