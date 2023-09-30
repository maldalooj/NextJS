import { NextApiRequest, NextApiResponse } from "next";
import AccessInfo from "../../models/accessInfo";
import connectDB from "../../lib/mongodb";
import { log } from "console";

interface AccessInfo {
  ip: string;
  browserID: string;
  userAgent: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  country: string;
}

class StoreInfoHandler {
  constructor() {
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
      const country = await this.getCountryNameByIp(ip);

      const accessInfo: AccessInfo = {
        ip,
        browserID,
        userAgent,
        latitude,
        longitude,
        timestamp: new Date(),
        country,
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

  getCountryNameByLocation = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.address && data.address.country
      ? data.address.country
      : "Unknown";
  };
  async getCountryNameByIp(ip: string): Promise<string> {
    try {
      const response = await fetch(
        `https://api.ipapi.com/api/${ip}?fields=country_name`
      );
      const data = await response.json();
      return data.country_name || "Unknown";
    } catch (error) {
      console.error("Error fetching country name:", error);
      return "Unknown";
    }
  }

  connectToDB() {}
}

const handler = new StoreInfoHandler();

export default handler.handle;
