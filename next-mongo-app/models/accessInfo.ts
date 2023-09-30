// import { Schema, Model, models, model } from "mongoose";

import mongoose from "mongoose";

const accessInfoSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  mapLink: String,
});
let AccessInfo =
  mongoose.models.AccessInfo ||
  mongoose.model("accessInfo", accessInfoSchema, "access_info");
export default AccessInfo;
