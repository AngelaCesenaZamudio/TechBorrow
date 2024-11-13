const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const LoginRoute = require("./routes/LoginRoute");
const PrestamoRoute = require("./routes/PrestamoRoute");
const MaterialRoute = require("./routes/MaterialRoute"); // ruta de materiales


app.use("/LoginRoute", LoginRoute);
app.use("/PrestamoRoute", PrestamoRoute);
app.use("/Material", MaterialRoute); // Usar la ruta de materiales



// Redirigir la ruta raíz a la página de login
app.get("/", (req, res) => {
    res.redirect("/login");
});


const PORT = 3001; 
app.listen(PORT, () => {
    
});


