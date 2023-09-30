import { NextApiRequest, NextApiResponse } from "next";
import AccessInfo from "../../models/accessInfo";
import connectDB from "../../lib/mongodb";
import dotenv from "dotenv";

interface AccessInfo {
  ipinfo: object;
  browserID: string;
  userAgent: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
}

class StoreInfoHandler {
  constructor() {
    dotenv.config();
    this.handle = this.handle.bind(this); // Bind the handle method to the current instance
  }

  async handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const ip =
        (req.headers["x-forwarded-for"] as string) ||
        req.socket.remoteAddress ||
        "Unknown";
      const userAgent = req.headers["user-agent"] || "Unknown";
      const { latitude, longitude, browserID } = req.body;
      const ipinfo = await this.getIpInfo(ip);

      const accessInfo: AccessInfo = {
        ipinfo,
        browserID,
        userAgent,
        latitude,
        longitude,
        timestamp: new Date(),
      };

      try {
        const dbconnection = await connectDB();
        // Update the document if browserID exists or create a new one if it doesn't
        await AccessInfo.findOneAndUpdate(
          { browserID: browserID }, // condition
          accessInfo, // data to update or insert
          { upsert: true } // options
        );
        res.status(200).json({ message: "Data stored successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to store data", err: error });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  async getIpInfo(ip: string): Promise<object> {
    try {
      const response: any = await fetch(
        `https://ipinfo.io/${ip}?token=${process.env.IP_API}`
      );
      return response;
    } catch (error) {
      console.error("Error fetching ip data:", error);
      return {};
    }
  }

  connectToDB() {}
}

const handler = new StoreInfoHandler();

export default handler.handle;
