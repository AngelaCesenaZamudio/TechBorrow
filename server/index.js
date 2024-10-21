const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const LoginRoute = require("./routes/LoginRoute");
const PrestamoRoute = require("./routes/PrestamoRoute");

app.use("/LoginRoute", LoginRoute);
app.use("/PrestamoRoute", PrestamoRoute);

// Redirigir la ruta raíz a la página de login
app.get("/", (req, res) => {
    res.redirect("/login");
});


const PORT = 3001; // o el puerto que prefieras
app.listen(PORT, () => {
    
});


