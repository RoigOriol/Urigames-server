const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Description is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    game: {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
