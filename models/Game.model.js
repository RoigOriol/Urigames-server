const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    designer: {
      type: String,
      required: true,
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
        "Tile Placement",
      ],
      required: true,
    },
    minPlayers: {
      type: Number,
      required: true,
    },
    maxPlayers: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    playTime: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // este segundo objeto añade propiedades adicionales: createdAt y updatedAt
    timestamps: true,
  }
);
const Game = model("Game", gameSchema);

module.exports = Game;
