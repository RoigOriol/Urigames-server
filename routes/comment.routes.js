const router = require("express").Router();
const mongoose = require("mongoose");
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
// GET "/api/comments" ver todos los comentarios hechos en un juego
router.get("/game/:gameId", async (req, res, next) => {
  try {
    // obtenemos ID del juego de los parámetros
    const gameId = req.params.gameId;

    // Verificamos que el ID del juego es es correcto
    if (!mongoose.Types.ObjectId.isValid(gameId)) {
      // Si el ID del juego n e validop nos da el error
      console.log("Juego no existe");
      return res.status(400).json({ message: "Juego no existe" });
    }

    // Busca comentarios  con el ID del juego
    console.log(`Searching for comments related to game ID: ${gameId}`);
    const comments = await Comment.find({ game: gameId }).populate({
      path: "user",
      select: "username",
    });

    // Muestra los comentarios encontrados
    console.log(`Found comments: ${JSON.stringify(comments)}`);

    // Clausula de gudia para saber si hay comentarios
    if (comments.length === 0) {
      // Si no hay comentarios devuelve el error
      console.log("No hay comentarios");
      res.status(200).json([]);
    }

    // Devuelve los comentarios
    res.status(200).json({ comments });
  } catch (error) {
    console.error(`Error: ${error}`);
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
    // Buscamos el juego y el comentario
    const { game, comment } = req.body;

    // Buscando el paylod del usuario para saber quien lo hace
    const user = req.payload._id;

    //    Clausula de gudria para saber si hay comentarios n el juego
    if (!game || !comment) {
      // Si falta el juego o el comentario
      console.log("Necesito ID de juego y comentario.");
      return res
        .status(400)
        .json({ message: "Necesito ID de juego y comentario." });
    }

    // Creando un nuevo comentario con el usuario el juego y el comentario
    await Comment.create({
      user,
      game,
      comment,
    });

    //  se ha creado el comentario correctamente
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/comments/:commentId" editar un comentario solo si el usuario esta logeado

router.put("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    const { comment } = req.body;

    // Verifica si el comentario está presente en la solicitud
    if (!comment) {
      console.log("Se requiere un comentario para editar.");
      return res
        .status(400)
        .json({ message: "Se requiere un comentario para editar." });
    }

    // Busca el comentario por su ID y actualiza solo el campo 'comment'
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        comment: comment,
      },
      { new: true }
    ); // Esto devuelve el documento actualizado

    // Si el comentario no existe, devuelve un error 404
    if (!updatedComment) {
      console.log("El comentario no fue encontrado.");
      return res
        .status(404)
        .json({ message: "El comentario no fue encontrado." });
    }

    // Devuelve una respuesta 200 junto con el comentario actualizado
    res
      .status(200)
      .json({ message: "Comentario actualizado", comment: updatedComment });
  } catch (error) {
    next(error);
  }
});

/*router.put("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, {
      comment: req.body.comment,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});*/

// DELETE "/api/comments/:commentId"
// Ruta para eliminar comentarios
router.delete("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    // Buscamos y eliminamos el comentario por ID
    await Comment.findByIdAndDelete(req.params.commentId);

    // Buscamos que el comentario ha sido eliminado
    console.log(
      `Comentario con ID ${req.params.commentId} eliminado correctamente`
    );
    res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    next(error);
  }
});

/*router.delete("/:commentId", isTokenValid, async (req, res, next) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    next(error);
  }
});*/

module.exports = router;
