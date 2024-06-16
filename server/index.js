const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const Prestamo = require("./routes/PrestamoRoute");
app.use("/PrestamoRoute", Prestamo);

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001");
})

