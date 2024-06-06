import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { useEffect, useState } from "react";

const ButtonSignIn = () => {
      document.addEventListener('contextmenu', event => event.preventDefault());
      useEffect(() => {
            const handleKeyDown = (event) => {
                  if (event.ctrlKey || event.shiftKey) {
                        event.preventDefault();
                  }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                  document.removeEventListener('keydown', handleKeyDown);
            };
      }, []);
      return (
            <div className='xl:max-w-[1280px] w-full h-full'>
                  <div className=''>
                        {/* Ganti button dengan Link */}
                        <Link to="/login">
                              <button className='outline bg-transparent text-orange hover:bg-orange font-bold py-2 px-4 border-b-2 border-orange hover:text-white outline-orange rounded'>
                                    Masuk
                              </button>
                        </Link>
                  </div>
            </div>
      );
};

export default ButtonSignIn;
