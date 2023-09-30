import { NextApiRequest, NextApiResponse } from "next";
import AccessInfo from "../../models/accessInfo"; // Import your Mongoose model
import connectDB from "../../lib/mongodb";
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const dbconnection = await connectDB();
      // Fetch user info sorted by timestamp in descending order
      const userInfos = await AccessInfo.find().sort({ timestamp: -1 });
      res.status(200).json(userInfos);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch access info", err: error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
