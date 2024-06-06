import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CardCompany = () => {
      const navigate = useNavigate();
      const [showMore, setShowMore] = useState(false);
      const [data, setData] = useState([]);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const response = await fetch(
                              "https://goship-apii.vercel.app/api/data",
                              {
                                    headers: {
                                          "Access-Control-Allow-Origin": "*",
                                    },
                              }
                        );
                        const fetchedData = await response.json();
                        setData(fetchedData); // Assuming the API response directly matches the structure of the provided JSON data
                  } catch (error) {
                        console.error("Error fetching data:", error);
                        // Handle error gracefully, e.g., display a fallback message
                  }
            };

            fetchData();
      }, []);

      const handleCardClick = (id_perusahaan) => {
            navigate(`/detail-company/${id_perusahaan}`);
      };

      const toggleShowMore = () => {
            setShowMore(!showMore);
      };

      return (
            <div className="card--container px-4 md:px-8 lg:px-16 xl:px-24">
                  <div
                        className="row"
                        style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                              gap: "10px",
                              gridRowGap: "20px",
                        }}
                  >
                        {data.slice(0, showMore ? data.length : 8).map((company) => (
                              <div key={company.id_perusahaan} className="company-card">
                                    <button
                                          onClick={() => handleCardClick(company.id_perusahaan)}
                                          style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                border: "none",
                                                backgroundColor: "transparent",
                                                cursor: "pointer",
                                                width: "100%",
                                                height: "100%",
                                          }}
                                    >
                                          <div
                                                className="rounded-lg overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] items-center justify-center"
                                                style={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                      alignItems: "center",
                                                      width: "100%",
                                                }}
                                          >
                                                <div className="card-image">
                                                      {company.logo_perusahaan ? (
                                                            <img
                                                                  className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded"
                                                                  src={company.logo_perusahaan}
                                                                  alt={company.nama_perusahaan}
                                                            />
                                                      ) : (
                                                            <div className="placeholder-icon">
                                                                  <i className="fas fa-image-not-found"></i>
                                                            </div>
                                                      )}
                                                </div>
                                          </div>
                                          <div className="card-title text-[10px] sm:text-[12px] font-bold py-2 text-center">
                                                {company.nama_perusahaan}
                                          </div>
                                    </button>
                              </div>
                        ))}
                        {data.length > 8 && (
                              <div
                                    key="show-more"
                                    className="card text-[30px] font-bold flex justify-center items-center"
                              >
                                    <div className="h-[70px] sm:h-[90px] rounded-lg overflow-hidden shadow-[rgba(0,0,0,0.24)_0px_3px_8px] flex items-center justify-center">
                                          <div className="px-3">
                                                <button onClick={toggleShowMore} style={{ color: '#F77F00' }}>
                                                      {showMore ? "Less" : "More"}
                                                </button>
                                          </div>
                                    </div>

                              </div>
                        )}
                  </div>
            </div>
      );
};

export default CardCompany;
