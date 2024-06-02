import React from "react";
import StudentCard from "./StudentCard";
import { useEffect, useState } from "react";

const 
StudentList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Mengambil data dari API
    fetch('https://goship-apii.vercel.app/api/major-data/')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
  
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="py-5" style={{ display: "flex", flexDirection: "row" , overflow: "hidden"}}>
      {Object.entries(data.posts).map(([key, post]) => (
          <StudentCard post={post} key={key} />
        ))}
    </div>
  )
}

export default StudentList