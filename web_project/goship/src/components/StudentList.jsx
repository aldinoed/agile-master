import React from "react";
import StudentCard from "./StudentCard";
import { useEffect, useState } from "react";

const
      StudentList = () => {
            document.addEventListener('contextmenu', event => event.preventDefault());
            useEffect(() => {
                  const handleKeyDown = (event) => {
                        if (event.ctrlKey || event.shiftKey) {
                              event.preventDefault();
                        }
                  };

                  document.addEventListener('keydown', handleKeyDown);

                  return () => {
                        document.removeEventListener('keydown', handleKeyDown);
                  };
            }, []);
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
                  <div className="py-5" style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}>
                        {Object.entries(data.posts).map(([key, post]) => (
                              <StudentCard post={post} key={key} />
                        ))}
                  </div>
            )
      }

export default StudentList