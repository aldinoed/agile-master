import React from "react"; // Menambahkan impor React
import styles from "../style";
import { Hero, AddExperience, Footer, CustomCarousel, Perusahaan } from "../components";

const Home = () => {
  return (
    <>

      <div className={` bg-orange-gradient overflow-visible ${styles.flexStart} pb-96`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      
      <div className="relative">
        <div className={`${styles.boxWidth} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4`}>
          <Perusahaan />
        </div>
      </div>


      <div className={`bg-white ${styles.flexCenter} pt-80 `}>
        <div className={`${styles.boxWidth}`}>
          <AddExperience />
          <div className="List-Carousel pt-32 pb-24">
            <CustomCarousel />
          </div>
          <Footer />
        </div>
      </div>

      
    </>
  );
};

export default Home;
