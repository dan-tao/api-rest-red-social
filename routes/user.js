const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const rateLimit = require("express-rate-limit");

// Rate limiter for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message:
    "Demasiados intentos de inicio de sesión. Por favor, inténtelo de nuevo más tarde.",
});

// Rate limiter for register (optional)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Demasiadas solicitudes de registro. Inténtelo más tarde.",
});

// Rutas
router.get("/prueba-usuario", userController.pruebaUser);
router.post("/register", registerLimiter, userController.register);
router.post("/login", loginLimiter, userController.login);

module.exports = router;
