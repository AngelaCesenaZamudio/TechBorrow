const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Conexión a la base de datos
const BD = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "techborrow"
});

// Ruta para obtener todos los materiales
router.get("/obtenerMateriales", (_req, res) => {
  const query = `
      SELECT 
          m.id_material, m.clave, m.id_ubicacion, m.nombre_material, m.numserie,
          c.categoria AS categoria, m.marca, m.modelo, e.estado AS estado,
          m.descripcion, m.permiso, m.fechaRegistro
      FROM material AS m
      LEFT JOIN categoria AS c ON m.id_categoria = c.id_categoria
      LEFT JOIN estado AS e ON m.id_estado = e.id_estado;
  `;
  BD.query(query, (err, results) => {
      if (err) {
          console.error("Error al obtener materiales:", err);
          return res.status(500).send("Error al obtener materiales");
      }
      res.status(200).json(results);
  });
});

// Ruta para registrar un nuevo material
router.post("/materiales", (req, res) => {
    const {
        clave, id_ubicacion, nombre_material, numserie, id_categoria, 
        marca, modelo, id_estado, descripcion, permiso, fechaRegistro
    } = req.body;

    if (!clave || !nombre_material || !id_categoria) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const query = `INSERT INTO material (clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    BD.query(query, [clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al registrar material");
        }
        res.status(201).send("Material registrado exitosamente");
    });
});

// Ruta para modificar un material
router.put("/materiales/:id", (req, res) => {
    const id_material = req.params.id;
    const {
        clave, id_ubicacion, nombre_material, numserie, id_categoria, 
        marca, modelo, id_estado, descripcion, permiso, fechaRegistro
    } = req.body;

    const query = `UPDATE material 
                   SET clave = ?, id_ubicacion = ?, nombre_material = ?, numserie = ?, id_categoria = ?, marca = ?, modelo = ?, id_estado = ?, descripcion = ?, permiso = ?, fechaRegistro = ? 
                   WHERE id_material = ?`;

    BD.query(query, [clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro, id_material], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al modificar material");
        }
        res.status(200).send("Material modificado exitosamente");
    });
});

// Ruta para eliminar un material
router.delete("/materiales/:id", (req, res) => {
    const id_material = req.params.id;

    const query = `DELETE FROM material WHERE id_material = ?`;
    BD.query(query, [id_material], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar material");
        }
        res.status(200).send("Material eliminado exitosamente");
    });
});

module.exports = router;
