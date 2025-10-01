// Importar modelo de usuario
const User = require("../models/users");
const argon2 = require("argon2");

const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "Prueba de ruta exitosa",
  });
};

// Registro Usuarios
// CORRECTED: Now async, uses await instead of callback in .exec()
const register = async (req, res) => {
  // Recoger datos del usuario
  let params = req.body;
  if (!params.name || !params.nick || !params.email || !params.password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  try {
    // CORRECTED: Await the result, no callback
    const users = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe",
      });
    }

    // Cifrar la contraseña
    let pwd = await argon2.hash(params.password);
    params.password = pwd;

    // Crear objeto de usuario
    let user_to_save = new User(params);

    // CORRECTED: Use await instead of callback for save()
    let userStored = await user_to_save.save();
    if (!userStored) {
      return res.status(500).json({
        status: "error",
        message: "Error al guardar el usuario",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Registro de usuario exitoso",
      user: userStored,
    });
  } catch (error) {
    // CORRECTED: Error handling for query
    return res.status(500).json({
      status: "error",
      message: "Error en la consulta de usuarios",
    });
  }
};

const login = (req, res) => {
  // Recoger datos del usuario
  let params = req.body;

  return res.status(200).send({
    status: "success",
    message: "Login",
  });
};

module.exports = {
  pruebaUser,
  register,
  login,
};
