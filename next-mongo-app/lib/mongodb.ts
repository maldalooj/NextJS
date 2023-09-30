import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
} as any);

export default client;
