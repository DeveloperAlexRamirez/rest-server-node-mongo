const { request, response } = require('express');

const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No se ha mandando el token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      msg: 'Token no válido',
    });
  }
};

module.exports = {
  validarJWT,
};
