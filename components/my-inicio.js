class MyInicio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Template para el contenido del elemento
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .inicio-container {
                    text-align: center;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }

                h2 {
                    color: #37474F;
                    font-size: 2rem;
                    margin-bottom: 10px;
                }

                p {
                    color: #555;
                    font-size: 1.2rem;
                }
            </style>
            <div class="inicio-container">
                <h2>Bienvenido al Sistema de Gestión de Cursos y Estudiantes</h2>
                <p>Seleccione una opción del menú para comenzar.</p>
            </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

// Definimos el custom element
customElements.define('my-inicio', MyInicio);
