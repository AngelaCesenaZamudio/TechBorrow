const express = require("express");
const router = express.Router();
const mysql = require("mysql");


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

    if(!id_material||!clave||!id_ubicacion||!id_categoria||!id_estado){
        return res.status(400).json({message: "Faltan datos requeridos"});
    }

    console.log("SERVER UBICACION:",id_ubicacion);


    const queryUbicacion = 'SELECT id_ubicacion FROM ubicacion WHERE id_ubicacion=?';
    BD.query(queryUbicacion, [id_ubicacion], (err, ubicacionresults) =>{
        if(err){
            console.error("Error al obtener el id_ubicacion", err);
            return res.status(500).json({message: "Error al obtener el id_ubicacion", err:err});
        }

        if(ubicacionresults.length===0){
            return res.status(404).json({message: "Ubicacion no encontrada"});

        }

        const id_ubicacion = ubicacionresults[0].id_ubicacion;
        console.log("Encontro ubicacion: ",id_ubicacion);

        const queryCategoria = 'SELECT id_categoria FROM categoria WHERE id_categoria =?';
        BD.query(queryCategoria, [id_categoria], (err, categoriaresults)=>{
            if(err){
                console.error("Error al obtener el id_ubicacion", err);
                return res.status(500).json({message: "Error al obtener el id_categoria", err:err});
            }
    
            if(categoriaresults.length===0){
                return res.status(404).json({message: "Categoria no encontrada"});
    
            }
    
            const id_categoria = categoriaresults[0].id_categoria;
            console.log("Encontro categoria: ",id_categoria);

            const queryEstado = 'SELECT id_estado FROM estado WHERE id_estado=?';
            BD.query(queryEstado, [id_estado], (err, estadoresults)=>{
                if(err){
                    console.error("Error al obtener el id_estado", err);
                    return res.status(500).json({message: "Error al obtener el id_estado", err:err});
                }
        
                if(estadoresults.length===0){
                    return res.status(404).json({message: "Estado no encontrado"});
        
                }
        
                const id_categoria = estadoresults[0].id_categoria;
                console.log("Encontro estado: ",id_categoria);

                const queryMaterial = 'INSERT INTO material(id_material, clave, id_ubicacion, ' +
                'nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro) '+
                'VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'

                BD.query(queryMaterial, [id_material, clave, id_ubicacion, nombre_material, numserie, id_categoria, marca, modelo, id_estado, descripcion, permiso, fechaRegistro ], 
                (err, result)=>{
                if(err){
                    console.log("Error al registrar: ",err);
                    return res.status(500).json({message: "Error al registrar material",err:err});
                }
                console.log("Dentro del metodo");
                res.status(200).json({message: "Material registrado con exito"});
            });    
        });
        })
    })
})
    
module.exports = router;
