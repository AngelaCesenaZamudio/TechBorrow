const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const BD = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"techborrow"
});

//Registrar el prestamo por primera vez
router.post('/RegistroDevolucion', (req,res) => {
    const id_devolucion = req.body.id_Prestamo;
    const matricula_claveempleado = req.body.matricula_claveempleado;
    const nombre_material = req.body.nombre_material;
    const estado = req.body.estado;
    const comentarios = req.body.comentarios;
    const fechadevolucion = req.body.fechadevolucion;
    const horadevolucion = req.body.horadevolucion;
    
    const querySolicitante = 'SELECT id_solicitante FROM solicitante WHERE matricula_claveempleado =?';
    BD.query(querySolicitante, [matricula_claveempleado], (err,results) =>{
        if(err){
            console.error("Error al obtener el id_solicitante",err);
            return res.status(500).json({message: "Error al obtener el id_solicitante", err: err});
        }

        if(results.length===0){
            return res.status(404).json({message: "Solicitante no encontrado"});
        }

        const id_solicitante = results[0].id_solicitante;

    //Metodo que utilizamos para tomar el id del material    
    const queryMaterial = 'SELECT id_material FROM material WHERE nombre_material =?';
    BD.query(queryMaterial, [nombre_material], (err,results) =>{
        if(err){
            console.error("Error al obtener el id_material",err);
            return res.status(500).json({message: "Error al obtener el id_material", err: err});
        }

        if(results.length===0){
            return res.status(404).json({message: "Material no encontrado"});
        }

        const id_material = results[0].id_material;

    const queryPrestamo = 'SELECT fechavencimiento, horavencimiento FROM prestamo WHERE id_material =?';
    BD.query(queryPrestamo, [id_material], (err,results) =>{
        if(err){
            console.error("Error al obtener el id_material",err);
            return res.status(500).json({message: "Error al obtener el id_material", err: err});
        }

        if(results.length===0){
            return res.status(404).json({message: "Material no encontrado"});
        }

        const fechavencimiento = results[0].fechavencimiento;
        const horavencimiento = results[0].horavencimiento;

        //Metodo para hacer la insercion del prestamo a la tabla
    const queryDevolucion = 'INSERT INTO devolucion(id_solicitante, id_material, estado, comentarios, fechavencimiento, horavencimiento, fechadevolucion, horadevolucion)'+
    'VALUES (?,?,?,?,?,?,?,?)';
    BD.query(queryDevolucion, [id_solicitante, id_material, estado, comentarios, fechavencimiento, horavencimiento, fechadevolucion, horadevolucion], (err, results)=>{
        if(err){
            console.error("Error al registrar la devolucion: ",err);
            return res.status(500).json({message: "Error al registrar la devolucion", err: err});
        }
        res.status(200).json({message: "Devolución registrada con exito"});
        console.log("DEVOLUCION REGISTRADA")
        
                })
            })
        })
    })
});

//Funcion que utilizaremos para actualizar estado del material en prestamo
router.put('/actualizarEstadoMaterial', async(req,res) =>{
    console.log("Se llamo el actualizar estado");
        const {nombre_material} = req.body;
        const estado = "Disponible";

        const queryMaterial = 'SELECT id_material FROM material '+ 
        'WHERE nombre_material =?';

        BD.query(queryMaterial, [nombre_material], (err,results) =>{
        if(err){
            console.error("Error al obtener el id_material",err);
            return res.status(500).json({message: "Error al obtener el id_material", err: err});
        }

        if(results.length===0){
            return res.status(404).json({message: "Material no encontrado"});
        }

        const id_material = results[0].id_material;
        console.log("SERVER: ",id_material);

        //Buscamos en la tabla estado para corroborar que existe este estado y que se guarde el id
        const queryEstado = 'SELECT id_estado FROM estado '+
        'WHERE estado =?';

        BD.query(queryEstado, [estado], (err,results)=>{
            if(err){
                console.error("Error al obtener el id_estado:",err);
                return res.status(500).json({message: "Error al obtener el id_estado",err:err});
            }

            if(results.length===0){
                return res.status(404).json({message: "Estado no encontrado"});
            }

            const id_estado = results[0].id_estado;
            console.log("SERVER: ",id_estado);

        //Buscamos el material para actulizar su estado    
        const updateMaterial = 'UPDATE material SET id_estado = ? '+
        'WHERE id_material =?';

        BD.query(updateMaterial, [id_estado, id_material], (err,results) =>{
            if(err){
                console.error("Error al actualizar el estado del material:",err);
                return res.status(500).json({message: "Error al actualizar el estado del material",err});
            }
            if(results.affectedRows===0){
                return res.status(404).json({message: "Material no encontrado"});
            }
            return res.status(200).json({message: "Estado del material actualizado"});
        });
        });
    });
});    

//Funcion que utilizaremos para actualizar estado del prestamo
router.put('/actualizarEstadoPrestamo', async(req,res) =>{
    console.log("Se llamo el actualizar estado");
        const {nombre_material} = req.body;
        const estado = "Finalizado";

        const queryMaterial = 'SELECT id_material FROM material '+ 
        'WHERE nombre_material =?';

        BD.query(queryMaterial, [nombre_material], (err,results) =>{
        if(err){
            console.error("Error al obtener el id_material",err);
            return res.status(500).json({message: "Error al obtener el id_material", err: err});
        }

        if(results.length===0){
            return res.status(404).json({message: "Material no encontrado"});
        }

        const id_material = results[0].id_material;
        console.log("SERVER id_material: ",id_material);

        //Buscamos el prestamo para actulizar su estado   
        const queryPrestamo = 'SELECT id_prestamo FROM prestamo WHERE id_material =? AND estado = "Prestado"';
        
        BD.query(queryPrestamo, [id_material], (err, prestamoResults) =>{
            if(err){
                console.error("Error al obtener el id_prestamo", err);
                return res.status(500).json({message: "Error al obtener el id_prestamo",err});
            }

            if(prestamoResults.length===0){
                return res.status(404).json({message: "No se encontro un prestamo activo para este material"});
            }

            const id_prestamo = prestamoResults[0].id_prestamo;
            console.log("SERVER id_prestamo: ",id_prestamo);

            const updatePrestamo = 'UPDATE prestamo SET estado = ? WHERE id_prestamo = ? '+
            'AND estado = "Prestado"';

            BD.query(updatePrestamo, [estado, id_prestamo], (err,results) =>{
            if(err){
                console.error("Error al actualizar el estado del material:",err);
                return res.status(500).json({message: "Error al actualizar el estado del material",err});
            }
            
            if(results.affectedRows===0){
                return res.status(404).json({message: "Material no encontrado"});
            }

            return res.status(200).json({message: "Estado del prestamo actualizado"});
            });
        });
    });
});

//Metodo para obtener todos los prestamos ya generados
router.get('/obtenerDevolucion', (req, res) => {
    const query ='SELECT d.fechavencimiento, d.horavencimiento, '+ 
    'd.fechadevolucion, d.horadevolucion, d.estado, '+
    'm.nombre_material, s.matricula_claveempleado, c.categoria '+
    ' FROM devolucion AS d'+ 
    ' JOIN material AS m ON d.id_material = m.id_material'+
    ' JOIN solicitante AS s ON d.id_solicitante = s.id_solicitante'+
    ' JOIN categoria AS c ON m.id_categoria = c.id_categoria'+
    ' WHERE d.estado ="Finalizado"'; 

    console.log("Entro a devolucion");
    console.log("Query ejecutado: ",query);
        
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
router.get('/obtenerDevolucionPorMatricula_Claveempleado', (req, res) => {
    const matricula = req.query.matricula_claveempleado;
    console.log("SERVER R: ",matricula);

    BD.query('SELECT id_solicitante, activo, adeudos, nombre FROM solicitante WHERE matricula_claveempleado =?', 
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
                    const id_material= prestamo[0].id_material;

                    BD.query('SELECT nombre_material FROM material WHERE id_material = ?',
                        [id_material], (err, material) =>{
                            if(err){
                                console.log(err);
                                return res.status(500).send('Error al obtener material');
                            }

                            return res.status(200).send({
                                mensaje:'Solicitante con prestamo activo',
                                nombre: solicitante.nombre,
                                nombre_material: material.length>0 ? material[0].nombre_material: 'Material no encontrado'
                            });

                        })
                } else{
                    return res.status(404).send("No cuenta con un prestamo activo");
                }   
            });
    });
});


module.exports = router;