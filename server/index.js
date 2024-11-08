const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const LoginRoute = require("./routes/LoginRoute");
const PrestamoRoute = require("./routes/PrestamoRoute");
const RegistroMaterialRoute = require("./routes/RegistroMaterialRoute");

app.use("/LoginRoute", LoginRoute);
app.use("/PrestamoRoute", PrestamoRoute);
app.use("/RegistroMaterialRoute", RegistroMaterialRoute);
// Redirigir la ruta raíz a la página de login
app.get("/", (req, res) => {
    res.redirect("/login");
});


const PORT = 3001; 
app.listen(PORT, () => {
    
});


