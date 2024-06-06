import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotuser, gembok } from "../assets";
import axios from 'axios';
import image21 from "../assets/image21.png";
import Swal from "sweetalert2";
import { createRoot } from 'react-dom/client';
import CardSuccesPass from "../components/handle_notif/notif_succes_pass";
import CardFailedPass from "../components/handle_notif/notif_failed_pass";

const ForgotPasswordUserPage = () => {
      const location = useLocation();
      const navigate = useNavigate();
      const data = location.state;
      const [user, setUser] = useState(null);
      const [password, setPassword] = useState('');
      const [confirmpassword, setConfirmPassword] = useState('');
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
      useEffect(() => {
            setUser(localStorage.getItem('nrp'));
      }, []);

      const renderComponent = (component) => {
            const container = document.createElement('div');
            document.body.appendChild(container);
            const root = createRoot(container);
            root.render(component);
            return container;
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            const resetPassword = {
                  nrp: user,
                  password: confirmpassword
            }
            try {
                  const response = await axios.post('https://goship-apii.vercel.app/auth/reset-password', resetPassword)
                  if (response.status === 200) {
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
                                                html: renderComponent(<CardSuccesPass onClose={() => Swal.close()} />),
                                                showConfirmButton: false
                                          });
                                    }, 1000);
                              }
                        });
                        navigate('/student-profile', { state: user });
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
                                                html: renderComponent(<CardFailedPass onClose={() => Swal.close()} />),
                                                showConfirmButton: false
                                          });
                                    }, 1000);
                              }
                        });
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
                                          html: renderComponent(<CardFailedPass onClose={() => Swal.close()} />),
                                          showConfirmButton: false
                                    });
                              }, 1000);
                        }
                  });
                  navigate('/');
            }
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
                                    src={forgotuser}
                                    alt="Gambar Forgot User"
                                    className="w-40 h-40 sm:w-72 sm:h-72 mb-4 sm:mb-0 sm:mr-5"
                              />
                              <div className="w-full">
                                    <div>
                                          <h2 className="text-xl sm:text-2xl font-bold mb-2">Atur Ulang Kata Sandi</h2>
                                          <h6 className="text-xs sm:text-sm mb-1 text-gray-500">
                                                Masukkan kata sandi baru untuk Akun anda
                                          </h6>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                          <div className="border-b border-gray-900/10 pb-6">
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
                                                                        placeholder="Kata sandi"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                                                                        required
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
                                                                        id="confirmpassword"
                                                                        name="confirmpassword"
                                                                        placeholder="Konfirmasi Sandi"
                                                                        value={confirmpassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                        className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                                                                        required
                                                                  />
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="flex justify-end mt-2"></div>
                                          </div>
                                          <div className="flex flex-col mt-4">
                                                <button
                                                      type="submit"
                                                      className="bg-orange-500 text-white font-bold py-2 px-4 rounded mb-1"
                                                      style={{ backgroundColor: "#F77D00" }}
                                                >
                                                      Atur Ulang Kata Sandi
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ForgotPasswordUserPage;
