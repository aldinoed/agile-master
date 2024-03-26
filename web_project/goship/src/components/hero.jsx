import React from 'react'
import styles from "../style";
import {image1 } from "../assets";
import ButtonIntern from './button_intern';

const Hero = () => {
  return (
    <section id="home" className={` flex md:flex-row flex-col`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-10 sm:py-17 py-6`}>
            <div className='flex flex-row items-center justify-between w-full'>
                <p className={`${styles.paragraph} ml-2 text-orange font-semibold ss:text-[30px] text-[30px] `}>
                    ABOUT US
                </p>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-black ss:leading-[100.8px] leading-[75px]">
                    YOUR STORY <br className="sm:block hidden" />{" "}
                    <span className="text-black">BECOME</span>{" "}
                </h1>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-black ss:leading-[100.8px] leading-[75px]">
                    <span className="text-black">MY</span>{" "}
                    <span className="text-orange">APPRENTICE</span>{" "}
                </h1>
            </div>
            <p className={`${styles.paragraph} max-w-[700px] mt-5`}>
                Discover comprehensive internship information from 
                senior peers, explore their success stories, and directly 
                connect with them through provided contacts on GoShip.
            </p>
            <div className='flex flex-row justify-between items-center w-full '>
                <div className="flex-1 font-poppins font-semibold  text-black sm:py-17 py-6">
                    <ButtonIntern />
                </div>
            </div> 
        </div>
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={image1} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />
        </div>
    </section>
  )
}

export default Hero