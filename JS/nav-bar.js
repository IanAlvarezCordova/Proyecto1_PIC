class MenuShadow extends HTMLElement {
    constructor() {
        super();

        this.shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
  
        const opciones = [
            { item: "Inicio", link: "index.html" },
            { item: "Estudiantes", link: "estudiantes.html" },
            { item: "Cursos", link: "cursos.html" },
            { item: "Inscripciones", link: "inscripciones.html" },
            { item: "Acerca de", link: "about.html" }
        ];

        const ul = document.createElement('ul');
        ul.classList.add('menu-container');

      
        opciones.forEach(option => {
            const itemList = document.createElement('li');
            const enlace = document.createElement('a');
            enlace.textContent = option.item;
            enlace.href = option.link;
            itemList.appendChild(enlace);
            ul.appendChild(itemList); 
        });

        template.innerHTML = `
        <style>
        .menu-container {
            display: flex;
            justify-content: space-around;
            background: #2c3e50;
            padding: 10px 0;
            list-style: none;
            margin: 0;
        }

        .menu-container li {
            display: inline;
        }

        .menu-container a {
            text-decoration: none;
            color: white;
            font-size: 1.2rem;
            transition: color 0.3s ease;
            font-family: Arial, sans-serif;
            padding: 10px 20px;
            display: inline-block;
        }

        .menu-container a:hover {
            color: #1abc9c;
        }

        .menu-container a.active {
            font-weight: bold;
            color: #1abc9c;
        }
    </style>
        `;

        const shadowRoot = this.shadowRoot;
        shadowRoot.appendChild(template.content.cloneNode(true));
        shadowRoot.appendChild(ul);
    }
}

window.customElements.define('nav-bar', MenuShadow);
