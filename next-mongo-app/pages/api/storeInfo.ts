import { NextApiRequest, NextApiResponse } from "next";
import AccessInfo from "../../models/accessInfo";
import connectDB from "../../lib/mongodb";

interface AccessInfo {
  ip: string;
  userAgent: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  mapLink: string;
}

class StoreInfoHandler {
  constructor() {
    this.handle = this.handle.bind(this); // Bind the handle method to the current instance
  }

  async handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const ip =
        (req.headers["x-forwarded-for"] as string) ||
        req.connection.remoteAddress ||
        "Unknown";
      const userAgent = req.headers["user-agent"] || "Unknown";
      const { latitude, longitude } = req.body;

      const accessInfo: AccessInfo = {
        ip,
        userAgent,
        latitude,
        longitude,
        mapLink: this.generateGoogleMapsLink(latitude, longitude),
        timestamp: new Date(),
      };

      try {
        const dbconnection = await connectDB();
        await AccessInfo.create(accessInfo);
        res.status(200).json({ message: "Data stored successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to store data", err: error });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }

  generateGoogleMapsLink(latitude: number, longitude: number): string {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
  connectToDB() {}
}

const handler = new StoreInfoHandler();

export default handler.handle;
