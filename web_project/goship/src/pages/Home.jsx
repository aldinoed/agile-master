import React from "react"; // Menambahkan impor React
import styles from "../style";
import { useEffect, useState } from "react";
import { Hero, AddExperience, Footer, CustomCarousel, Perusahaan, Navbar } from "../components";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Home = () => {
  const navigate = useNavigate();
  let refreshToken = Cookies.get('refresh_token')
  const location = useLocation();
  const data = location.state;
  const [user, setUser] = useState(null)
  const [loginState, setLoginState] = useState(false)
  
  useEffect(() => {
    // setUser(data);
    if (!refreshToken) {
      localStorage.clear()
      navigate('/');
    } else if (refreshToken) {
      let name = localStorage.getItem('nama')
      setUser(name)
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [user]);

  return (
    <>
      <div className={` bg-orange-gradient overflow-visible ${styles.flexStart} pb-96`}>
        <div className={`${styles.boxWidth}`}>

          <div className=" pb-16">
             <Navbar user={user}/>
          </div>
          <Hero />
        </div>
      </div>


      <div className="relative">
        <div className={`${styles.boxWidth} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4`}>
          <Perusahaan isLogged={loginState} />
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
}

export default Home;
