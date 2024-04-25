import React from 'react'
import styles from "../style";
import {image2,bg } from "../assets";
import ButtonExperience from "./button_experience";

const AddExperience = () => {
  return (
    <section id="Shared_Story" className={`flex md:flex-row flex-col py-5`}style={{ backgroundImage: `url(${bg})` }}>
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src={image2} alt="billing" className="w-[75%] h-[100%] relative z-[5]" />
        </div>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-10 `}>
            <div className='flex flex-row items-center justify-between w-full'>
                <p className={`${styles.paragraph} flex-1 font-poppins font-semibold ss:text-[20px] text-[20px] text-orange`}>
                    SHARE YOUR STORY
                </p>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-[40px] text-black ss:leading-[70.8px] leading-[75px]">
                    <span className="text-black">SHARE YOUR </span>{" "}
                    <span className="text-orange">INTERNSHIP</span>{" "}
                </h1>
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-[40px] text-black ss:leading-[70.8px] leading-[75px]">
                    <span className="text-orange">EXPERIENCE</span>{" "}
                    <span className="text-black">HERE</span>{" "}
                </h1>
            </div>
            <p className={`${styles.paragraph} max-w-[700px] mt-5`}>
            Share your internship experiences to guide and inspire future interns. 
            Give opportunities to others, by providing your valuable information 
            to those with high aspirations
            </p>
            <div className='flex flex-row justify-between items-center w-full '>
                <div className="flex-1 font-poppins font-semibold  text-black sm:py-17 py-6">
                    <ButtonExperience />
                </div>
            </div> 
        </div>
        
    </section>
  )
}

export default AddExperience