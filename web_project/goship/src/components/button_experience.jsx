import React from 'react';
import CardNotif from './announcement';
import CardForm from './form_post';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const ButtonExperience = () => {
      const [data, setData] = useState('');
      const id = localStorage.getItem('id');
      const [userInput, setUserInput] = useState(null)
      const [showForm, setShowForm] = useState(false);

      useEffect(() => {
            // Mengambil data dari API
            fetch(`https://goship-apii.vercel.app/api/user/${id}`)
                  .then(response => response.json())
                  .then(data => setData(data[0]));
      }, [id]);

      const handleClick = () => {
            console.log(data);
            console.log(data.semester);
            if (data.semester > 5) {
                  setUserInput(true);
            }

            setShowForm(true);
      };

      return (
            <div className='xl:max-w-[1280px] w-full h-full'>
                  <button class="bg-orange text-white hover:bg-white font-bold py-2 px-4 mt-4 border-b-2 border-white hover:text-black rounded-lg "
                        onClick={handleClick}>
                        Tambah Pengalaman
                  </button>
                  {showForm ? (userInput ? <CardForm onClose={() => setShowForm(false)} /> : <CardNotif onClose={() => setShowForm(false)} />) : null}
            </div>
      );
};

export default ButtonExperience;
