const router = require("express").Router();
const Comment = require("../models/Comment.model");
const { isTokenValid } = require("../middlewares/auth.middlewares");
isTokenValid;

// GET "/api/comments"
router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate({ path: "user", select: "username" })
      .populate("game");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// GET "/api/comments/commentId"
router.get("/:commentId", async (req, res, next) => {
  try {
    const response = await Comment.findById(req.params.commentId)
      .populate("userId")
      .populate("gameId");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// POST "/api/comments"
router.post("/", isTokenValid, async (req, res, next) => {
  try {
    await Comment.create({
      user: req.payload._id,
      game: req.body.game,
      comment: req.body.comment,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/comments" => editar data(comentarios)
router.put("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      comment: req.body.comment,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//DELEETE
router.delete("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
