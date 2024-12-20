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
router.post('/RegistroPrestamo', (req,res) => {
    const id_Prestamo = req.body.id_Prestamo;
    const matricula_claveempleado = req.body.matricula_claveempleado;
    const nombre_material = req.body.nombre_material;
    const estado = req.body.estado;
    const comentarios = req.body.comentarios;
    const fecharegistro = req.body.fecharegistro;
    const horaregistro = req.body.horaregistro;
    const fechavencimiento = req.body.fechavencimiento;
    const horavencimiento = req.body.horavencimiento;

    console.log("Entro a prestamo");

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
        console.log("id_solicitante en registro: ",id_solicitante);

    //Metodo que utilizamos para tomar el id del material y mandarlo al prestamo    
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
        console.log("id_material en registro: ",id_material);

        const queryIDubicacion= 'SELECT id_ubicacion FROM material WHERE id_material =?';
        BD.query(queryIDubicacion, [id_material], (err,results) =>{
            if(err){
                console.error("Error al obtener el id_ubicacion",err);
                return res.status(500).json({message: "Error al obtener el id_prestamo", err: err});
            }
    
            if(results.length===0){
                return res.status(404).json({message: "Ubicacion no encontrada"});
            }
        
            const id_ubicacion = results[0].id_ubicacion;
            console.log("id_ubicacion en registro: ",id_ubicacion);

        //Metodo para hacer la insercion del prestamo a la tabla
        const queryPrestamo = 'INSERT INTO prestamo(id_solicitante, id_material, estado, comentarios, fecharegistro, horaregistro, horavencimiento)'+
        'VALUES (?,?,?,?,?,?,?)';
        BD.query(queryPrestamo, [id_solicitante, id_material, estado, comentarios, fecharegistro, horaregistro, horavencimiento], (err, results)=>{
            if(err){
                console.error("Error al registrar el prestamo: ",err);
                return res.status(500).json({message: "Error al registrar el prestamo", err: err});
            }

         const id_prestamo = results.insertId;
         console.log("id de prestamo en registro: ", id_prestamo);    

        const clave_prestamo = `PR-${id_material}-${id_solicitante}-${fecharegistro}-${id_prestamo}-${id_ubicacion}`;
        console.log("clave en route: ", clave_prestamo);
     
        const queryUpdatePrestamo = 'UPDATE prestamo SET clave_prestamo = ? WHERE id_prestamo =?';
        BD.query(queryUpdatePrestamo, [clave_prestamo, id_prestamo], (err)=>{
        if(err){
            console.error("Error al actualizar la clave: ", err);
            return res.status(500).json({message: "Error al actualizar clave de prestamo",err:err});
        }  

        res.status(200).json({message: "Prestamo registrado con exito"});
        console.log("Prestamo registrado con exito");
        });
    });
    });
    });
    });
});

//Funcion que utilizaremos para actualizar estado del material en prestamo
router.put('/actualizarEstadoMaterial', async(req,res) =>{
    console.log("Se llamo el actualizar estado");
        const {nombre_material} = req.body;
        const estado = "Prestado";

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

//Metodo para obtener todos los prestamos ya generados
router.get('/obtenerPrestamos', (req, res) => {
    const query ='SELECT p.fecharegistro, p.horaregistro, '+ 
    'p.estado, m.nombre_material, s.matricula_claveempleado, p.clave_prestamo, '+
    'p.horavencimiento FROM prestamo AS p'+ 
    ' JOIN material AS m ON p.id_material = m.id_material'+
    ' JOIN solicitante AS s ON p.id_solicitante = s.id_solicitante '+
    'WHERE p.estado="Prestado"'; 
        
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
    console.log("SERVER R: ",matricula);

    BD.query('SELECT id_solicitante, ciclo, adeudos, nombre FROM solicitante WHERE matricula_claveempleado =?', 
        [matricula], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).send('Error al verificar solicitante');
            }

            if(results.length===0){
                return res.status(404).send('Solicitante no registrado');
            }

        const  solicitante = results[0];
        
        if(solicitante.ciclo !=='2024-2'){
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
                    return res.status(200).send({mensaje:'Solicitante valido', nombre: solicitante.nombre}); 

                }  

                return res.status(200).send({mensaje:'Solicitante valido', nombre: solicitante.nombre}); 
            });
        });
    });
});

//Metodo para validar que el material este disponible
router.get('/estadoMaterial', (req, res) => {
    const material = req.query.material;

    const query ='SELECT e.estado FROM material m '+
        'JOIN estado e ON m.id_estado = e.id_estado '+
        'WHERE m.nombre_material = ?';
        
        BD.query(query, [material], (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json('Error al obtener el material.');
            }

            if(results.length>0){
                const estado = results[0].estado;

                if(estado==='Disponible'){
                return res.status(200).json({mensaje: 'El material esta disponible'});
                }else if(estado==='Prestado'){
                    return res.status(200).json({mensaje: 'El material no esta disponible'});
                }
            }
            
        return res.status(404).json('Material no valido');
    });
});

module.exports = router;