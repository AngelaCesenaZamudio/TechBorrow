const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"dbsistemaprestamo"
})

app.post("/client/src/components/RegistroPrestamo.jsx",(req,res)=>{
    const matricula_claveempleado = req.body.matricula_claveempleado;
    const nombre_material = req.body.nombre_material;
    const categoria_material = req.body.categoria_material;
    const fechahP = req.body.fechahP;
    const fechahD = req.body.fechahD;

    db.query('INSERT INTO prestamo(matricula_claveempleado,nombre_material,categoria_material,fechahP,fechahD) VALUES(?,?,?,?,?)',
    [matricula_claveempleado,nombre_material,categoria_material,fechahP,fechahD],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("Prestamo registrado");
        }
    }
);
})