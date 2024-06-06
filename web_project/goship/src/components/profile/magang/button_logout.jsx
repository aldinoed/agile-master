import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Buttonlogout = () => {
      const navigate = useNavigate();
      const refreshToken = Cookies.get('refresh_token');
      // console.log(user.user.user)
      const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await axios.post('https://goship-apii.vercel.app/auth/logout')
            console.log("🚀 ~ handleSubmit ~ response:", response)
            if (refreshToken) {
                  localStorage.clear()
                  Cookies.remove('refresh_token');
                  Swal.fire({
                        title: 'Behasil!',
                        text: 'Anda sudah logout!',
                        icon: "success",

                  })
                  navigate('/');
            } else if (!refreshToken) {
                  localStorage.clear()
                  navigate('/')
            }


      }
      return (
            <div className='max-w-[1280px] min-w-[215px] h-full'>
                  <div className=''>
                        {/* Ganti button dengan Link */}
                        <form onSubmit={handleSubmit}>
                              <button className='outline bg-transparent text-orange hover:bg-orange font-bold py-2 px-24   border-orange hover:text-white outline-orange rounded'>
                                    Logout
                              </button>
                        </form>
                  </div>
            </div>
      );
};

export default Buttonlogout;
