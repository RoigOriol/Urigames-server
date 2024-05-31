const router = require("express").Router();
const Game = require("../models/Game.model.js");

//!empezar CREAR EL JUEGO, editarlo, eliminarlo, ruta  para buscar probar ruta de una en una

//CREAR  juegos  POST

router.post("/", (req, res, next) => {
  console.log(req.body);

  // para crear documentos usamos el modelo y el metodo .create()
  Game.create({
    title: req.body.title,
    designer: req.body.designer,
    genre: req.body.genre,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    description: req.body.description,
    image: req.body.image,
    playTime: req.body.playTime,
  })
    .then((response) => {
      console.log("game creado");
      res.sendStatus(201);
    })
    .catch((error) => {
      next(error);
    });
});

// @TODO: Buscar todos los juegos   GET
router.get("/", async (req, res, next) => {
  console.log("usuario accediendo a ruta search");
  console.log(req.query);
  try {
    const response = await Game.find();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Buscar  juegos id  GET

router.get("/:gameId", async (req, res) => {
  console.log(req.params);

  try {
    const response = await Game.findById(req.params.gameId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});






// @TODO: DELETE
router.delete("/:gameId", async (req, res, next) => {

    try {
      
      await Game.findByIdAndDelete(req.params.gameId)
      res.sendStatus(202)
  
    } catch (error) {
      next(error) 
    }
  
  })

module.exports = router;
