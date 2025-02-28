import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name Is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
    minLength: [8, "Password must be at least 8 character long"],
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
