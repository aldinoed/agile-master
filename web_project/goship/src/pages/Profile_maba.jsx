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
      const state = location.state;

      const navigate = useNavigate();
      const id = localStorage.getItem('id');
      const [oriFullName, setOriFullName] = useState('');
      const [oriNrp, setOriNrp] = useState('');
      const [oriEmail, setOriEmail] = useState('');
      const [oriPhone, setOriPhone] = useState('');
      const [oriStudyYear, setOriStudyYear] = useState('');
      const [oriStudyProgram, setOriStudyProgram] = useState('');
      const [fullName, setFullName] = useState('');
      const [nrp, setNrp] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [studyYear, setStudyYear] = useState('');
      const [studyProgram, setStudyProgram] = useState('');
      const [loaded, setLoaded] = useState(false)
      const [loadedAllData, setLoadedAllData] = useState(false)

      async function fetchData() {
            try {
                  const response = await axios.get('https://goship-apii.vercel.app/api/user/' + id);
                  setFullName(response.data[0].nama_siswa)
                  setNrp(response.data[0].nrp)
                  setEmail(response.data[0].email)
                  setPhone(response.data[0].no_telp)
                  setStudyYear(response.data[0].semester)
                  setStudyProgram(response.data[0].prodi)
                  setLoaded(true)

            } catch (error) {
                  console.error('Error fetching user data:', error);
            }
      }
      useEffect(() => {
            fetchData();
            setLoadedAllData(true)


      }, [])
      useEffect(() => {
            if (loaded === true) {
                  setOriFullName(fullName);
                  setOriNrp(nrp);
                  setOriEmail(email);
                  setOriPhone(phone);
                  setOriStudyYear(studyYear);
                  setOriStudyProgram(studyProgram);

            }

      }, [loaded]);

      // Function to handle form field changes

      // Function to reset form fields
      const handleReset = (e) => {
            e.preventDefault();
            setFullName(oriFullName)
            setNrp(oriNrp)
            setEmail(oriEmail)
            setPhone(oriPhone)
            setStudyYear(oriStudyYear)
            setStudyProgram(oriStudyProgram)
      };
      const handleSubmit = async (e) => {
            e.preventDefault();

            const data = {
                  nama: fullName,
                  email: email,
                  phone: phone,
                  id: id
            }
            try {
                  const response = await axios.post(`http://localhost:5000/api/user-profile/update`, data);

                  // navigate('/')
                  // if (response.data.user.is_first_auth === 1) {
                  //     Swal.fire({
                  //         title: 'Behasil!',
                  //         text: response.data.message,
                  //         icon: "success",

                  //     })
                  // } else {
                  //     Swal.fire({
                  //         title: 'Berhasil!',
                  //         text: response.data.message,
                  //         icon: "success",
                  //     })
                  // }
            } catch (error) {
                  console.log(error)
            }
      }
      useEffect(() => {
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
            handleHashChange();

            setLoaded(true);
            return () => {
                  window.removeEventListener('hashchange', handleHashChange);
            };
      }, []);

      return (
            <>
                  <div className=" pb-20">
                        <Navbar />
                  </div><div className="flex flex-row px-20">
                        <div className='flex flex-col items-center  '>
                              <div class="flex flex-col w-60 h-72 items-center  max-w-sm rounded overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                    <div className='w-50 m-6 bg-white border rounded-lg shadow'>
                                          <img className=' object-contain border rounded-lg' src={Profile_lanang} alt="asjndajkdnasjdandjasni" />
                                    </div>
                                    <h2 className='font-bold box-fill '>{userFullName}</h2>
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

                              {loadedAllData == false ? <div className='flex justify-center items-center'><Loading type={'spin'} color={"#aaaaaa"} /></div> :
                                    showInstruction == false ? (<div className=''>
                                          <div class="flex flex-col min-w-full max-h-full rounded  overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                <div className="flex flex-row justify-between items-center">
                                                      <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-black pl-4  ">
                                                            <span className="text-black">About</span>{" "}
                                                            <span className="text-orange">Me</span>{" "}
                                                      </h1>
                                                </div>
                                                <div className='pb-10'>
                                                      <hr class=" h-px w-6/6 mx-4 bg-gray-400 border-0 "></hr>
                                                </div>
                                                <form class="w-full" onSubmit={handleSubmit}>
                                                      <div className='flex flex-col max-h-full py-4 rounded px-6  w-full '>
                                                            <div class="md:flex flex flex-row md:items-center  mb-6">
                                                                  <div class="md:w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" for="inline-full-name">
                                                                              Nama Lengkap
                                                                        </label>
                                                                  </div>
                                                                  <div class="md:w-2/3">
                                                                        <input name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="text" required ></input>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row  md:items-center mb-6">
                                                                  <div class="md:w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" for="inline-full-name">
                                                                              NRP
                                                                        </label>
                                                                  </div>
                                                                  <div class="md:w-2/3">
                                                                        <div name="nrp" class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" required>{nrp}</div>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex  flex flex-row  md:items-center mb-6">
                                                                  <div class="md:w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" for="inline-full-name">
                                                                              Email
                                                                        </label>
                                                                  </div>
                                                                  <div class="md:w-2/3">
                                                                        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="email" required></input >
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row  md:items-center mb-6">
                                                                  <div class="md:w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                                              Telepon
                                                                        </label>
                                                                  </div>
                                                                  <div class="md:w-2/3">
                                                                        <input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="number" required></input>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row  md:items-center mb-6">
                                                                  <div class="md:w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                                              Semester
                                                                        </label>
                                                                  </div>
                                                                  <div class="md:w-2/3 items-start">
                                                                        <div name="studyYear" class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="text" >{studyYear}</div>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row  md:items-center mb-6">
                                                                  <div class="md:w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                                              Prodi Kuliah
                                                                        </label>
                                                                  </div>
                                                                  <div class="md:w-2/3">
                                                                        <div name="studyProgram" class="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="text" >{studyProgram}</div>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex  flex-row md:items-center mb-6">
                                                                  <div className='pr-14'>
                                                                        <div className='xl:max-w-[1280px] w-full h-full'>
                                                                              <div className=''>
                                                                                    {/* Ganti button dengan Link */}
                                                                                    <button className='outline bg-cream text-orange hover:bg-white font-bold py-2 px-10  border-orange hover:text-orange outline-cream rounded' onClick={handleReset}>
                                                                                          Reset
                                                                                    </button>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                                  <div className='flex flex-col  w-full h-full'>
                                                                        <div className=''>
                                                                              {/* Ganti button dengan Link */}

                                                                              <button className='outline bg-orange text-white hover:bg-white font-bold w-[345px] py-2 border-orange hover:text-orange outline-orange rounded' type='submit'>
                                                                                    Save Changes
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>
                                    ) : <Instruction />}

                        </div>

                  </div><div>

                  </div>
            </>
      )
}

export default Profilemaba;