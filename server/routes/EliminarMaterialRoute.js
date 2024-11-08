const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Crear conexión a la base de datos
const BD = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "techborrow"
});

// EliminarMaterialRoute: ruta para eliminar un material de la base de datos
router.delete('/PantallaMaterialLaboratorio', (req, res) => {
    const { id_material } = req.query; // ID del material que se va a eliminar

    // Validar que el id_material esté presente en la solicitud
    if (!id_material) {
        return res.status(400).send("ID de material requerido");
    }

    // Preparar la consulta SQL para eliminar el material
    const query = `DELETE FROM material WHERE id_material = ?`;

    // Ejecutar la consulta
    BD.query(query, [id_material], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error al eliminar el material");
        }

        // Verificar si el material fue eliminado
        if (results.affectedRows > 0) {
            res.status(200).send("Material eliminado con éxito");
        } else {
            res.status(404).send("Material no encontrado");
        }
    });
});

module.exports = router;