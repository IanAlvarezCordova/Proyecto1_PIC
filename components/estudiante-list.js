class EstudianteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Template reutilizable para tablas
        this.template = document.createElement('template');
        this.template.innerHTML = `
            <style>
                .table-container {
                    max-width: 900px;
                    margin: auto;
                    padding: 20px;
                    background-color: #f4f4f4;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    margin-top: 20px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 12px;
                    text-align: left;
                    border: 1px solid #ddd;
                }

                th {
                    background-color: #00796b;
                    color: white;
                }

                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                button {
                    padding: 6px 12px;
                    background-color: #d32f2f;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #b71c1c;
                }

                .error-alert {
                    color: red;
                    font-size: 1.5rem;
                    text-align: center;
                }
            </style>
            <div class="table-container">
                <h2>Listado de Estudiantes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="estudiante-rows"></tbody>
                </table>
            </div>
            <br> <br>
        `;
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.fetchEstudiantes();
    }

    async fetchEstudiantes() {
        try {
            const response = await fetch('http://localhost:8000/estudiantes');
            const estudiantes = await response.json();
            this.renderEstudiantes(estudiantes);
        } catch (error) {
            this.shadowRoot.innerHTML = `
                <p class="error-alert">Error al cargar estudiantes</p>
            `;
        }
    }

    renderEstudiantes(estudiantes) {
        const tbody = this.shadowRoot.querySelector('#estudiante-rows');
        tbody.innerHTML = estudiantes.map(estudiante => `
            <tr>
                <td>${estudiante.id_estudiante}</td>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.apellido}</td>
                <td>${estudiante.correo}</td>
                <td class="actions">
                    <button data-id="${estudiante.id_estudiante}" class="delete-btn">Eliminar</button>
                </td>
            </tr>
        `).join('');

        this.addEventListeners();
    }

    addEventListeners() {
        const buttons = this.shadowRoot.querySelectorAll('.delete-btn');
        buttons.forEach(button => button.addEventListener('click', this.handleDelete));
    }

    async handleDelete(event) {
        const id = event.target.dataset.id;

        try {
            const response = await fetch(`http://localhost:8000/estudiantes/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Estudiante eliminado correctamente');
                this.fetchEstudiantes();
            } else {
                alert('Error al eliminar estudiante');
            }
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
        }
    }
}

window.customElements.define('estudiante-list', EstudianteList);
