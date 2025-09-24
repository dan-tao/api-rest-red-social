const pruebaPublication = (req, res) => {
  return res.status(200).send({
    message: "Prueba de ruta exitosa",
  });
};

module.exports = {
  pruebaPublication,
};
