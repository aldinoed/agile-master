import React from "react";
import { Carousel } from "react-bootstrap";
import StudentList from "./StudentList";
import styles from "../style";

const CustomCarousel = () => {

      return (
            <>
                  <section id="Our_story" className={`flex flex-col md:flex-row`}>
                        <div
                              className={`flex-1 ${styles.flexStart} flex-col px-4 md:px-10 lg:px-32`}
                        >
                              <div className="flex flex-row items-center justify-between w-full">
                                    <p
                                          className={`${styles.paragraph} text-orange font-semibold text-lg md:text-xl lg:text-2xl`}
                                    >
                                          Kisah Kami
                                    </p>
                              </div>
                              <div className="flex flex-row justify-between items-center w-full">
                                    <h1
                                          className={`${styles.paragraph} font-poppins font-semibold text-lg md:text-xl lg:text-3xl leading-normal md:leading-relaxed lg:leading-loose`}
                                    >
                                          <span className="text-black">Gunakan</span>{" "}
                                          <span className="text-orange">Cerita</span>{" "}
                                          <span className="text-black">Mereka Sebagai</span>{" "}
                                          <span className="text-orange">Referensi</span>{" "}
                                    </h1>
                              </div>
                        </div>
                        <div className="flex flex-row mx-auto px-4 md:px-20">
                              <button
                                    type="button"
                                    className="text-black rounded-l-md py-2 hover:text-orange"
                              >
                                    <div className="flex flex-row items-center">
                                          <svg
                                                className="w-6 md:w-8"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                          >
                                                <path
                                                      fill-rule="evenodd"
                                                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                                      clip-rule="evenodd"
                                                ></path>
                                          </svg>
                                    </div>
                              </button>
                              <button
                                    type="button"
                                    className="text-black rounded-r-md py-2 hover:text-orange px-2"
                              >
                                    <div className="flex flex-row items-center">
                                          <svg
                                                className="w-6 md:w-8"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                          >
                                                <path
                                                      fill-rule="evenodd"
                                                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                      clip-rule="evenodd"
                                                ></path>
                                          </svg>
                                    </div>
                              </button>
                        </div>
                  </section>
                  <div className="student-list-container no-scrollbar px-4 md:px-24">
                        <Carousel.Item>
                              <StudentList />
                        </Carousel.Item>
                  </div>
            </>
      );
};

export default CustomCarousel;
