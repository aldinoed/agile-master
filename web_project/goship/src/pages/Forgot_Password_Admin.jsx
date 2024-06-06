import React, { useState } from "react";
import { forgotadmin, amplop } from "../assets";
import image21 from "../assets/image21.png";
import { useEffect } from "react";

const ForgotPasswordAdminPage = () => {
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
      const [formData, setFormData] = useState({
            password: "",
            confirmpassword: "",
      });

      const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formData);
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
                  <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl z-10"> {/* Changed max-w-3xl to max-w-4xl */}
                        <div className="mt-2 flex justify-center items-center">
                              <img
                                    src={forgotadmin}
                                    alt="Gambar Forgot Admin"
                                    className="mr-5"
                                    style={{ width: "300px", height: "300px" }}
                              />
                              <div>
                                    <div>
                                          <h2 className="text-2xl font-bold mb-2">Forgot your password</h2>
                                          <h6 className="text-xs mb-1 text-gray-500">
                                                Masukkan email di bawah untuk memulai ulang kata sandi Anda
                                          </h6>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                          <div className="border-b border-gray-900/10 pb-12">
                                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
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
                                                                        placeholder="hello@moveit.com"
                                                                        value={formData.email}
                                                                        onChange={handleChange}
                                                                        className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                                                                  />
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="flex justify-end mt-2"></div>
                                          </div>
                                          <div className="flex flex-col" style={{ marginTop: "-1px" }}>
                                                <button
                                                      type="submit"
                                                      className="text-white font-bold py-2 px-2 rounded mb-1"
                                                      style={{ backgroundColor: "#F77D00" }}
                                                >
                                                      Kirim
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default ForgotPasswordAdminPage;
