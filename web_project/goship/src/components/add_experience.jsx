import React from "react";
import styles from "../style";
import { image2, bg } from "../assets";
import ButtonExperience from "./button_experience";

const AddExperience = () => {
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
            <section
                  id="Shared_Story"
                  className="flex flex-col md:flex-row py-5"
                  style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                  }}
            >
                  <div className="flex-1 flex justify-center md:my-0 my-10 relative">
                        <img
                              src={image2}
                              alt="billing"
                              className="w-[75%] md:w-[100%] h-auto relative z-[5]"
                        />
                  </div>
                  <div className="flex-1 flex flex-col justify-start items-center md:items-start px-10 md:px-16 xl:px-0">
                        <div className="w-full">
                              <p className="font-poppins font-semibold text-[20px] md:text-[24px] text-orange">
                                    BAGIKAN CERITA ANDA
                              </p>
                        </div>
                        <div className="w-full">
                              <h1 className="font-poppins font-semibold text-[32px] md:text-[40px] text-black leading-[45px] md:leading-[70.8px]">
                                    <span>BAGIKAN </span>
                                    <span className="text-orange">PENGALAMAN MAGANG ANDA</span>
                              </h1>
                        </div>
                        <div className="w-full">
                              <h1 className="font-poppins font-semibold text-[32px] md:text-[40px] text-black leading-[45px] md:leading-[75px]">
                                    <span className="text-orange"></span>
                                    <span>DISINI</span>
                              </h1>
                        </div>
                        <p className="max-w-[700px] mt-5 text-center md:text-left text-[18px] md:text-[20px]">
                              Bagikan pengalaman magang Anda untuk membimbing dan menginspirasi
                              calon peserta magang. Berikan kesempatan kepada orang lain, dengan
                              memberikan informasi berharga Anda kepada mereka yang memiliki
                              aspirasi tinggi.
                        </p>
                        <div className="w-full flex justify-center md:justify-start">
                              <ButtonExperience />
                        </div>
                  </div>
            </section>
      );
};

export default AddExperience;
