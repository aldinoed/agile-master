import React, { useEffect, useState } from 'react'
import styles from "../style";
import { Navbar, Identitas, Formprofile, Instruction } from "../components/profile/magang"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Profile_lanang, telpon, email, gender } from "../assets";
import Buttonlogout from '../components/profile/magang/button_logout';
import Loading from '../components/loading';
// import {  } from "react-router-dom";

const Profilemaba = (loggedUser) => {
      const [showInstruction, setShowInstruction] = useState(false);
      let refreshToken = Cookies.get('refresh_token')
      const location = useLocation();
      const [userFullName, setUserFullName] = useState('')
      const [userNrp, setUserNrp] = useState('')
      const [loaded, setLoaded] = useState(false);
      const state = location.state;
      const navigate = useNavigate();

      const id = localStorage.getItem('id');
      console.log("🚀 ~ Profilemaba ~ id:", id)
      useEffect(() => {
            // setUser(data);
            if (!refreshToken || localStorage.getItem('nama') == null || localStorage.getItem('id') == null || localStorage.getItem('nrp') == null) {
                  localStorage.clear()
                  navigate('/');
            } else if (refreshToken) {
                  let name = localStorage.getItem('nama')
                  setUserFullName(name)
            }
      }, []);
      useEffect(() => {
            const handleHashChange = () => {
                  setShowInstruction(window.location.hash === '#instruction');
            };

            window.addEventListener('hashchange', handleHashChange);
            handleHashChange(); // Panggil fungsi saat komponen dimuat

            return () => {
                  window.removeEventListener('hashchange', handleHashChange);
            };
      }, []);
      useEffect(() => {
            async function fetchData() {
                  try {
                        const response = await axios.get('https://goship-apii.vercel.app/api/user/' + id);
                        console.log("🚀 ~ fetchData ~ response:", response)
                        // setUser(response.data[0]);

                  } catch (error) {
                        console.error('Error fetching user data:', error);
                  }
            }
            fetchData();
      }, [])

      // useEffect(()=>{
      //   if(loggedUser != null){
      //     setUser(loggedUser);
      //   }
      // },[user])

      return (
            <>
                  {loaded == false ? <><div className='flex justify-center items-center'><Loading type={'spin'} color={"#aaaaaa"} /></div></> : userFullName === null ? <><p>DATA KOSONG</p></> : <><div className=" pb-20">
                        <Navbar />
                  </div><div className="flex flex-row px-20">
                              <div className='flex flex-col items-center  '>
                                    <div class="flex flex-col w-60 h-72 items-center  max-w-sm rounded overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                          <div className='w-50 m-6 bg-white border rounded-lg shadow'>
                                                <img className=' object-contain border rounded-lg' src={Profile_lanang} alt="asjndajkdnasjdandjasni" />
                                          </div>
                                          <h2 className='font-bold box-fill '>ajsdhajhsk''</h2>
                                    </div>
                                    <div className='pt-4'>
                                          <div class="flex flex-row w-60 p-2 max-w-sm rounded  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                <a href=""><h1 className='pl-3 text-[14px] text-ellipsis overflow-hidden '>Tentang Saya </h1></a>
                                          </div>
                                    </div>
                                    <div className='pt-4'>
                                          <div class="flex flex-row w-60 p-2 max-w-sm rounded  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                <a href="#instruction"><h1 className='pl-3 text-[14px] text-ellipsis overflow-hidden '>Pengantar KP</h1></a>
                                          </div>
                                    </div>

                                    <div className='pt-10'>
                                          <div class=" shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                <Buttonlogout />
                                          </div>
                                    </div>
                              </div>
                              <div className=' ms-5' style={{ maxWidth: "80%", minWidth: "80%" }}>



                                    {showInstruction == false ? <Formprofile /> : <Instruction />}
                              </div>

                        </div><div>
                              <div className={`${styles.flexCenter} py-16 `}>

                              </div>
                        </div></>}
            </>
      )
}

export default Profilemaba;