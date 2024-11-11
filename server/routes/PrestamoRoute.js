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
    const matricula_claveempleado = req.body.matricula_claveempleado;
    const nombre_material = req.body.nombre_material;
    const estado = req.body.estado;
    const comentarios = req.body.comentarios;
    const fecha_Prestamo = req.body.fecha_Prestamo;
    const hora_Prestamo = req.body.hora_Prestamo;

    //Validar el solicitante

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

//Metodo para obtener todos los prestamos ya generados
router.get('/obtenerPrestamos', (req, res) => {
    const query ='SELECT p.fecha,'+ 
    'm.nombre_material, s.matricula_claveempleado, c.categoria '+
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

//Metodo para validar la matricula
router.get('/validarMatricula_Claveempleado', (req, res) => {
    const matricula = req.query.matricula_claveempleado;

    BD.query('SELECT id_solicitante, activo, adeudos FROM solicitante WHERE matricula_claveempleado =?', 
        [matricula], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send('Error al verificar solicitante');
            }

            if(results.length===0){
                return res.status(404).send('Solicitante no registrado');
            }

        const  solicitante = results[0];
        
        if(solicitante.activo !==1){
            return res.status(400).send("El solicitante no esta activo");
        }

        if(solicitante.adeudos>0){
            return res.status(400).send("El solicitante tiene adeudos pendientes.");
        }

        BD.query('SELECT * FROM prestamo WHERE id_solicitante = ? AND estado = "Prestado"',
            [solicitante.id_solicitante], (err, prestamo) =>{
                if(err){
                    console.log(err);
                    return res.status(500).send('Error al verificar prestamos');
                }

                if(prestamo.length>0){
                    return res.status(400).send("El solicitante ya tiene un prestamo activo.");
                }    

            BD.query('SELECT * FROM prestamo WHERE id_solicitante = ? AND estado ="Finalizado"',
                [solicitante.id_solicitante],(err,prestamoFinalizado)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send('Error al verificar prestamos finalizados');
                }

                if(prestamoFinalizado.length>0){
                    return res.status(200).send('Solicitante valido, puede hacer otro prestamo');
                }  

                return res.status(200).send('Solicitante valido, puede hacer un prestamo');
            });
        });
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
    console.log("Solicitud recibida:", req.query);
    const idUbicacion = req.query.id_ubicacion;

    if(!idUbicacion){
        return res.status(400).json({error: "El id_ubicacion es necesario"});
    }

    const queryUbicacion='SELECT ubicacion FROM ubicacion where id_ubicacion=?';
    //Primera consulta para que busque el nombre de la ubicacion
    BD.query(queryUbicacion, [idUbicacion], (err, ubicacionresults) => {
        if(err){
            console.log(err);
            return res.status(500).json("Error en la consulta de ubicacion");
        }

        if(ubicacionresults.length===0){
            res.status(404).json("Ubicacion no encontrada");
        }

        const queryMaterial = `SELECT material.nombre_material, categoria.categoria, estado.estado `+
        `FROM material JOIN categoria ON material.id_categoria = categoria.id_categoria `+
        `JOIN estado ON material.id_estado = estado.id_estado `+
        `WHERE material.id_ubicacion = ? AND estado.estado ='Disponible'`;

        BD.query(queryMaterial,[idUbicacion], (err,materialResults) =>{
            if(err){
                console.log(err);
                return res.status(500).json("Error en la consulta de materiales");
            }

            if(materialResults.length===0){
                res.status(404).json("No hay materiales disponibles en esta ubicacion");
            }else{
                res.status(200).json(materialResults);
            }
        })
    });
})

module.exports = router;