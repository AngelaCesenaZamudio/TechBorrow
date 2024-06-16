const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const BD = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"bdsistemaprestamo"
});

router.post("/RegistroPrestamo", (req,res)=>{
    const idPrestamo = req.body.idPrestamo;
    const matricula = req.body.matricula;
    const material = req.body.material;
    const categoria = req.body.categoria;
    const fechah = req.body.fechah;

    BD.query('SELECT * FROM prestamo WHERE idPrestamo = ?', [idPrestamo], (err,results)=>{
        if(err){
            console.log(err);
            return res.status(500).send("Error");
        }

        BD.query('SELECT * FROM prestamo WHERE material = ?',[material], (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).send("Error");
            }

            if(results.length>0){
                return res.status(401).send("El material ya registrado")
            }

        BD.query('INSERT INTO prestamo(idPrestamo, matricula, material, categoria, fechah) VALUES (?,?,?,?,?)',
            [idPrestamo, matricula, material, categoria, fechah], (err, result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).send("Error")
                }
                res.status(200).send("Prestamo registrado con exito");
            });    
        });
    });
});

module.exports = router;