const express = require("express");
const router = express.Router();
const mysql = require("mysql");
{/*Conexion a la Base de datos*/}

const BD = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"techborrow"
});

router.post('/RegistroMaterial', (req,res) => {
    const id_material = req.body.id_material;
    const clave = req.body.clave;
    const id_ubicacion = req.body.id_ubicacion;
    const nombre_material = req.body.nombre_material;
    const numserie = req.body.numserie;
    const id_categoria = req.body.id_categoria;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const id_estado = req.body.id_estado;
    const descripcion = req.body.descripcion;
    const permiso = req.body.permiso;
    const fechaRegistro = req.body.fechaRegistro;
    
    
{/*//Si el prestamo ya existe por id
    BD.query('SELECT * FROM material WHERE id_material = ?', [id_material], (err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Error");
        }
   */}
       console.log("Fuera del query");
        BD.query('INSERT INTO material(id_material, clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [id_material, clave, id_ubicacion, nombre_material, numserie,id_categoria, marca, modelo,id_estado,descripcion, permiso,fechaRegistro ], (err, result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send("Error")
                }
                console.log("Dentro del metodo");
                res.status(200).send("Material registrado con exito");
            });    
    });
    
module.exports = router;
