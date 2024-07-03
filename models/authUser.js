import mongoose from "mongoose";

const authUserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
},
  email: {
     type: String,
      required: true 
    },
  password: {
     type: String,
      required: true
     },
});

const authUser = mongoose.models.authUser || mongoose.model("authUser", authUserSchema);
export default authUser;
