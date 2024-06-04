const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },

    gameCollection: {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },

    favorites: {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },

    friends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    userImg: {
      type: String,
    },

    //PARA HACER ADMIN
    role: {
      type: String,
      enum: ["user", "admin"], // viene del entrono de desarrollo. El user creado siempre va a ser user y le ponemos admin nosotros en la base de datos
      default: "user",
    },
  },
  {
    // este segundo objeto añade propiedades adicionales: createdAt y updatedAt
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
