import React, { useEffect, useState } from "react";
import styles from "../style";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
      Hero,
      AddExperience,
      Footer,
      CustomCarousel,
      Navbar,
} from "../components";
import { image1, image2, bg } from "../assets";
import ButtonIntern from "../components/button_intern";
import ButtonExperience from "../components/button_experience";
import CardCompany from "../components/card_company";
import { Carousel } from "react-bootstrap";
import StudentList from "../components/StudentList";

const Home = () => {
      const navigate = useNavigate();
      let refreshToken = Cookies.get("refresh_token");
      const location = useLocation();
      const data = location.state;
      const [user, setUser] = useState(null);
      const [loginState, setLoginState] = useState(false);
      const [showMore, setShowMore] = useState(false);
      document.addEventListener('contextmenu', event => event.preventDefault());
      useEffect(() => {
            const handleKeyDown = (event) => {
                  if (event.ctrlKey) {
                        event.preventDefault();
                  }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                  document.removeEventListener('keydown', handleKeyDown);
            };
      }, []);
      useEffect(() => {
            if (!refreshToken) {
                  localStorage.clear();
                  navigate("/");
            } else if (refreshToken) {
                  let isAdmin = localStorage.getItem('isAdmin');
                  let name = localStorage.getItem("nama");
                  setUser(name);
                  if (isAdmin == 1) {
                        navigate('/admin')
                  }
            }
      }, []);

      useEffect(() => {
            if (user) {
                  setLoginState(true);
            } else {
                  setLoginState(false);
            }
      }, [user]);

      const toggleShowMore = () => {
            setShowMore(!showMore);
      };

      return (
            <>
                  <div
                        className={`bg-orange-gradient overflow-visible ${styles.flexStart} pb-60`}
                  >
                        <div className={`${styles.boxWidth}`}>
                              <div className="pb-16">
                                    <Navbar user={user} />
                              </div>
                              {/* Bagian Hero */}
                              <section
                                    id="home"
                                    className="flex flex-col md:flex-row px-4 md:px-8 lg:px-16 xl:px-24"
                              >
                                    <div className={`flex-1 ${styles.flexStart} flex-col`}>
                                          <div className="w-full flex flex-row items-center justify-between">
                                                <p
                                                      className={`${styles.paragraph} text-orange font-semibold text-[20px]`}
                                                >
                                                      TENTANG KAMI
                                                </p>
                                          </div>
                                          <div className="w-full flex flex-row justify-between items-center">
                                                <h1 className="flex-1 font-poppins font-semibold ss:text-[45px] text-[35px] ss:leading-[55.8px] leading-[45px]">
                                                      KISAHMU <br className="sm:block hidden" />{" "}
                                                      <span className="text-black">JADI</span>
                                                </h1>
                                          </div>
                                          <div className="w-full flex flex-row justify-between items-center">
                                                <h1 className="flex-1 font-poppins font-semibold ss:text-[45px] text-[35px] ss:leading-[55.8px] leading-[45px]">
                                                      <span className="text-black"></span>{" "}
                                                      <span className="text-orange">MAGANGKU</span>
                                                </h1>
                                          </div>
                                          <p className={`${styles.paragraph} mt-5 max-w-[700px]`}>
                                                Temukan informasi magang yang komprehensif dari rekan-rekan
                                                senior, jelajahi kisah sukses mereka, dan terhubung langsung
                                                dengan mereka melalui kontak yang disediakan di GoShip.
                                          </p>
                                          <div className="w-full flex flex-row justify-between items-center">
                                                <div className="flex-1 text-black py-6 sm:py-17">
                                                      <ButtonIntern />
                                                </div>
                                          </div>
                                    </div>
                                    <div
                                          className={`flex-1 flex ${styles.flexCenter} my-10 md:my-0 relative`}
                                    >
                                          <img
                                                src={image1}
                                                alt="hero image"
                                                className="w-full h-auto relative z-5"
                                          />
                                    </div>
                              </section>
                        </div>
                  </div>

                  <div className="relative px-4 md:px-8 lg:px-16 xl:px-24">
                        <div className={`${styles.boxWidth}`}>
                              {/* Bagian Perusahaan */}
                              <div className="object-top">
                                    <section
                                          id="companies"
                                          className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col rounded-[24px] box-shadow bg-white section-container shadow-lg`}
                                    >
                                          <div className="flex-1 flex flex-col">
                                                <div>
                                                      <h4
                                                            className={`${styles.paragraph} flex-1 font-poppins font-semibold ss:text-[30px] text-[25px]`}
                                                            style={{ color: "#F55F1D" }}
                                                      >
                                                            PERUSAHAAN KAMI
                                                      </h4>
                                                      <h1 className="flex-1 font-poppins font-semibold ss:text-[25px] text-[20px] text-black ss:leading-[50.8px] leading-[45px]">
                                                            <span className="text-black">
                                                                  Dapatkan Informasi Tentang{" "}
                                                            </span>{" "}
                                                            <span className="text-orange">Perusahaan Impianmu</span>{" "}
                                                      </h1>
                                                </div>
                                                <div className="mt-auto">
                                                      <CardCompany
                                                            showMore={showMore}
                                                            toggleShowMore={toggleShowMore}
                                                      />
                                                </div>
                                          </div>
                                    </section>
                              </div>
                        </div>
                  </div>

                  <div
                        className={`bg-white ${styles.flexCenter} ${showMore ? "pt-40" : "pt-32"
                              }`}
                  >
                        <div className={`${styles.boxWidth}`}>
                              {/* Bagian Share Your Story */}
                              <section
                                    id="Shared_Story"
                                    className="flex flex-col md:flex-row pb-5 pt-10 xs:mt-64 md:mt-5"
                                    style={{
                                          backgroundImage: `url(${bg})`,
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                    }}
                              >
                                    <div className="flex-1 flex justify-center md:my-0 my-10 relative">
                                          <img
                                                src={image2}
                                                alt="share story image"
                                                className="w-[75%] md:w-[100%] h-auto relative z-[5]"
                                          />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-start items-center md:items-start px-4 md:px-8 lg:px-16 xl:px-24">
                                          <div className="w-full">
                                                <p className="font-poppins font-semibold text-[20px] md:text-[24px] text-orange">
                                                      BAGIKAN CERITAMU
                                                </p>
                                          </div>
                                          <div className="w-full">
                                                <h1 className="font-poppins font-semibold text-[28px] md:text-[32px] text-black leading-[35px] md:leading-[50.8px]">
                                                      <span>BAGIKAN </span>
                                                      <span className="text-orange">PENGALAMAN</span>
                                                </h1>
                                          </div>
                                          <div className="w-full">
                                                <h1 className="font-poppins font-semibold text-[28px] md:text-[32px] text-black leading-[35px] md:leading-[50.8px]">
                                                      <span className="text-orange">MAGANGMU</span>
                                                      <span>DISINI</span>
                                                </h1>
                                          </div>
                                          <p className="max-w-[700px] mt-5 text-center md:text-left text-[16px] md:text-[18px]">
                                                Bagikan pengalaman magangmu untuk membimbing dan menginspirasi
                                                calon magang berikutnya. Berikan kesempatan kepada orang lain,
                                                dengan menyediakan informasi berharga kepada mereka yang
                                                memiliki aspirasi tinggi.
                                          </p>
                                          <div className="w-full flex justify-center md:justify-start">
                                                <ButtonExperience />
                                          </div>
                                    </div>
                              </section>

                              {/* Bagian Carousel */}
                              <div className="List-Carousel pt-20 pb-24">
                                    <section
                                          id="Our_story"
                                          className={`flex flex-col md:flex-row px-4 md:px-8 lg:px-16 xl:px-24`}
                                    >
                                          <div className={`flex-1 ${styles.flexStart} flex-col`}>
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
                                                            <span className="text-black">Gunakan Cerita Mereka</span>{" "}
                                                            <span className="text-orange">Sebagai Referensimu</span>{" "}
                                                      </h1>
                                                </div>
                                          </div>

                                    </section>
                                    <div className="student-list-container no-scrollbar px-4 md:px-24">
                                          <Carousel.Item>
                                                <StudentList />
                                          </Carousel.Item>
                                    </div>
                              </div>
                              <Footer />
                        </div>
                  </div>
            </>
      );
};

export default Home;
