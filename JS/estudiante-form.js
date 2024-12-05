class EstudianteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                .form-container {
                    max-width: 500px;
                    margin: auto;
                    padding: 20px;
                    background-color: #f4f4f4;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .form-container h2 {
                    text-align: center;
                    margin-bottom: 20px;
                }

                label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: bold;
                }

                input {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #00796b;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #004d40;
                }

                .error-alert {
                    color: red;
                    font-size: 1.5rem;
                    text-align: center;
                }
            </style>
            <div class="form-container">
                <h2>Registro de Estudiante</h2>
                <form id="estudiante-form">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required>

                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" required>

                    <label for="correo">Correo:</label>
                    <input type="email" id="correo" name="correo" required>

                    <button type="submit">Registrar Estudiante</button>
                </form>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        this.shadowRoot.querySelector('#estudiante-form').addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

       
        const nombre = this.shadowRoot.querySelector('#nombre').value;
        const apellido = this.shadowRoot.querySelector('#apellido').value;
        const correo = this.shadowRoot.querySelector('#correo').value;

     
        const newEstudiante = { nombre, apellido, correo };

        try {
            const response = await fetch('http://localhost:8000/estudiantes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEstudiante),
            });

            if (response.ok) {
                alert('Estudiante registrado correctamente');
                this.shadowRoot.querySelector('#estudiante-form').reset();
                window.location.reload();
               
            } else {
                alert('Error al registrar estudiante');
            }
        } catch (error) {
            console.log('Error en la API:', error);
            this.shadowRoot.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    };
}

window.customElements.define('estudiante-form', EstudianteForm);
