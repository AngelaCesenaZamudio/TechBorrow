const express = require("express");
const router = express.Router();
const mysql = require("mysql");


const BD = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"techborrow"
});

router.get("/obtenerMateriales", (_req,res) => {
    const query = `
    SELECT 
    m.id_material, m.clave, m.id_ubicacion, m.nombre_material, m.numserie,
    c.categoria AS categoria, m.marca, m.modelo, e.estado AS estado,
    m.descripcion, m.permiso, m.fechaRegistro
FROM material AS m
LEFT JOIN categoria AS c ON m.id_categoria = c.id_categoria
LEFT JOIN estado AS e ON m.id_estado = e.id_estado
`;

    BD.query(query, (err,results) =>{
       if(err){
        console.error("Error al obtener materiales:",err);
        return res.status(500).send("Error al obtener materiales");
       }
       res.status(200).json(results);
    });
});

//Ruta para registrar el nuevo material
router.post("/materiales",(req,res) =>{
    const{
        clave, id_ubicacion, nombre_material, numserie, id_categoria,
        marca, modelo, id_estado ,descripcion, permiso, fechaRegistro
    } = req.body;

    if (!clave || !nombre_material || !id_categoria ) {
        return res.status(400).jason({ message :"Faltan Campos Obligatorios"});
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
    
}
);
    
module.exports = router;
