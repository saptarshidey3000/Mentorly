import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher"], required: true },
  adress: {type: String},
  profilePic : {type: String ,required: true}
  
});


const User = mongoose.model("User", userSchema);
export default User;
