import React from "react";
import styles from "../style";
import { image1 } from "../assets";
import ButtonIntern from "./button_intern";

const Hero = () => {
  return (
    <>
      <section id="home" className="flex flex-col md:flex-row">
        <div
          className={`flex-1 ${styles.flexStart} flex-col px-10 md:px-16 xl:px-0`}
        >
          <div className="w-full flex flex-row items-center justify-between">
            <p
              className={`${styles.paragraph} text-orange font-semibold text-[20px]`}
            >
              TENTANG KAMI
            </p>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[65px] text-[50px] ss:leading-[75.8px] leading-[60px]">
              CERITAMU <br className="sm:block hidden" />{" "}
              <span className="text-black">JADI</span>
            </h1>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[65px] text-[50px] ss:leading-[75.8px] leading-[60px]">
              <span className="text-black"></span>{" "}
              <span className="text-orange">MAGANGKU</span>
            </h1>
          </div>
          <p className={`${styles.paragraph} mt-5 max-w-[700px]`}>
            Temukan informasi magang yang komprehensif dari rekan-rekan senior,
            jelajahi kisah sukses mereka, dan terhubung langsung dengan mereka
            melalui kontak yang disediakan di GoShip.
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
            alt="billing"
            className="w-[80%] h-auto relative z-5"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
