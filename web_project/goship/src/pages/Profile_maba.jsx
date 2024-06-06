import React, { useEffect, useState } from 'react'
import styles from "../style";
import { Instruction } from "../components/profile/magang";
import { Navbar } from "../components";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { male, female } from "../assets";
import Buttonlogout from '../components/profile/magang/button_logout';
import Loading from '../components/loading';
import Swal from 'sweetalert2';
import { createRoot } from 'react-dom/client';
import CardSuccesEdit from "../components/handle_notif/notif_succes_edit"
import CardFailedEdit from "../components/handle_notif/notif_failed_edit"

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
      const [jenisKelamin, setJenisKelamin] = useState('');
      const [fullName, setFullName] = useState('');
      const [nrp, setNrp] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [studyYear, setStudyYear] = useState('');
      const [studyProgram, setStudyProgram] = useState('');
      const [loaded, setLoaded] = useState(false)
      const [loadedAllData, setLoadedAllData] = useState(false)
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
      async function fetchData() {
            try {
                  const response = await axios.get('https://goship-apii.vercel.app/api/user/' + id);
                  setJenisKelamin(response.data[0].jenis_kelamin)
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
            setLoadedAllData(true);
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

      const renderComponent = (component) => {
            const container = document.createElement('div');
            document.body.appendChild(container);  // Make sure container is added to the body
            const root = createRoot(container);
            root.render(component);
            return container;
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            if (!refreshToken || localStorage.getItem('nama') == null || localStorage.getItem('id') == null || localStorage.getItem('nrp') == null) {
                  Swal.fire({
                        title: 'Oops!',
                        text: 'Sesi kamu habis',
                        icon: "warning",

                  })
                  localStorage.clear()

                  navigate('/login');
            }
            const data = {
                  nama: fullName,
                  email: email,
                  phone: phone,
                  id: id
            }
            try {
                  const response = await axios.post(`https://goship-apii.vercel.app/api/user-profile/update`, data);
                  if (response.status === 200) {
                        Swal.fire({
                              html: '<div class="loading-spinner"></div>', // Tambahkan spinner ke dalam konten
                              showConfirmButton: false,
                              didOpen: () => {
                                    // Tambahkan spinner secara dinamis jika .swal2-content ada
                                    const spinner = document.createElement('div');
                                    spinner.className = 'loading-spinner';
                                    const content = document.querySelector('.swal2-content');
                                    if (content) {
                                          content.appendChild(spinner);
                                    }
                                    setTimeout(() => {
                                          Swal.update({
                                                html: renderComponent(<CardSuccesEdit onClose={() => Swal.close()} />),
                                                showConfirmButton: false
                                          });
                                    }, 1000); // Atur timeout 1 detik sebelum menampilkan komponen
                              }

                        })
                        navigate('/')
                  } else {
                        Swal.fire({
                              html: '<div class="loading-spinner"></div>', // Tambahkan spinner ke dalam konten
                              showConfirmButton: false,
                              didOpen: () => {
                                    // Tambahkan spinner secara dinamis jika .swal2-content ada
                                    const spinner = document.createElement('div');
                                    spinner.className = 'loading-spinner';
                                    const content = document.querySelector('.swal2-content');
                                    if (content) {
                                          content.appendChild(spinner);
                                    }
                                    setTimeout(() => {
                                          Swal.update({
                                                html: renderComponent(<CardFailedEdit onClose={() => Swal.close()} />),
                                                showConfirmButton: false
                                          });
                                    }, 1000); // Atur timeout 1 detik sebelum menampilkan komponen
                              }

                        })
                  }
            } catch (error) {
                  Swal.fire({
                        html: '<div class="loading-spinner"></div>', // Tambahkan spinner ke dalam konten
                        showConfirmButton: false,
                        didOpen: () => {
                              // Tambahkan spinner secara dinamis jika .swal2-content ada
                              const spinner = document.createElement('div');
                              spinner.className = 'loading-spinner';
                              const content = document.querySelector('.swal2-content');
                              if (content) {
                                    content.appendChild(spinner);
                              }
                              setTimeout(() => {
                                    Swal.update({
                                          html: renderComponent(<CardFailedEdit onClose={() => Swal.close()} />),
                                          showConfirmButton: false
                                    });
                              }, 1000); // Atur timeout 1 detik sebelum menampilkan komponen
                        }

                  })
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
            <div className='w-full max-w-full m-0 p-0'>
                  <div className="pb-16">
                        <Navbar user={userFullName} />
                  </div>
                  <div className="flex md:flex-row xs:flex-col md:px-6 xs:px-2 items-start">
                        <div className='flex flex-col sm:flex-row md:flex-col w-full items-center md:max-w-80 min-w-10'>
                              <div className='w-full sm:w-1/2 md:w-full'>
                                    <div class="flex flex-col h-full items-center rounded overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                          <div className='mx-6 mt-6 bg-white border rounded-lg shadow'>
                                                <img className='object-contain border rounded-lg' src={jenisKelamin == 'Laki-laki' ? male : female} alt="asjndajkdnasjdandjasni" />
                                          </div>
                                          <h2 className='font-bold box-fill p-6'>{userFullName}</h2>
                                    </div>
                              </div>
                              <div className='flex flex-col sm:w-1/2 md:w-full sm:ms-6 md:ms-0'>
                                    <div className='pt-4 max-w-full w-full'>
                                          <a href="">
                                                <div class="p-5 max-w-full xs:min-w-[240px] sm:min-w-full md:min-w-[220px] h-full rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                      <h1 className='text-[16px] text-ellipsis overflow-hidden'>Tentang Saya</h1>
                                                </div>
                                          </a>
                                    </div>
                                    <div className='pt-4 max-w-full'>
                                          <a href="#instruction">
                                                <div class="p-5 max-w-sm xs:min-w-[240px] sm:min-w-full md:min-w-[220px] h-full rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                      <h1 className='text-[16px] text-ellipsis overflow-hidden'>Pengantar KP</h1>
                                                </div>
                                          </a>
                                    </div>
                                    <div className='md:pt-10 xs:pt-4'>
                                          <div class=" shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                <Buttonlogout />
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className='md:ms-8 xs:mx-0 max-w-full w-full pb-4'>

                              {loadedAllData == false ? <div className='flex justify-center items-center'><Loading type={'spin'} color={"#aaaaaa"} /></div> :
                                    showInstruction == false ? (<div className=''>
                                          <div class="flex flex-col md:me-0 xs:mx-0 w-full max-w-full max-h-full rounded overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                                                <div className="flex flex-row items-center">
                                                      <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-black ps-4">
                                                            <span className="text-black">About</span>{" "}
                                                            <span className="text-orange">Me</span>{" "}
                                                      </h1>
                                                </div>
                                                <div className='pb-10'>
                                                      <hr class=" h-px w-6/6 bg-gray-400 border-0 "></hr>
                                                </div>
                                                <form class="w-full" onSubmit={handleSubmit}>
                                                      <div className='flex flex-col max-h-full py-4 rounded px-6 w-full '>
                                                            <div class="md:flex flex flex-row md:items-center justify-between w-full mb-6">
                                                                  <div class="w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 text-left" for="inline-full-name">
                                                                              Nama Lengkap
                                                                        </label>
                                                                  </div>
                                                                  <div class="w-2/3">
                                                                        <input name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="text" required ></input>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row md:items-center justify-between w-full mb-6">
                                                                  <div class="w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" for="inline-full-name">
                                                                              NRP
                                                                        </label>
                                                                  </div>
                                                                  <div class="w-2/3">
                                                                        <div name="nrp" class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" required>{nrp}</div>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row md:items-center justify-between w-full mb-6">
                                                                  <div class="w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4 text-left" for="inline-full-name">
                                                                              Email
                                                                        </label>
                                                                  </div>
                                                                  <div class="w-2/3">
                                                                        <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="email" required></input >
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row md:items-center justify-between w-full mb-6">
                                                                  <div class="w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                                              Telepon
                                                                        </label>
                                                                  </div>
                                                                  <div class="w-2/3">
                                                                        <input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="number" required></input>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row md:items-center justify-between w-full mb-6">
                                                                  <div class="w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                                              Semester
                                                                        </label>
                                                                  </div>
                                                                  <div class="w-2/3">
                                                                        <div name="studyYear" class="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="text" >{studyYear}</div>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex flex-row md:items-center justify-between w-full mb-6">
                                                                  <div class="w-1/3">
                                                                        <label class="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                                                                              Prodi Kuliah
                                                                        </label>
                                                                  </div>
                                                                  <div class="w-2/3">
                                                                        <div name="studyProgram" class="bg-white-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="inline-full-name" type="text" >{studyProgram}</div>
                                                                  </div>
                                                            </div>
                                                            <div class="md:flex flex-row justify-between md:items-center w-full gap-5">
                                                                  <div className='md:w-1/3 xs:w-full h-full xs:mb-5 md:mb-0'>
                                                                        {/* Ganti button dengan Link */}
                                                                        <button className='outline bg-cream text-orange hover:bg-white font-bold py-2 px-10 w-full border-orange hover:text-orange outline-cream rounded' onClick={handleReset}>
                                                                              Reset
                                                                        </button>
                                                                  </div>
                                                                  <div className='md:w-2/3 xs:w-full h-full'>
                                                                        {/* Ganti button dengan Link */}

                                                                        <button className='outline bg-orange text-white hover:bg-white font-bold w-full py-2 border-orange hover:text-orange outline-orange rounded' type='submit'>
                                                                              Save Changes
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </form>
                                          </div>
                                    </div>
                                    ) : <Instruction />}
                        </div>
                  </div>
            </div>
      )
}

export default Profilemaba;