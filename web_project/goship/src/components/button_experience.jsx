import React from 'react';
import CardNotif from './announcement';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const ButtonExperience = () => {
  // const navigate = useNavigate();
  // let refreshToken = Cookies.get('refresh_token');
  // const [user, setUser] = useState(null)
  // const [loginState, setLoginState] = useState(false)
  const [showForm, setShowForm] = useState(false);
  
  // 
  
  const handleClick = () => {
    // if (user !== null) {
    //   setShowForm(true);
    // } else {
    //   navigate('/login')
    // }

    setShowForm(true);
  };

  return (
    <div className='xl:max-w-[1280px] w-full h-full'>
      <button class="bg-orange text-white hover:bg-white font-bold py-2 px-4 border-b-2 border-white hover:text-black rounded-lg "
        onClick={handleClick}>
        Add Experience
      </button>
      {showForm && <CardNotif onClose={() => setShowForm(false)} />} {/* Conditionally render the form */}
    </div>
  );
};

export default ButtonExperience;
