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

// ModificarMaterialRoute: ruta para editar un material en la base de datos
router.put('/PantallaMaterialLaboratorio', (req, res) => {
    const {
        id_material,         // ID del material para identificar el registro
        clave,               // Nueva clave del material
        id_ubicacion,        // Nueva ubicación del material
        nombre_material,     // Nombre del material
        numserie,            // Número de serie
        id_categoria,        // Nueva categoría del material
        marca,               // Marca del material
        modelo,              // Modelo del material
        id_estado,           // Estado del material (disponible, prestado, etc.)
        descripcion,         // Descripción del material
        permiso              // Permiso necesario para el material
    } = req.body;

    // Validar que el id_material esté en el request
    if (!id_material) {
        return res.status(400).send("ID de material requerido");
    }

    // Preparar la consulta SQL para actualizar el material
    const query = `
        UPDATE material
        SET clave = ?, id_ubicacion = ?, nombre_material = ?, numserie = ?, 
            id_categoria = ?, marca = ?, modelo = ?, id_estado = ?, 
            descripcion = ?, permiso = ?
        WHERE id_material = ?
    `;

    // Ejecutar la consulta
    BD.query(
        query,
        [clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, id_material],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al modificar el material");
            }

            // Verificar si el material fue actualizado
            if (results.affectedRows > 0) {
                res.status(200).send("Material modificado con éxito");
            } else {
                res.status(404).send("Material no encontrado");
            }
        }
    );
});

module.exports = router;