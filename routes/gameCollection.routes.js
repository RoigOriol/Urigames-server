const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js");
const User = require("../models/User.model.js");

router.patch("/:gameId/collection", isTokenValid, async (req, res, next) => {
  // cogemos el user desde la BD
  try {
    // favoritos
    const response = await User.findById(req.payload._id);

    // si el juego existe en fav lo meto
    if (!response.collections.includes(req.params.gameId)) {
      await User.findByIdAndUpdate(req.payload._id, {
        $addToSet: { collections: req.params.gameId },
      });
      res.json({ message: "Game added to collection" });
      // Si ya está, eliminarlo
    } else {
      await User.findByIdAndUpdate(req.payload._id, {
        $pull: { collections: req.params.gameId },
      });
      res.json({ message: "Game removed from collection" });
    }
    res.json({ message: "Updated collection game" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
