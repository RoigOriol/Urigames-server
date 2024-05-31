const router = require("express").Router();

const Comment = require("../models/Comment.model.js");

//! en el caso que quisiera eliminar un juego de la colección tendria que eliminarlo de fav de usurio y tendria que importar el USER

/*const User = require("../models/User.model.js");
const Game = require("../models/Game.model.js");*/

//crear comentarios
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    await Comment.create({ //!buscar la manera de encontrar el iD token y pedirle el id del juego
      comment: req.body.comment,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//editar comentarios
router.patch("/comment/:commentId", async (req, res, next) => {
  console.log(req.body);
  try {
    await Comment.findByIdAndUpdate(
      req.params.commentId,
      { $addToSet: { comment: req.body.comment } } //!DUDA ADDTOSET SOLO ELEMENTOS DE UN ARRAY
      // VOLVER A REVISAR CLASE
    );
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

//eliminar comentarios

router.delete("/:commentId", async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
