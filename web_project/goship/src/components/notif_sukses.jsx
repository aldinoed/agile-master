<<<<<<< HEAD
import {
    logo1,
    sukses                                                                                                  
  } from "../assets";
  import React, {  } from "react";
  
  const CardSuccess = ({ onClose }) => {
    // State dan logika lainnya di sini...
  
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 overflow-auto py-3 ">
        <div className="bg-white py-6 px-10 rounded-lg shadow-md max-w-full max-h-full overflow-y-auto overflow-y-scroll no-scrollbar"
        style={{ width: '800px', height: '500px' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src={logo1} alt="Goship Logo" className="h-10 w-auto mr-4" />
              <div className="border-l-2 border-black pl-4">
                <h2 className="text-lg font-semibold">Notifikasi Sukses</h2>
              </div>
=======
import { logo1, sukses } from "../assets";
import React from "react";

const CardSuccess = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 py-3">
      <div className="bg-white py-6 px-4 sm:px-6 md:px-10 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center flex-wrap">
            <img src={logo1} alt="Goship Logo" className="h-8 w-auto mr-2 sm:mr-4" />
            <div className="border-l-2 border-black pl-2 sm:pl-4">
              <h2 className="text-base sm:text-lg font-semibold">Notification Success</h2>
>>>>>>> 512787e6409ad807a14b3845000083c91d52676c
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none border-2 border-black rounded-md p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
<<<<<<< HEAD
              
            </button>
          </div>
  
         
  
          <div className="mt-4 flex items-center justify-center">
            <img
              src={sukses} // Ganti yourImageHere dengan sumber gambar Anda
              alt="Sorry, at this time you cannot add data"
              style={{ width: "325px", height: "300px" }}
            />
          </div>
  
          <div className="text-center mt-4">
            <p className="text-black">Selamat, Anda  {" "}
            <span style={{ color: '#F77D00'}}>Anda telah berhasil menyimpan</span> data
            </p>
            <p className="font-normal"> Terima Kasih!</p>
          </div>
=======
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <img
            src={sukses}
            alt="Success"
            className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px]"
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-black text-sm sm:text-base">
            Congratulations, you <span className="text-orange-500">have successfully saved</span> the data
          </p>
          <p className="font-normal text-sm sm:text-base">Thank you!</p>
>>>>>>> 512787e6409ad807a14b3845000083c91d52676c
        </div>
      </div>
    </div>
  );
};

export default CardSuccess;
