import mongoose from "mongoose";
import { db_userRole } from "../../components/Constant/allConstants";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [
      db_userRole.OWNER,
      db_userRole.MANAGER,
      db_userRole.SIGNER,
      db_userRole.OPERATOR
    ],
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("user", UserSchema);
export { User };
