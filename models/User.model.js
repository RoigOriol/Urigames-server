const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username:{
      type: String,
      required: [true, 'Username is required.']
    },
//PARA HACER ADMIN
role:{
type: String,
enum: ["user", "admin"], // viene del entrono de desarrollo. El user creado siempre va a ser user y le ponemos admin nosotros
default: "user"
}

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
