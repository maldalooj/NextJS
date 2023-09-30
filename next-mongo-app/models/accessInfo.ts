// import { Schema, Model, models, model } from "mongoose";

import mongoose from "mongoose";

const accessInfoSchema = new mongoose.Schema({
  ipinfo: Object,
  browserID: String,
  userAgent: String,
  latitude: Number,
  longitude: Number,
  timestamp: Date,
});
let AccessInfo: typeof mongoose.Model;

if (mongoose.models.AccessInfo) {
  AccessInfo = mongoose.model("AccessInfo");
} else {
  AccessInfo = mongoose.model("AccessInfo", accessInfoSchema);
}
export default AccessInfo;
