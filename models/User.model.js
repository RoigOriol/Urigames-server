const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
      type:[ mongoose.Schema.Types.ObjectId ],
      ref: "Game",
    },
    
    favorites: {
      type:[ mongoose.Schema.Types.ObjectId ],
      ref: "Game",
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
