import React from "react";
import { Carousel } from 'react-bootstrap';
import StudentList from "./StudentList";
import styles from "../style";


const CustomCarousel = () => {
  return (
    <>
    <head>
      <style></style>
    </head>
    <section id="Our_story" className={` flex md:flex-row flex-col`}>
        <div className={`flex-1 ${styles.flexStart} flex-col  `}>
    <div className='flex flex-row items-center justify-between w-full'>
      <p className={`${styles.paragraph} ml-32 text-orange font-semibold ss:text-[30px] text-[30px] `}>
        Our Story
      </p>
    </div>
    <div className="flex flex-row justify-between items-center w-full">
        <h1 className={`${styles.paragraph} ml-32 font-poppins font-semibold ss:text-[40px] text-[20px] text-black ss:leading-[100px]`}>
          <span className="text-black">Use Their</span>{" "}
          <span className="text-orange">Stories</span>{" "}
          <span className="text-black">As Your</span>{" "}
          <span className="text-orange">Reference</span>{" "}
        </h1>
    </div>
    </div>
  <div class="flex flex-row mx-auto px-20">
    <button type="button" class="text-black rounded-l-md py-2 hover:hover:text-orange ">
      <div class="flex flex-row align-middle">
        <svg class="w-10 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </button>
    <button type="button" class="text-black rounded-r-md py-2 hover:text-orange px-2 ">
      <div class="flex flex-row align-middle">
        <svg class="w-10 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </button>
  </div>
    </section>
    <div className="student-list-container no-scrollbar px-24 ">
        <Carousel.Item>
          <StudentList />
        </Carousel.Item>
    </div>
    </>
  )
}

export default CustomCarousel
