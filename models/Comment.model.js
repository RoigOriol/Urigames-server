const mongoose = require("mongoose")
const commentSchema= new mongoose.Schema({
    comment:{
        type: String,
    },
    //!DUDAS todo esto se crea en la base de datos? Como se pone la id del juego, lo tiene que poner el admin? viene del frontend , userId viene del token
    userId:{
        type: String,
    },
    gameId:{
        type: String,
    }
})
const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment