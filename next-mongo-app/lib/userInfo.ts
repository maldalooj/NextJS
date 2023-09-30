import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  mapLink: String,
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
