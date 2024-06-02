import { logo1, sukses } from "../assets";
import React from "react";

const CardEditSuccess = ({ onClose }) => {
  // State dan logika lainnya di sini...

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 overflow-auto py-3 ">
      <div
        className="bg-white py-6 px-10 rounded-lg shadow-md max-w-full max-h-full overflow-y-auto overflow-y-scroll no-scrollbar"
        style={{ width: "800px", height: "500px" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={logo1} alt="Goship Logo" className="h-10 w-auto mr-4" />
            <div className="border-l-2 border-black pl-4">
              <h2 className="text-lg font-semibold">Notifikasi Berhasil</h2>
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
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <img
            src={sukses} // Ganti yourImageHere dengan sumber gambar Anda
            alt="Sukses, menambahkan data perusahaan"
            style={{ width: "325px", height: "300px" }}
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-black">
            Selamat, Anda{" "}
            <span style={{ color: "#F77D00" }}>Berhasil Mengedit Data </span>{" "}
            Perusahaan
          </p>
          <p className="font-normal"> Lihat perubahan datanya !</p>
        </div>
      </div>
    </div>
  );
};

export default CardEditSuccess;
