class InscripcionesList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

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
                <h2>Listado de Inscripciones</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Estudiante:</th>
                            <th>Curso</th>
                            <th>Fecha Inscripción</th>
                        </tr>
                    </thead>
                    <tbody id="inscripciones-list-body">
                        <!-- Las inscripciones se insertarán aquí -->
                    </tbody>
                </table>
            </div>
        `;
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.fetchData('http://localhost:8000/inscripciones');
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                this.render(data);
            } else {
                this.shadowRoot.querySelector('#inscripciones-list-body').innerHTML = `
                    <tr><td colspan="3" class="error-alert">No se encontraron inscripciones.</td></tr>
                `;
            }
        } catch (error) {
            console.log('Error en la API:', error);
            this.shadowRoot.querySelector('#inscripciones-list-body').innerHTML = `
                <tr><td colspan="3" class="error-alert">Error al obtener las inscripciones.</td></tr>
            `;
        }
    }

render = (inscripciones) => {
    const tbody = this.shadowRoot.querySelector('#inscripciones-list-body');
    tbody.innerHTML = '';

    inscripciones.forEach(inscripcion => {
        const fecha = new Date(inscripcion.fecha_inscripcion).toLocaleDateString('es-ES');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${inscripcion.nombres}</td>
            <td>${inscripcion.nombre_curso}</td>
            <td>${fecha}</td>
        `;
        tbody.appendChild(tr);
    });
}

}

window.customElements.define('inscripciones-list', InscripcionesList);
