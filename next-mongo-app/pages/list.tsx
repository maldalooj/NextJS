// pages/list.tsx
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define an interface to match the structure of your user access information
interface UserInfo {
  timestamp: string;
  userAgent: string;
  mapLink: string;
}

const List = () => {
  const [userInfos, setUserInfos] = useState<UserInfo[]>([]);

  useEffect(() => {
    // Fetch user access info from the API route when the component mounts
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
            <h2>Timestamp: {userInfo.timestamp}</h2>
            <p>User Agent: {userInfo.userAgent}</p>
            <p>
              Location: <a href={userInfo.mapLink}>{userInfo.mapLink}</a>
            </p>
          </div>
        ))}
        <style jsx>{`
          .user-info-card {
            border: 1px solid #ccc;
            padding: 16px;
            margin-bottom: 16px;
          }
        `}</style>
      </main>
    </>
  );
};

export default List;
