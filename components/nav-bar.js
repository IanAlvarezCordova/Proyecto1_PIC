class NavBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                nav {
                    display: flex;
                    justify-content: space-around;
                    background: #2c3e50;
                    color: white;
                    padding: 10px 0;
                    font-family: Arial, sans-serif;
                }

                a {
                    text-decoration: none;
                    color: white;
                    font-size: 1.2rem;
                    transition: color 0.3s ease;
                }

                a:hover {
                    color: #1abc9c;
                }

                .active {
                    font-weight: bold;
                    color: #1abc9c;
                }
            </style>
            <nav>
                <a href="#inicio" class="nav-link active" data-target="inicio">Inicio</a>
                <a href="#estudiantes" class="nav-link" data-target="estudiantes">Estudiantes</a>
                <a href="#cursos" class="nav-link" data-target="cursos">Cursos</a>
                <a href="#inscripciones" class="nav-link" data-target="inscripciones">Inscripciones</a>
                <a href="#acerca-de" class="nav-link" data-target="acerca-de">Acerca de</a>
            </nav>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('.nav-link').forEach(link =>
            link.addEventListener('click', this.handleNavigation)
        );
    }

    handleNavigation = (event) => {
        event.preventDefault();

        const links = this.shadowRoot.querySelectorAll('.nav-link');
        links.forEach(link => link.classList.remove('active'));

        const clickedLink = event.target;
        clickedLink.classList.add('active');

        const targetSection = clickedLink.dataset.target;

        // Dispatch custom event for navigation
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { section: targetSection },
                bubbles: true,
                composed: true,
            })
        );
    };
}

customElements.define('nav-bar', NavBar);
