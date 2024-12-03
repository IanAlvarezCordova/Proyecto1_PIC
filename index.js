import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambiar si tu contraseña es diferente
    port: 3306,
    database: 'sistema_cursos_estudiantes'
});

db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos: ", err.message);
    } else {
        console.log("Conexión a la base de datos exitosa");
    }
});

// Endpoints para estudiantes
app.get('/estudiantes', (req, res) => {
    const query = "SELECT * FROM estudiantes";
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send("Error al consultar estudiantes");
            return;
        }
        res.status(200).json(result);
    });
});

app.post('/estudiantes', (req, res) => {
    const { nombre, apellido, correo } = req.body;
    const query = "INSERT INTO estudiantes (nombre, apellido, correo) VALUES (?, ?, ?)";
    db.query(query, [nombre, apellido, correo], (error, result) => {
        if (error) {
            res.status(500).send("Error al registrar estudiante");
            return;
        }
        res.status(201).json("Estudiante registrado correctamente");
    });
});

app.put('/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo } = req.body;
    const query = "UPDATE estudiantes SET nombre = ?, apellido = ?, correo = ? WHERE id_estudiante = ?";
    db.query(query, [nombre, apellido, correo, id], (error, result) => {
        if (error) {
            res.status(500).send("Error al actualizar estudiante");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("Estudiante no encontrado");
            return;
        }
        res.status(200).json("Estudiante actualizado correctamente");
    });
});

app.delete('/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM estudiantes WHERE id_estudiante = ?";
    db.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).send("Error al eliminar estudiante");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("Estudiante no encontrado");
            return;
        }
        res.status(200).json("Estudiante eliminado correctamente");
    });
});

// Endpoints para cursos
app.get('/cursos', (req, res) => {
    const query = "SELECT * FROM cursos";
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send("Error al consultar cursos");
            return;
        }
        res.status(200).json(result);
    });
});

app.post('/cursos', (req, res) => {
    const { nombre_curso, descripcion } = req.body;
    const query = "INSERT INTO cursos (nombre_curso, descripcion) VALUES (?, ?)";
    db.query(query, [nombre_curso, descripcion], (error, result) => {
        if (error) {
            res.status(500).send("Error al registrar curso");
            return;
        }
        res.status(201).json("Curso registrado correctamente");
    });
});

app.put('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_curso, descripcion } = req.body;
    const query = "UPDATE cursos SET nombre_curso = ?, descripcion = ? WHERE id_curso = ?";
    db.query(query, [nombre_curso, descripcion, id], (error, result) => {
        if (error) {
            res.status(500).send("Error al actualizar curso");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("Curso no encontrado");
            return;
        }
        res.status(200).json("Curso actualizado correctamente");
    });
});

app.delete('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM cursos WHERE id_curso = ?";
    db.query(query, [id], (error, result) => {
        if (error) {
            res.status(500).send("Error al eliminar curso");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("Curso no encontrado");
            return;
        }
        res.status(200).json("Curso eliminado correctamente");
    });
});

// Endpoints para inscripciones
app.get('/inscripciones', (req, res) => {
    const query = "SELECT * FROM inscripciones";
    db.query(query, (error, result) => {
        if (error) {
            res.status(500).send("Error al consultar inscripciones");
            return;
        }
        res.status(200).json(result);
    });
});

app.post('/inscripciones', (req, res) => {
    const { id_estudiante, id_curso, fecha_inscripcion } = req.body;
    const query = "INSERT INTO inscripciones (id_estudiante, id_curso, fecha_inscripcion) VALUES (?, ?, ?)";
    db.query(query, [id_estudiante, id_curso, fecha_inscripcion], (error, result) => {
        if (error) {
            res.status(500).send("Error al registrar inscripción");
            return;
        }
        res.status(201).json("Inscripción registrada correctamente");
    });
});

app.delete('/inscripciones', (req, res) => {
    const { id_estudiante, id_curso } = req.body;
    const query = "DELETE FROM inscripciones WHERE id_estudiante = ? AND id_curso = ?";
    db.query(query, [id_estudiante, id_curso], (error, result) => {
        if (error) {
            res.status(500).send("Error al eliminar inscripción");
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send("Inscripción no encontrada");
            return;
        }
        res.status(200).json("Inscripción eliminada correctamente");
    });
});
