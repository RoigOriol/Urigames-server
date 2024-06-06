const router = require("express").Router();
const Game = require("../models/Game.model.js");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid;

// CREAR juegos POST
router.post("/", isTokenValid, async (req, res, next) => {
  console.log(req.body);
  try {
    Game.create({
      title: req.body.title,
      designer: req.body.designer,
      genre: req.body.genre,
      minPlayers: req.body.minPlayers,
      maxPlayers: req.body.maxPlayers,
      description: req.body.description,
      image: req.body.image,
      playTime: req.body.playTime,
    });
    const response = await Game.create();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Buscar todos los juegos GET
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

// Buscar juegos por ID GET
router.get("/:gameId", async (req, res, next) => {
  console.log(req.params);

  try {
    const response = await Game.findById(req.params.gameId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Buscar juegos por título GET
router.get("/title/search", async (req, res, next) => {
  console.log("usuario accediendo a ruta search");
  console.log(req.query);
  try {
    const response = await Game.find(req.query).select({ title: 1 });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Buscar juegos por género GET
router.get("/genre/search", async (req, res, next) => {
  console.log("usuario accediendo a ruta search");
  console.log(req.query);
  try {
    const response = await Game.find(req.query).select({ genre: 1 });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Editar juego total PUT
router.put("/:gameId", async (req, res, next) => {
  try {
    const response = await Game.findByIdAndUpdate(
      req.params.gameId,
      {
        title: req.body.title,
        designer: req.body.designer,
        genre: req.body.genre,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        description: req.body.description,
        image: req.body.image,
        playTime: req.body.playTime,
      },
      { new: true }
    );
    res.status(200).json("juego editado");
  } catch (error) {
    next(error);
  }
});

//Editar juego parcial Patch

router.patch("/:gameId", async (req, res, next) => {
  try {
    const response = await Game.findByIdAndUpdate(req.params.gameId, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Borrar juego DELETE
router.delete("/:gameId", async (req, res, next) => {
  try {
    await Game.findByIdAndDelete(req.params.gameId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
