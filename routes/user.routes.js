const router = require("express").Router();
const User = require("../models/User.model.js");
const { isTokenValid } = require("../middlewares/auth.middlewares.js");

router.get("/:userId", async (req, res, next) => {
  console.log(req.params);

  try {
    const response = await User.findById(req.params.userId).populate("gameCollection")
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});



// Editar usuario total PUT
router.put("/:userId", async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gameCollection: req.body.gameCollection,
        favorites: req.body.favorites,
        friends: req.body.friends,
        userImg: req.body.userImg,
        role: req.body.role,
      },
      { new: true }
    );
    res.status(200).json("usuario editado");
  } catch (error) {
    next(error);
  }
});


// Editar usuario parcial PATCH
router.patch("/:userId", async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Borrar usuario DELETE
router.delete("/:userId", async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.patch("/:gameId/collections", isTokenValid, async (req, res, next) => {
  // cogemos el user desde la BD
  try {
   
    const response = await User.findById(req.payload._id);
    console.log(response);
    
    if (!response.gameCollection.includes(req.params.gameId)) {
      await User.findByIdAndUpdate(req.payload._id, {
        $addToSet: { gameCollection: req.params.gameId }
      });

    
    } else {
      await User.findByIdAndUpdate(req.payload._id, {
        $pull: { gameCollection: req.params.gameId }
      });
    
    }
    res.json({ message: "Updated collection game" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
