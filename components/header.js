class Header extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                header {
                    background: #37474F;
                    color: white;
                    text-align: center;
                    padding: 15px 0;
                    font-size: 1.5rem;
                }
            </style>
            <header>
                <h1>Proyecto I Parcial</h1>
            </header>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}
customElements.define('my-header', Header);
