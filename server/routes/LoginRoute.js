const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcrypt');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Crear la conexión a la base de datos MySQL
const BD = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "techborrow",
});

// Establecer la conexión a la base de datos
BD.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1); // Salir del proceso con error si la conexión falla
    }else{
        console.log('Conexion exitosa a la base de datos')
    }
});

/**
 * Ruta POST para autenticar usuarios.
 * Recibe las credenciales de inicio de sesión (username y password) en el cuerpo de la solicitud.
 * Validaciones:
 * - Verifica si el usuario existe en la base de datos.
 * - Compara la contraseña proporcionada con la almacenada en la base de datos utilizando bcrypt.
 */
router.post("/autentificacion_usuario", (req, res) => {
    console.log("Solicitud recibida:", req.body);
    const { numeroempleado, contraseña } = req.body;

    // Validar que username y password estén presentes en la solicitud
    if (!numeroempleado || !contraseña) {
        return res.status(400).send("Usuario y contraseña son requeridos");
    }

    // Consultar el usuario por username en la base de datos
    BD.query('SELECT usuario.id_usuario, usuario.id_permisousuario, autentificacion_usuario.contraseña ' +
        'FROM usuario INNER JOIN autentificacion_usuario ON usuario.id_usuario = autentificacion_usuario.id_usuario ' +
        'WHERE numero_empleado = ?', [numeroempleado], (err, results) => {
        console.log('Entro a revisar los datos')
        if (err) {
            console.error('Error al consultar el usuario:', err);
            return res.status(500).send("Error en el servidor");
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado en la base de datos");
            return res.status(401).send("Usuario incorrecto");
        }

        const {id_usuario, id_permisousuario, contraseña:contraseñaGuardada} = results[0];

           /* if(contraseña,user.contraseña,(err,isMatch)=>{
                if(err){
                    console.error('Error al comparar contraseñas',err);
                    return res.status(500).send('Error en el servidor');
                }*/

                if(contraseña!==contraseñaGuardada){
                    return res.status(401).send('Contraseña incorrecta');
                
                }

                const esAdmin = id_permisousuario === 1;   

                res.status(200).send('Inicio de sesion exitoso');
                
            });
        });

app.use('/LoginRoute',router);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log('Servidor escuchando');
});

module.exports = router;