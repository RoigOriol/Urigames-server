const User = require("../models/User.model");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//aqui van todas las rutas de autenticación

// POST "/api/auth/signup" => recibir data(mail, username y password) del usuario y crearlo en la BD
router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  //destructuramos las variables
  const { email, username, password } = req.body;

  //validaciones del servidor

  // 1. todos los campos deberían ser obligatorios
  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ errorMessage: "todos los campos son obligatorios" }); // el cliente me está dando la info incorrecta
  }

  // 2. la contraseña debería ser segura.
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      errorMessage:
        "la contraseña no es suficientemente fuerte. Requiere más de 8 caracteres, 1 min., 1 may y algún otro caracter",
    }); // el cliente me está dando la info incorrecta
  }

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ errorMessage: "Email en formato incorrecto" }); // el cliente me está dando la info incorrecta
  }

  const userNameRegex = /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/gm;
  if (!userNameRegex.test(username)) {
    return res
      .status(400)
      .json({ errorMessage: "Nombre de usuario en formato incorrecto" }); // el cliente me está dando la info incorrecta
  }
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  // 3. el correo electrónico no debería estar duplicado en mi BD

  try {
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (foundUser) {
      return res.status(400).json({
        errorMessage: "Usuario ya registrado con ese correo electrónico",
      });
    }

    //si cumple estas 3 condiciones creamos el documento en la BD
    await User.create({
      email: email,
      username: username,
      password: hashPassword, //la contraseña cifrada
    });
    res.sendStatus(201); //created
    res.json("todo bien, aquí crearíamos el usuario");
  } catch (error) {
    next(error);
  }
});

//POST "/api/auth/login"  => recibe credenciales del usuario (email y password) y las valida. Crearemos y enviaremos el token.
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  //1. que los campos existan para el LOGIN pk ya esta registrado
  if (!email || !password) {
    return res
      .status(400)
      .json({ errorMessage: "todos los campos son obligatorios" }); // el cliente me está dando la info incorrecta
  }
  try {
    //2. Que el usuario exista
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser)
      return res.status(400).json({ errorMessage: "Usuario no registrado" });

    //3. que la contraseña sea la correcta. Comparamos la contraseña del usuario con la cifrada
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    console.log(isPasswordCorrect);
    if (isPasswordCorrect === false)
      return res.status(400).json({ errorMessage: "Contraseña no válida" }); //detén la ejecución de la ruta
    //Usuario autenticado. Creamos el token y lo enviamos

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      //cualquier información estática del usuario deberia ir aqui
    };

    const AuthToken = jwt.sign(
      payload, //el contenido del token
      process.env.TOKEN_SECRET, // ESTA ÉS LA CLAVE DEL SERVIDOR PARA CIFRAR TODOS LOS TOQUENS
      { algorithm: "HS256", expiresIn: "7d" } //configuraciones del token
    );

    res.status(200).json({ AuthToken: AuthToken });
  } catch (error) {
    next(error);
  }
});
//GET "/api/auth/verify" => recibe el token y lo valida

module.exports = router;
