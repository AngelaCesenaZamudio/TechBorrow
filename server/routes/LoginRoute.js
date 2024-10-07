const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');

// Crear la conexión a la base de datos MySQL
const BD = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "dbsistemaprestamo"
});

// Establecer la conexión a la base de datos
BD.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1); // Salir del proceso con error si la conexión falla
    }
});

/**
 * Ruta POST para autenticar usuarios.
 * Recibe las credenciales de inicio de sesión (username y password) en el cuerpo de la solicitud.
 * Validaciones:
 * - Verifica si el usuario existe en la base de datos.
 * - Compara la contraseña proporcionada con la almacenada en la base de datos utilizando bcrypt.
 */
router.get("/login", (req, res) => {
    const { username, password } = req.body;

    // Validar que username y password estén presentes en la solicitud
    if (!username || !password) {
        return res.status(400).send("Usuario y contraseña son requeridos");
    }

    // Consultar el usuario por username en la base de datos
    BD.query('SELECT * FROM usuario_login WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error al consultar el usuario:', err);
            return res.status(500).send("Error en el servidor");
        }

        if (results.length === 0) {
            return res.status(401).send("Usuario o contraseña incorrectos");
        }

        const user = results[0];

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error al comparar contraseñas:', err);
                return res.status(500).send("Error en el servidor");
            }

            if (!isMatch) {
                return res.status(401).send("Usuario o contraseña incorrectos");
            }

            // Aquí podrías generar y enviar un token JWT o manejar la sesión de alguna otra manera
            res.status(200).send("Inicio de sesión exitoso");
        });
    });
});

module.exports = router;