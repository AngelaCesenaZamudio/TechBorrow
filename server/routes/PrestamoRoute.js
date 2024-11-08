const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const BD = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"techborrow"
});

router.post('/RegistroPrestamo', (req,res) => {
    const id_Prestamo = req.body.id_Prestamo;
    const matricula_claveempleado_solicitante = req.body.matricula_claveempleado_solicitante;
    const nombre_material = req.body.nombre_material;
    const categoria_material = req.body.categoria_material;
    const fecha_Prestamo = req.body.fecha_Prestamo;
    const hora_Prestamo = req.body.hora_Prestamo;

    //Si el prestamo ya existe por id
    BD.query('SELECT * FROM prestamo WHERE id_Prestamo = ?', [id_Prestamo], (err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Error");
        }

        //Si el material ya esta en un prestamo
        BD.query('SELECT * FROM prestamo WHERE nombre_material = ?',[nombre_material], (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).send("Error");
            }

            if(results.length>0){
                return res.status(401).send("El material ya esta prestado")
            }

        BD.query('INSERT INTO prestamo(id_Prestamo, matricula_claveempleado_solicitante, nombre_material,categoria_material, fecha_Prestamo, hora_Prestamo) VALUES (?,?,?,?,?,?)',
            [id_Prestamo, matricula_claveempleado_solicitante, nombre_material, categoria_material, fecha_Prestamo, hora_Prestamo], (err, result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send("Error")
                }
                res.status(200).send("Prestamo registrado con exito");
            });    
        });
    });
});

router.get('/obtenerPrestamos', (req, res) => {
    const query ='SELECT p.fecha,'+ 
    'm.nombre_material, s.matricula_numeroempleado, c.categoria '+
    'FROM prestamo AS p'+ 
    ' JOIN material AS m ON p.id_material = m.id_material'+
    ' JOIN solicitante AS s ON p.id_solicitante = s.id_solicitante'+
    ' JOIN categoria AS c ON m.id_categoria = c.id_categoria'; 
        
    BD.query(query, (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).send("Error");
        }
        console.log(results);
        res.status(200).json(results);
    });
});

router.get('/validarMatricula', (req, res) => {
    const matricula = req.query.matricula;
    BD.query('SELECT * FROM solicitante WHERE matricula_claveempleado =?', 
        [matricula], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send('Error');
            }

            if(results.length>0){
                res.status(200).send('Matricula valida');
            }else{
                res.status(400).send('Matricula no valida');
            }
    });
});

router.get('/validarMaterial', (req, res) => {
    const material = req.query.material;
    BD.query('SELECT * FROM material WHERE nombre_Material=?', 
        [material], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send('Error');
            }

            if(results.length>0){
                console.log(material);
                res.status(200).send('Material habilitado');
            }else{
                res.status(400).send('Material no valido');
            }
    });
});

router.get('/estadoMaterial', (req, res) => {
    const material = req.query.material;
    BD.query('SELECT estado FROM material WHERE nombre_material = ?', 
        [material], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send('Error al obtener el material.');
            }

            if(results.length>0){
                const estado = results[0].estado;
                res.status(200).json({estado : estado});
            }else{
                res.status(404).send('Material no valid');
            }
    });
});

router.get('/materialUbicacion', (req,res) =>{
    const idMaterial = req.query.id_material;
    const query='SELECT material.nombre_material, material.categoria, ubicacion.nombre AS ubicacion_nombre'+
    'FROM material JOIN ubicacion ON material.id_ubicacion = ubicacion.id WHERE material.id=?';
    BD.query(query, [idMaterial], (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).send("Error en la consulta de ubicacion");
        }

        if(results.length>0){
            res.status(200).json(results[0]);
        }else{
            res.status(404).send("Ubicacion no encontrada para el material especificado");
        }
    });
})

module.exports = router;