// import { Schema, Model, models, model } from "mongoose";

import mongoose from "mongoose";

const accessInfoSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
  mapLink: String,
  country: String,
});
let AccessInfo: typeof mongoose.Model;

if (mongoose.models.AccessInfo) {
  AccessInfo = mongoose.model("AccessInfo");
} else {
  AccessInfo = mongoose.model("AccessInfo", accessInfoSchema);
}
export default AccessInfo;
