https://github.com/IanAlvarezCordova/Proyecto1_PIC/tree/main
# Proyecto: Gestión de Estudiantes, Cursos e Inscripciones
Repositorio para la gestión de estudiantes, cursos y sus inscripciones mediante el uso de Web Components.

## Descripción del Proyecto
Este proyecto utiliza **Web Components** para crear una aplicación modular que gestiona estudiantes, cursos e inscripciones. Los datos de los estudiantes y cursos se almacenan en una base de datos y son consumidos por la aplicación a través de una API REST. Los formularios y tablas interactivas permiten la adición, visualización y eliminación de registros, con un diseño responsivo y moderno.

La aplicación está dividida en las siguientes entidades principales:
1. **Estudiantes**: Permite registrar, listar y eliminar estudiantes.
2. **Cursos**: Permite registrar, listar y eliminar cursos.
3. **Inscripciones**: Muestra la relación entre estudiantes y cursos mediante una tabla intermedia (sin acciones de edición o eliminación para la tabla de inscripciones).

## Tecnologías Utilizadas
- **HTML5**: Estructura básica del proyecto.
- **CSS3**: Estilización de componentes usando Shadow DOM.
- **JavaScript (ES6)**: Implementación de la lógica de los componentes y el consumo de la API REST.
- **API Fetch**: Para interactuar con los datos proporcionados por la API.
- **MySQL**: Base de datos para almacenar estudiantes, cursos e inscripciones.

## Características
El proyecto está compuesto por varios componentes que permiten interactuar con la base de datos y la API REST de forma modular.

### 1. **Estudiante Form**
Este componente permite registrar un nuevo estudiante mediante un formulario con los campos **nombre**, **apellido** y **correo**.

#### Características:
- **Formulario responsivo** con validaciones básicas.
- **Consumo de API** para registrar estudiantes en la base de datos.

### 2. **Estudiante List**
Este componente muestra una tabla de estudiantes registrados, obtenidos desde la API REST.

#### Características:
- **Tabla dinámica**: Visualiza los estudiantes con sus respectivos datos como ID, nombre, apellido y correo.
- **Eliminación de estudiantes**: Permite eliminar estudiantes de la base de datos mediante un botón de acción.

### 3. **Curso Form**
El formulario para registrar un nuevo curso con los campos **nombre del curso** y **descripción**.

#### Características:
- **Formulario** con campos para nombre y descripción del curso.
- **Consumo de API** para registrar el curso en la base de datos.

### 4. **Curso List**
Muestra una tabla con los cursos registrados en la base de datos.

#### Características:
- **Tabla dinámica** con cursos, con columnas para **ID**, **nombre del curso** y **descripción**.
- **Eliminación de cursos**: Permite eliminar cursos de la base de datos mediante un botón de acción.

### 5. **Inscripciones List**
Componente que muestra las inscripciones de estudiantes a cursos, sin posibilidad de edición o eliminación en la tabla.

#### Características:
- **Relación muchos a muchos**: Muestra qué estudiante está inscrito en qué curso, junto con la **fecha de inscripción**.
- **Consumo de API** para obtener los datos de las inscripciones.

### 6. **Barra de Navegación**
Este componente muestra una barra de navegación para cambiar entre las diferentes vistas de estudiantes, cursos e inscripciones.

#### Características:
- **Navegación dinámica**: Permite cambiar entre las secciones de la aplicación (inicio, estudiantes, cursos, inscripciones).
- **Diseño responsivo** que se adapta a diferentes tamaños de pantalla.

### 7. **Sección de Inicio**
Una sección inicial que da la bienvenida al usuario y explica cómo interactuar con la aplicación.

#### Características:
- **Texto estático**: Explicación inicial del uso de la aplicación.

## API REST
La API REST implementada en el servidor permite realizar las siguientes operaciones:

- **GET /estudiantes**: Obtiene todos los estudiantes registrados.
- **POST /estudiantes**: Crea un nuevo estudiante en la base de datos.
- **DELETE /estudiantes/{id}**: Elimina un estudiante mediante su ID.

- **GET /cursos**: Obtiene todos los cursos registrados.
- **POST /cursos**: Crea un nuevo curso en la base de datos.
- **DELETE /cursos/{id}**: Elimina un curso mediante su ID.

- **GET /inscripciones**: Obtiene las inscripciones de estudiantes a cursos (tabla intermedia).

### Ejemplo de peticiones a la API:
#### Registrar un estudiante:
```
POST http://localhost:8000/estudiantes
{
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan.perez@example.com"
}
```

#### Registrar un curso:
```
POST http://localhost:8000/cursos
{
    "nombre_curso": "Matemáticas",
    "descripcion": "Curso de matemáticas avanzadas."
}
```

#### Obtener estudiantes:
```
GET http://localhost:8000/estudiantes
```

#### Obtener inscripciones:
```
GET http://localhost:8000/inscripciones
```

## Estructura del Proyecto
El proyecto está organizado en los siguientes directorios:

```
/node_modules
/components
    /estudiante-form.js
    /estudiante-list.js
    /curso-form.js
    /curso-list.js
    /inscripciones-list.js
    /nav-bar.js
    /my-header.js
    /my-footer.js
    /my-inicio.js
    /contenido.js

/index.html
/index.js
/package.json
/package-lock.json

```

## Conclusión
Este proyecto es una aplicación web modular que permite gestionar estudiantes, cursos e inscripciones. Utiliza Web Components para crear componentes reutilizables, manejando la interacción con la base de datos mediante una API REST. El uso de componentes facilita la reutilización y la escalabilidad, permitiendo que la aplicación se pueda expandir fácilmente con nuevas funcionalidades en el futuro.

# IAN ALVAREZ ijalvarez@espe.edu.ec

