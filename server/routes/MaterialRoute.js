const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Conexión a la Base de Datos
const BD = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "techborrow"
});

BD.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err.stack);
        return;
    }
    console.log("Conectado a la base de datos");
});

router.get('/obtenerMaterial', (req, res) => {
    
    const queryMaterial = `
        SELECT material 
        WHERE 
            id_material = ? AND 
            clave = ? AND 
            id_ubicacion = ? AND 
            nombre_material = ? AND 
            numserie = ? AND 
            id_categoria = ? AND 
            marca = ? AND 
            modelo = ? AND 
            id_estado = ? AND 
            descripcion = ? AND 
            permiso = ? AND 
            fechaRegistro = ?
    `;

    BD.query(query, [
        id_material, clave, id_ubicacion, nombre_material, numserie, 
        id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro
    ], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error");
        }
        if (results.length > 0) {
            res.status(200).send("Material encontrado con éxito");
        } else {
            res.status(404).send("Material no encontrado");
        }
    });
});

module.exports = router;
