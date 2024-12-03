class CursoForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Template reutilizable para formularios
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

                input, select {
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
                <h2>Registro de Curso</h2>
                <form id="curso-form">
                    <label for="nombre_curso">Nombre del Curso:</label>
                    <input type="text" id="nombre_curso" name="nombre_curso" required>


                    <label for="descripcion">Descripción:</label>
                    <textarea id="descripcion" name="descripcion" rows="4" required></textarea>


                    <button type="submit">Registrar Curso</button>
                </form>
            </div>
        `;
    }

    connectedCallback() {
        // Renderizamos el contenido usando el template
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));

        // Manejador del formulario
        this.shadowRoot.querySelector('#curso-form').addEventListener('submit', this.handleSubmit);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        // Capturamos los valores del formulario
        const nombre_curso = this.shadowRoot.querySelector('#nombre_curso').value;
    
        const descripcion = this.shadowRoot.querySelector('#descripcion').value;
     

        // Creamos el objeto del curso
        const newCurso = {
            nombre_curso,
           
            descripcion,
          
        };

        try {
            const response = await fetch('http://localhost:8000/cursos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCurso),
            });

            if (response.ok) {
                alert('Curso registrado correctamente');
                this.shadowRoot.querySelector('#curso-form').reset(); // Resetea el formulario
               
            } else {
                alert('Error al registrar curso');
            }
        } catch (error) {
            console.log('Error en la API:', error);
            this.shadowRoot.innerHTML = `
                <p class="error-alert">Error con la API</p>
            `;
        }
    };
}

window.customElements.define('curso-form', CursoForm);
