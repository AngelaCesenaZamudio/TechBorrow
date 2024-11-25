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
    const fecha = req.body.fecha;
    const hora = req.body.hora;

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

        //Metodo para hacer la insercion del prestamo a la tabla
        const queryPrestamo = 'INSERT INTO prestamo(id_solicitante, id_material, estado, comentarios, fecha, hora) VALUES (?,?,?,?,?,?)';
        BD.query(queryPrestamo, [id_solicitante, id_material, estado, comentarios, fecha, hora], (err, results)=>{
            if(err){
                console.error("Error al registrar el prestamo: ",err);
                return res.status(500).json({message: "Error al registrar el prestamo", err: err});
            }
            res.status(200).json({message: "Prestamo registrado con exito"});
        })
    })
    })

    //Funcion que utilizaremos para actualizar estado del material en prestamo
    const actualizarEstadoMaterial = (req,res) =>{
        const {id_material} = req.params;
        const estado = "Prestado";

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

        //Buscamos en la tabla estado para corroborar que existe este estado y que se guarde el id
        const queryEstado = 'SELECT id_estado FROM estado WHERE estado =?';
        BD.query(queryEstado, [estado], (err,results)=>{
            if(err){
                console.error("Error al obtener el id_estado:",err);
                return res.status(500).json({message: "Error al obtener el id_estado",err:err});
            }

            if(results.length===0){
                return res.status(404).json({message: "Estado no encontrado"});
            }

            const id_estado = results[0].id_estado;

        //Buscamos el material para actulizar su estado    
        const queryMaterial = 'UPDATE material SET id_estado = ? WHERE id_material =?';
        BD.query(queryMaterial, [id_estado, id_material], (err,results) =>{
            if(err){
                console.error("Error al actualizar el estado del material:",err);
                return res.status(500).json({message: "Error al actualizar el estado del material", err: err});
            }
            if(results.affectedRows===0){
                return res.status(404).json({message: "Material no encontrado"});
            }
            res.status(200).json({message: "Estado del material actualizado"});
        });
    });
  });
}

    //Ruta utilizada para que se modifique el estado del material luego del prestamo
    router.put('/material/:id_material', actualizarEstadoMaterial);
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

    BD.query('SELECT id_solicitante, activo, adeudos, nombre_solicitante FROM solicitante WHERE matricula_claveempleado =?', 
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
                    return res.status(200).send({mensaje:'Solicitante valido, puede hacer un prestamo'}) 
                        //nombre_solicitante:solicitante.nombre_solicitante});
                }  

                return res.status(200).send({mensaje:'Solicitante valido, puede hacer un prestamo'}) 
                //nombre_solicitante:solicitante.nombre_solicitante});
            });
        });
    });
});

router.get('/estadoMaterial', (req, res) => {
    const material = req.query.material;
    console.log("",material);

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
                console.log("",estado);

                if(estado==='Disponible'){
                return res.status(200).json({mensaje: 'El material esta disponible'});
                }else if(estado==='Prestado'){
                    return res.status(200).json({mensaje: 'El material no esta disponible'});
                }
            }
            
        return res.status(404).json('Material no valido');
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