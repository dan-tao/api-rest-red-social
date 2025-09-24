// Dependencies
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

console.log("Iniciando la aplicación...");

connection();

// Node Server
const app = express();
const PORT = process.env.PORT || 3900;

// Configure CORS
app.use(cors());

//Convert body to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conf Routes
const userRoutes = require("./routes/user");
const followRoutes = require("./routes/follow");
const publicationRoutes = require("./routes/publication");
app.use("/api/user", userRoutes);
app.use("/api/publication", followRoutes);
app.use("/api/follow", publicationRoutes);

//Server listening
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
