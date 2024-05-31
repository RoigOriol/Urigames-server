const router = require("express").Router();

const User = require("../models/User.model.js");

//aqui van todas las funcionalidades principals del USER
//!DUDA tengo que ponerlo para que el user pueda crear el juego?


//POST creamos users

router.post("/", (req, res, next) => {
    console.log(req.body);
  
    
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      gameCollection: req.body.gameCollection,
      favorites: req.body.favorites,
      userImg: req.body.userImg,
      role: req.body.role
    })
      .then((response) => {
        console.log("user creado");
        res.sendStatus(201);
      })
      .catch((error) => {
        next(error);
      });
  });


//! subir foto de perfil, añadir favoritos, editar el perfil, añadir amigos, eliminar usuario. aACCIONES QUE MODFIICCAN EL USUARIO


module.exports = router;
