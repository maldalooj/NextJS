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
        req.connection.remoteAddress ||
        "Unknown";
      const userAgent = req.headers["user-agent"] || "Unknown";
      const { latitude, longitude } = req.body;
      const country = await this.getCountryName(latitude, longitude);

      const accessInfo: AccessInfo = {
        ip,
        userAgent,
        latitude,
        longitude,
        mapLink: this.generateGoogleMapsLink(latitude, longitude),
        timestamp: new Date(),
        country,
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
  getCountryName = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await response.json();
    return data.address && data.address.country
      ? data.address.country
      : "Unknown";
  };
  connectToDB() {}
}

const handler = new StoreInfoHandler();

export default handler.handle;
