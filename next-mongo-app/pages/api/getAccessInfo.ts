import { NextApiRequest, NextApiResponse } from "next";
import AccessInfo from "../../models/accessInfo"; // Import your Mongoose model

class GetAccessInfo {
  constructor() {
    this.handle = this.handle.bind(this); // Bind the handle method to the current instance
  }
  async handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      try {
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
}

const handler = new GetAccessInfo();

export default handler.handle;
