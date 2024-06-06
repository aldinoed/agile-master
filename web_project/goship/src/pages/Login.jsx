import React, { useEffect, useState } from "react";
import { login, orang, gembok, amplop } from "../assets";
import image21 from "../assets/image21.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import CardSuccessLogin from "../components/handle_notif/notif_succes_login"
import CardFailedLogin from "../components/handle_notif/notif_failed_login"
import { createRoot } from 'react-dom/client';
let storage = require('../storage')
// import { putHistory, showHistory } from "../storage";

const LoginPage = () => {
      let refreshToken = Cookies.get('refresh_token');
      const navigate = useNavigate();
      const isAdmin = localStorage.getItem('isAdmin');
      const checkSession = () => {
            if (refreshToken && isAdmin) {
                  navigate('/admin');
            } else if (refreshToken) {
                  navigate('/')
            }
      }

      const handleUserClick = () => {
            navigate("/forgot-password-user");
      };

      const handleForgotPasswordClick = () => {
            navigate("/forgot-password-user");
      };

      const [nrp, setnrp] = useState('');
      const [password, setPassword] = useState('');
      const [formDataAdmin, setFormDataAdmin] = useState({
            email: "",
            password: "",
      });

      useEffect(() => {
            checkSession();
      }, [refreshToken, navigate]);

      const [isUserHovered, setIsUserHovered] = useState(false);
      const [isAdminHovered, setIsAdminHovered] = useState(false);
      const [isAdminForm, setIsAdminForm] = useState(false);

      const handleChangeAdmin = (e) => {
            setFormDataAdmin({ ...formDataAdmin, [e.target.name]: e.target.value });
      };

      const renderComponent = (component) => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            const root = createRoot(container);
            root.render(component);
            return container;
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            const credential = {
                  nrp: nrp,
                  password: password
            }
            try {
                  const response = await axios.post('https://goship-apii.vercel.app/auth/login', credential);
                  Cookies.set('refresh_token', response.data.token, { expires: 10 / (24 * 60) });

                  if (response.data.user.is_first_auth === 1) {
                        Swal.fire({
                              html: '<div class="loading-spinner"></div>',
                              showConfirmButton: false,
                              didOpen: () => {
                                    const spinner = document.createElement('div');
                                    spinner.className = 'loading-spinner';
                                    const content = document.querySelector('.swal2-content');
                                    if (content) {
                                          content.appendChild(spinner);
                                    }

                                    setTimeout(() => {
                                          Swal.update({
                                                html: renderComponent(<CardSuccessLogin onClose={() => Swal.close()} />),
                                                showConfirmButton: false
                                          });
                                    }, 1000);
                              }
                        })
                        localStorage.setItem('id', response.data.user.id_siswa);
                        localStorage.setItem('nama', response.data.user.nama_siswa);
                        localStorage.setItem('nrp', response.data.user.nrp);
                        localStorage.setItem('isAdmin', response.data.user.is_admin);
                        navigate('/reset-password-user', { state: response.data.user });
                  } else {
                        Swal.fire({
                              html: '<div class="loading-spinner"></div>',
                              showConfirmButton: false,
                              didOpen: () => {
                                    const spinner = document.createElement('div');
                                    spinner.className = 'loading-spinner';
                                    const content = document.querySelector('.swal2-content');
                                    if (content) {
                                          content.appendChild(spinner);
                                    }

                                    setTimeout(() => {
                                          Swal.update({
                                                html: renderComponent(<CardSuccessLogin onClose={() => Swal.close()} />),
                                                showConfirmButton: false
                                          });
                                    }, 1000);
                              }
                        })
                        localStorage.setItem('id', response.data.user.id_siswa);
                        localStorage.setItem('nama', response.data.user.nama_siswa);
                        localStorage.setItem('nrp', response.data.user.nrp);
                        localStorage.setItem('isAdmin', response.data.user.is_admin);
                        const authorizationKey = {
                              user: response.data.user,
                              token: response.data.token
                        }
                        if (response.data.user.is_admin === 1) {
                              navigate('/admin', { state: authorizationKey });
                        }
                        else { navigate('/student-profile', { state: authorizationKey }); }
                  }
            } catch (error) {
                  Swal.fire({
                        html: '<div class="loading-spinner"></div>',
                        showConfirmButton: false,
                        didOpen: () => {
                              const spinner = document.createElement('div');
                              spinner.className = 'loading-spinner';
                              const content = document.querySelector('.swal2-content');
                              if (content) {
                                    content.appendChild(spinner);
                              }

                              setTimeout(() => {
                                    Swal.update({
                                          html: renderComponent(<CardFailedLogin onClose={() => Swal.close()} />),
                                          showConfirmButton: false
                                    });
                              }, 1000);
                        }
                  });
                  console.log(error);
            }
      };

      const handleAdminClick = () => {
            setIsAdminForm(true);
      };

      const handleUserButtonClick = () => {
            setIsAdminForm(false);
      };

      return (
            <div
                  className="flex justify-center items-center h-screen relative"
                  style={{
                        backgroundImage: `url(${image21})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                  }}
            >
                  <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 max-w-lg sm:max-w-2xl z-10 w-full mx-2">
                        <div className="mt-2 flex flex-col sm:flex-row justify-center items-center">
                              <img
                                    src={login}
                                    alt="Gambar Login"
                                    className="w-40 h-40 sm:w-72 sm:h-72 mb-4 sm:mb-0 sm:mr-5"
                              />
                              <div className="w-full">
                                    <div className="flex justify-end mb-8">
                                          <div className="flex">
                                                {/* Tombol User dan Admin */}
                                          </div>
                                    </div>
                                    <div>
                                          <h2 className="text-xl sm:text-2xl font-bold mb-2">
                                                Hei, dari mana saja kamu?
                                          </h2>
                                          <h6 className="text-xs sm:text-sm mb-1 text-gray-500">
                                                Login untuk mengakses kembali fitur GoShip
                                          </h6>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                          <div className="border-b border-gray-900/10 pb-6">
                                                {!isAdminForm && (
                                                      <>
                                                            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
                                                                  <div className="sm:col-span-6">
                                                                        <div className="input-group flex border border-1 rounded-md w-full">
                                                                              <img
                                                                                    src={orang}
                                                                                    alt="profile"
                                                                                    className="input-icon m-2 h-5 w-5"
                                                                              />
                                                                              <input
                                                                                    type="number"
                                                                                    name="nrp"
                                                                                    id="nrp"
                                                                                    placeholder="NRP"
                                                                                    value={nrp}
                                                                                    onChange={(e) => setnrp(e.target.value)}
                                                                                    className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                                                                              />
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
                                                                  <div className="sm:col-span-6">
                                                                        <div className="input-group flex border border-1 rounded-md w-full">
                                                                              <img
                                                                                    src={gembok}
                                                                                    alt="password"
                                                                                    className="input-icon m-2 h-5 w-5"
                                                                              />
                                                                              <input
                                                                                    type="password"
                                                                                    id="password"
                                                                                    name="password"
                                                                                    placeholder="Masukkan Kata Sandi Anda"
                                                                                    value={password}
                                                                                    onChange={(e) => setPassword(e.target.value)}
                                                                                    className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                                                                                    required
                                                                              />
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </>
                                                )}
                                                {/* {isAdminForm && ( // Menampilkan form untuk admin jika isAdminForm true
                  <div>
                    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <div className="input-group flex border border-1 rounded-md w-full">
                          <img
                            src={amplop}
                            alt="email"
                            className="input-icon m-2 h-5 w-5"
                          />
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="halo@moveit.com"
                            value={formDataAdmin.email}
                            onChange={handleChangeAdmin}
                            className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-6 mt-4">
                      <div className="input-group flex border border-1 rounded-md w-full">
                        <img
                          src={gembok}
                          alt="password"
                          className="input-icon m-2 h-5 w-5"
                        />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Masukkan Kata Sandi Anda"
                          value={formDataAdmin.password}
                          onChange={handleChangeAdmin}
                          className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )} */}
                                                {/* <div className="flex justify-end mt-2">
                  <a
                    href={
                      isAdminForm
                        ? "/forgot-password-admin"
                        : "/forgot-password-user"
                    }
                    className="text-xs text-orange-500 hover:underline"
                    style={{ color: "#F77D00" }}
                  >
                    Tidak ingat kata sandi?
                  </a>
                </div> */}
                                          </div>
                                          <div className="flex flex-col mt-4">
                                                <button
                                                      type="submit"
                                                      className="bg-orange-500 text-white font-bold py-2 px-4 rounded mb-1"
                                                      style={{ backgroundColor: "#F77D00" }}
                                                >
                                                      Masuk
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default LoginPage;
