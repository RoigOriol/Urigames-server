const router = require("express").Router();
const User = require("../models/User.model.js");

router.get("/:userId", async (req, res, next) => {
  console.log(req.params);

  try {
    const response = await User.findById(req.params.userId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// POST creamos users
router.post("/", async (req, res, next) => {
  console.log(req.body);

  try {
    const response = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      gameCollection: req.body.gameCollection,
      favorites: req.body.favorites,
      friends: req.body.friends,
      userImg: req.body.userImg,
      role: req.body.role,
    });

    console.log("user creado");
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//! ACCIONES QUE MODIFICAN EL USUARIO: subir foto de perfil/ / añadir amigos/ / favorites/ gameCollection:

//! preguntar jorge si el admin es el creador de los juegos si game collection i favoriteos va en juego o en usuario.

// Editar usuario total PUT
router.put("/:userId", async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gameCollection: req.body.gameCollection,
        favorites: req.body.favorites,
        friends: req.body.friends,
        userImg: req.body.userImg,
        role: req.body.role,
      },
      { new: true }
    );
    res.status(200).json("usuario editado");
  } catch (error) {
    next(error);
  }
});

//! preguntar jorge si hace falta?

// Editar usuario parcial PATCH
router.patch("/:userId", async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Borrar usuario DELETE
router.delete("/:userId", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
