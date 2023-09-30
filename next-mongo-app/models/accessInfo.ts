import { Schema, Model, models, model } from "mongoose";

// import mongoose from "mongoose";

const accessInfoSchema = new Schema({
  ip: String,
  userAgent: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  mapLink: String,
});
const AccessInfo =
  models.AccessInfo || model("accessInfo", accessInfoSchema, "access_info");
export default AccessInfo;
