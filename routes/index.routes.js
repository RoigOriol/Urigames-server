const router = require("express").Router();

// index.routes funciona como controlador de rutas

//! ruta de todos los modelos que tengo para dps usar el postman. la barra es api ". /api/ game/loquebusco del juego"

// aqui definimos todas nuestras rutas sobre obj router
router.get("/", (req, res, next) => {
  res.json({ message: "all good here!" });
});

const authRouter = require("./auth.routes.js");
router.use("/auth", authRouter);

const userRouter = require("./user.routes.js");
router.use("/user", userRouter);

const gameRouter = require("./game.routes.js");
router.use("/game", gameRouter);

const commentRouter = require("./comment.routes.js");
router.use("/comment", commentRouter);

const favRouter = require("./favorites.routes.js");
router.use("/user/:gameId/favorites", favRouter);

module.exports = router;
