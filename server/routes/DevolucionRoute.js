const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const BD = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"techborrow"
});

//Registrar el devolucion por primera vez
router.post('/RegistroDevolucion', (req,res) => {
    const nombre_material = req.body.nombre_material;
    const estado = req.body.estado;
    const comentarios = req.body.comentarios;
    const fechadevolucion = req.body.fechadevolucion;
    const horadevolucion = req.body.horadevolucion;

     //Obtener los datos del prestamo por medio del id_material.   
     const queryMaterial = 'SELECT id_material, id_ubicacion FROM material WHERE nombre_material =?'
     BD.query(queryMaterial, [nombre_material], (err,results) =>{ 
        if(err){
            console.error("Error al obtener el id_material",err);
            return res.status(500).json({message: "Error al obtener el id_material", err: err});
        }

        if(results.length===0){
            return res.status(404).json({message: "Material no encontrado"});
        }

        const id_material = results[0].id_material;
        const id_ubicacion = results[0].id_ubicacion;
        console.log("id_material en devolucion: ",id_material);
        console.log("id_ubicacion en devolucion: ",id_ubicacion);

      const queryPrestamo = 'SELECT id_solicitante, horavencimiento FROM prestamo WHERE id_material =?';
      BD.query(queryPrestamo, [id_material], (err,results) =>{
        if(err){
            console.error("Error al obtener el id_material",err);
            return res.status(500).json({message: "Error al obtener la hora de vencimiento", err: err});
        }

        if(results.length===0){
            return res.status(404).json({message: "hora de vencimiento no encontrada"});
        }

        const id_solicitante = results[0].id_solicitante;
        const horavencimiento = results[0].horavencimiento;
        console.log("id_solicitante en devolucion: ",id_solicitante);
        console.log("hora vencimiento en devolucion: ",horavencimiento);

        //Metodo para hacer la insercion del prestamo a la tabla
      const queryDevolucion = 'INSERT INTO devolucion(id_solicitante, id_material, estado, comentarios, horavencimiento, fechadevolucion, horadevolucion)'+
      'VALUES (?,?,?,?,?,?,?)';
      BD.query(queryDevolucion, [id_solicitante, id_material, estado, comentarios, horavencimiento, fechadevolucion, horadevolucion], (err, results)=>{
        if(err){
            console.error("Error al registrar la devolucion: ",err);
            return res.status(500).json({message: "Error al registrar la devolucion", err: err});
        }
    
        const queryIdDevolucion = 'SELECT id_devolucion FROM devolucion WHERE id_material =?';
        BD.query(queryIdDevolucion, [id_material], (err, results) =>{
            if(err){
                console.error("Error al obtener el id de prestamo", err);
                return res.status(500).json({message: "Error al obtener el id de prestamo", err: err});
            }

            if(results.length===0){
                return res.status(404).json({message: "id de prestamo no encontrado"});
            }

            const id_devolucion = results[0].id_devolucion;  
            console.log("id_devolucion en registro: ",id_devolucion); 

            const clave_devolucion = `DVL-${id_material}-${id_solicitante}-${fechadevolucion}-${id_devolucion}-${id_ubicacion}`;
            console.log("clave en route: ", clave_devolucion);

            const queryUpdateDevolucion= 'UPDATE devolucion SET clave_devolucion = ? WHERE id_devolucion =?';
            BD.query(queryUpdateDevolucion, [clave_devolucion, id_devolucion]), (err)=>{
            if(err){
                console.error("Error al actualizar la clave: ", err);
                return res.status(500).json({message: "Error al actualizar clave de prestamo",err:err});
            }  
            
            console.log("Devolucion registrada con exito");
            res.status(200).json({message: "Devolucion registrada con exito"});
            
            }
        })
     })
    })
    });  
});

//Funcion que utilizaremos para actualizar estado del material en prestamo
router.put('/actualizarEstadoMaterial', async(req,res) =>{
    console.log("Se llamo el actualizar estado");
        const {nombre_material} = req.body;
        const estado = "Disponible";

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
    const query ='SELECT d.horavencimiento, '+ 
    'd.fechadevolucion, d.horadevolucion, d.estado, '+
    'm.nombre_material, s.matricula_claveempleado, d.clave_devolucion '+
    ' FROM devolucion AS d'+ 
    ' JOIN material AS m ON d.id_material = m.id_material'+
    ' JOIN solicitante AS s ON d.id_solicitante = s.id_solicitante'+
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
router.get('/validarMaterial', (req, res) => {
    const nombre_material = req.query.nombre_material;
    console.log("SERVER R: ",nombre_material);

    BD.query('SELECT id_material FROM material WHERE nombre_material =?', 
        [nombre_material], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send('Error al verificar material');
            }

            if(results.length===0){
                return res.status(404).send('Material no registrado');
            }

        const  id_material = results[0].id_material;
        console.log("obtuvo el id material: ",id_material);

        BD.query('SELECT * FROM prestamo WHERE id_material = ? AND estado = "Prestado"',
            [id_material], (err, results) =>{
                if(err){
                    console.log(err);
                    return res.status(500).send('Error al verificar prestamos');
                }

                if(results.length>0){
                console.log("Datos obtenidos"); 
                const horavencimiento = results[0].horavencimiento  
                console.log("hora obtenida: ", horavencimiento); 
                return res.status(200).json({message: "Material con prestamo activo",
                horavencimiento : horavencimiento,
                });  
                }else{
                    return res.status(200).json({message: "El material no tiene préstamos activos"});
                }
            });
    });
});


module.exports = router;