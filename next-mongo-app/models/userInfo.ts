import { Schema, Model, models, model } from "mongoose";

// import mongoose from "mongoose";

const userInfoSchema = new Schema({
  ip: String,
  userAgent: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  mapLink: String,
});
const UserInfo = models.UserInfo || model("UserInfo", userInfoSchema);
export default UserInfo;
