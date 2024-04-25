import React from 'react'
import { socialMedia } from "../constant";
import styles from "../style";
import {logo2 } from "../assets";

const Footer = () => {
  return (

    <div className={`bg-orange w-full flex justify-between items-center md:flex-row  sm:px-32 px-6  border-t-[1px]`}>
        <div className={` flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={logo2} alt="billing" className="w-[100%] h-100%] relative z-[5]" />
        </div>
      <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
        Goship Corporation © 2024
      </p>

      <div className="flex flex-row md:mt-0 mt-6 sm:py-12 py-4">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>
  )
}

export default Footer