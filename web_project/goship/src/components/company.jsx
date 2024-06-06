import React from "react";
import CardCompany from "./card_company";
import { useEffect, useState } from "react";

const Perusahaan = () => {
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
      return (
            <>
                  <div style={{ padding: "0 16px" }}>
                        <section
                              id="companies"
                              style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    margin: "40px 0",
                                    padding: "20px",
                                    borderRadius: "24px",
                                    boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
                                    backgroundColor: "white",
                                    width: "100%",
                                    maxWidth: "1200px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                              }}
                        >
                              <div
                                    style={{
                                          flex: 1,
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                    }}
                              >
                                    <div style={{ textAlign: "center" }}>
                                          <h4
                                                style={{
                                                      color: "#F55F1D",
                                                      fontWeight: "bold",
                                                      fontSize: "40px",
                                                      margin: "0 0 20px",
                                                }}
                                          >
                                                OUR COMPANY
                                          </h4>
                                          <h1
                                                style={{
                                                      color: "black",
                                                      fontWeight: "bold",
                                                      fontSize: "30px",
                                                      margin: "0 0 20px",
                                                      lineHeight: "1.2",
                                                }}
                                          >
                                                <span>Dapatkan informasi tentang </span>
                                                <span style={{ color: "orange" }}>Perusahaan Impian </span>
                                          </h1>
                                    </div>
                                    <div style={{ marginTop: "auto" }}>
                                          <CardCompany />
                                    </div>
                              </div>
                        </section>
                  </div>
            </>
      );
};

export default Perusahaan;
