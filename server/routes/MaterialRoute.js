const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "techborrow",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

router.get("/obtenerMateriales", async (_req, res) => {
    try {
        const [results] = await pool.query(`
            SELECT 
                m.id_material, 
                m.clave, 
                u.ubicacion AS ubicacion, -- Alias descriptivo de la ubicación
                m.nombre_material, 
                m.numserie,
                c.categoria AS categoria, 
                m.marca, 
                m.modelo, 
                e.estado AS estado,
                m.descripcion, 
                m.permiso, 
                m.fechaRegistro
            FROM material AS m
            LEFT JOIN ubicacion AS u ON m.id_ubicacion = u.id_ubicacion -- JOIN con la tabla ubicacion
            LEFT JOIN categoria AS c ON m.id_categoria = c.id_categoria
            LEFT JOIN estado AS e ON m.id_estado = e.id_estado;
        `);
        res.status(200).json(results); // Devuelve los resultados al frontend
    } catch (error) {
        console.error("Error al obtener materiales:", error);
        res.status(500).json({ error: "Error al obtener materiales" });
    }
});

router.post("/materiales", async (req, res) => {
    const {
        clave, id_ubicacion, nombre_material, numserie, id_categoria, 
        marca, modelo, id_estado, descripcion, permiso, fechaRegistro
    } = req.body;

    if (!clave || !nombre_material || !id_categoria) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        await pool.query(`
            INSERT INTO material (clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro]);
        res.status(201).json({ message: "Material registrado exitosamente" });
    } catch (error) {
        console.error("Error al registrar material:", error);
        res.status(500).json({ error: "Error al registrar material" });
    }
});

router.put("/materiales/:id", async (req, res) => {
    const id_material = req.params.id;
    const {
        clave, id_ubicacion, nombre_material, numserie, id_categoria, 
        marca, modelo, id_estado, descripcion, permiso, fechaRegistro
    } = req.body;

    try {
        await pool.query(`
            UPDATE material 
            SET clave = ?, id_ubicacion = ?, nombre_material = ?, numserie = ?, id_categoria = ?, marca = ?, modelo = ?, id_estado = ?, descripcion = ?, permiso = ?, fechaRegistro = ?
            WHERE id_material = ?
        `, [clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro, id_material]);
        res.status(200).json({ message: "Material modificado exitosamente" });
    } catch (error) {
        console.error("Error al modificar material:", error);
        res.status(500).json({ error: "Error al modificar material" });
    }
});

router.delete("/materiales/:id", async (req, res) => {
    const id_material = req.params.id;

    try {
        await pool.query(`DELETE FROM material WHERE id_material = ?`, [id_material]);
        res.status(200).json({ message: "Material eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar material:", error);
        res.status(500).json({ error: "Error al eliminar material" });
    }
});

module.exports = router;