const router = require("express").Router();
const Comment = require("../models/Comment.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid;

// GET "/api/comments" ver todos los comentarios
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate({ path: "userId", select: "username" })
      .populate("gameId");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// GET "/api/comments/game/:gameId" todos los comentarios de un juego
router.get("/game/:gameId", async (req, res, next) => {
  try {
    const gameId = req.params.gameId; // Obtiene el ID del juego desde los parámetros de la URL

    console.log(gameId);

    // Busco los comentarios relacionados con el juego específico
    const comments = await Comment.find({ game: gameId }).populate({
      path: "userId",
      select: "username",
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// GET "/api/comments/commentId" obtener un solo comentario
router.get("/:commentId", async (req, res, next) => {
  try {
    console.log();
    const response = await Comment.findById(req.params.commentId)
      .populate("userId")
      .populate("gameId");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/comments" nuevo comentario de usuario logeado
router.post("/", isTokenValid, async (req, res, next) => {
  try {
    await Comment.create({
      userId: req.payload._id,
      gameId: req.body.game,
      comment: req.body.comment,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/comments/:commentId" editar un comentario solo si el usuario esta logeado
router.put("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      comment: req.body.comment,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/comments/:commentId"
router.delete("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
