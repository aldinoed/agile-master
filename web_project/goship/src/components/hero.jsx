import React from 'react'
import styles from "../style";
import {image1 } from "../assets";
import ButtonIntern from './button_intern';
import Navbar from './navbar';

const Hero = () => {
  return (
    <>
    <div className={`${styles.boxWidth} `}>
        <Navbar />
    </div>
    <section id="home" className={` flex md:flex-row flex-col`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-10`}>
            <div className='flex flex-row items-center justify-between w-full'>
                <p className={`${styles.paragraph} ml-2 text-orange font-semibold ss:text-[20px] text-[20px] `}>
                    ABOUT US
                </p>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[50px] text-[52px] text-black ss:leading-[75.8px] leading-[60px]">
                    YOUR STORY <br className="sm:block hidden" />{" "}
                    <span className="text-black">BECOME</span>{" "}
                </h1>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[50px] text-[52px] text-black ss:leading-[75.8px] leading-[60px]">
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
            <img src={image1} alt="billing" className="w-[80%] h-[100%] relative z-[5]" />
        </div>
    </section>
    </>
  )
}

export default Hero