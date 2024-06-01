const router = require("express").Router();
const { isTokenValid } = require("../middlewares/auth.middlewares.js");
const User = require("../models/User.model.js");

router.patch("/:gameId", isTokenValid, async (req, res, next) => {
  // cogemos el user desde la BD
  try {
    // favoritos
    const response = await User.findById(req.payload._id);

    // si el juego existe en fav lo meto
    if (!response.favorites.includes(req.params.gameId)) {
      await User.findByIdAndUpdate(req.payload._id, {
        $addToSet: { favorites: req.params.gameId },
      });
      res.json({ message: "Game added to favorites" });
      // Si ya está, eliminarlo
    } else {
      await User.findByIdAndUpdate(req.payload._id, {
        $pull: { favorites: req.params.gameId },
      });
      res.json({ message: "Game removed from favorites" });
    }
    res.json({ message: "Updated favorite game" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
