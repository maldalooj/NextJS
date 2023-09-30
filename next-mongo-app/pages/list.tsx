import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface UserInfo {
  timestamp: string;
  userAgent: string;
  mapLink: string;
  country: string;
}

const List = () => {
  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);

  useEffect(() => {
    fetch("/api/getAccessInfo")
      .then((response) => response.json())
      .then((data) => {
        setUserInfos(data);
      })
      .catch((error) => {
        console.error("Error fetching user access info:", error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>User Access List</title>
      </Head>
      <main>
        <h1>User Access List</h1>
        <Link href="/">Back to Home</Link>
        {userInfos.map((userInfo, index) => (
          <div key={index} className="user-info-card">
            <h2>Timestamp: {new Date(userInfo.timestamp).toLocaleString()}</h2>
            <p>User Agent: {userInfo.userAgent}</p>
            <p>Country: {userInfo.country}</p>
            <p>
              Location:{" "}
              <a
                href={userInfo.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </p>
          </div>
        ))}
        <style jsx>{`
          .user-info-card {
            border: 1px solid #ccc;
            padding: 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        `}</style>
      </main>
    </>
  );
};

export default List;
