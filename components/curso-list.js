class CursoList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Template reutilizable para la tabla de cursos
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
                <h2>Listado de Cursos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                       
                            <th>Descripción</th>
                            
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="curso-list-body">
                        <!-- Los cursos se insertarán aquí -->
                    </tbody>
                </table>
            </div>
            <br> <br>
        `;
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        this.fetchData('http://localhost:8000/cursos');
    }

    fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                this.render(data);
            } else {
                this.shadowRoot.querySelector('#curso-list-body').innerHTML = `
                    <tr><td colspan="6" class="error-alert">No se encontraron cursos.</td></tr>
                `;
            }
        } catch (error) {
            console.log('Error en la API:', error);
            this.shadowRoot.querySelector('#curso-list-body').innerHTML = `
                <tr><td colspan="6" class="error-alert">Error al obtener los cursos.</td></tr>
            `;
        }
    }

    render = (cursos) => {
        const tbody = this.shadowRoot.querySelector('#curso-list-body');
        tbody.innerHTML = '';

        cursos.forEach(curso => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${curso.nombre_curso}</td>
             
                <td>${curso.descripcion}</td>
  
                <td>
                    <button class="btn-delete" data-id="${curso.id_curso}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Añadir evento a los botones de eliminar
        this.shadowRoot.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (event) => this.handleDelete(event));
        });
    }

    handleDelete = async (event) => {
        const cursoId = event.target.getAttribute('data-id');
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este curso?');

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8000/cursos/${cursoId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Curso eliminado correctamente');
                    this.fetchData('http://localhost:8000/cursos'); // Actualizamos la lista
                } else {
                    alert('Error al eliminar curso');
                }
            } catch (error) {
                console.log('Error al eliminar curso:', error);
                alert('Error al eliminar curso');
            }
        }
    }
}

window.customElements.define('curso-list', CursoList);
