const mongoose = require ("mongoose")

const gameSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    designer: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: [
            "Abstract Strategy",
            "Card Game",
            "Children's Game",
            "Dice",
            "Fantasy",
            "Party Game",
            "Puzzle",
            "Science Fiction",
            "Strategy",
            "Tile Placement"
          ] ,
        required: true
      },
    minPlayers: {
        type: Number,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
    image: {
        type: String,
        required: true
    },
    
    playTime: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})
const Game = mongoose.model("Game", gameSchema)

module.exports = Game 