const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const LoginRoute = require("./routes/LoginRoute");
const PrestamoRoute = require("./routes/PrestamoRoute");
const MaterialRoute = require("./routes/MaterialRoute");
const DevolucionRoute = require("./routes/DevolucionRoute");

app.use("/LoginRoute", LoginRoute);
app.use("/PrestamoRoute", PrestamoRoute);
app.use("/MaterialRoute", MaterialRoute);
app.use("/DevolucionRoute", DevolucionRoute);

// Redirigir la ruta raíz a la página de login
app.get("/", (_req, res) => {
    res.redirect("/login");
});


const PORT = 3001; 
app.listen(PORT, () => {
    
});


