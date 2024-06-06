const router = require("express").Router();

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
router.use("/comments", commentRouter);

const favouriteRouter = require("./favorite.routes.js");
router.use("/fav", favouriteRouter);

const collectionRouter = require("./gameCollection.routes.js");
router.use("/collections", collectionRouter);

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
