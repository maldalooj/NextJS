// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";

// // Load environment variables from .env file
// dotenv.config();

// const uri = process.env.MONGODB_URI || "";
// const client = new MongoClient(uri, {
//   useUnifiedTopology: true,
// } as any);

// export default client;

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env file."
    );
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
  }
}

export default connectToDatabase;
