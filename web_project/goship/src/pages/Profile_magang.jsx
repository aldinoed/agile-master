import React, { useEffect, useState } from "react";
import styles from "../style";
import { Navbar, CardForm, Identitas, Formprofile, History, Requirement } from "../components/profile/magang"
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const Profilemagang = () => {
      const navigate = useNavigate();
      let refreshToken = Cookies.get("refresh_token");
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
                  if (isAdmin == 1) {
                        navigate('/admin')
                  }
            }
      }, [])
      return (
            <>
                  <div className=" pb-20">
                        <Navbar />
                  </div>

                  <div className="flex flex-row px-20">
                        <Identitas />
                        <div className='px-6'>
                              <Formprofile />
                        </div>
                        <div className='flex flex-col'>
                              <div className='pb-8'>
                                    <History />
                              </div>
                              <Requirement />
                        </div>
                  </div>

                  <div>
                        <div className={`${styles.flexCenter} py-16 `}>
                              <div className={`${styles.boxWidth}`}>
                                    <CardForm />
                              </div>
                        </div>
                  </div>

            </>
      )
}

export default Profilemagang