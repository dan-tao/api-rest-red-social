const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const rateLimit = require("express-rate-limit");

// Limitar el número de solicitudes a la ruta de login  para prevenir ataques de fuerza bruta
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limitar a 10 solicitudes por ventana de tiempo
  message:
    "Demasiados intentos de inicio de sesión. Por favor, inténtelo de nuevo más tarde.",
});

// Rutas
router.get("/prueba-usuario", userController.pruebaUser);
router.post("/register", registerLimiter, userController.register);
router.post("/login", userController.login);

module.exports = router;
