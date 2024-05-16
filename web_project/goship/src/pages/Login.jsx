import React, { useEffect, useState } from "react";
import { login, orang, gembok, amplop } from "../assets";
import image21 from "../assets/image21.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
let storage = require('../storage')
// import { putHistory, showHistory } from "../storage";

const LoginPage = () => {
  let refreshToken = Cookies.get('refresh_token')
  const navigate = useNavigate();
  

  const handleUserClick = () => {
    // Navigasi ke halaman Forgot_Password_User saat tombol "User" diklik
    navigate("/forgot-password-user");
  };

  const handleForgotPasswordClick = () => {
    // Navigasi ke halaman Forgot_Password_User saat tombol "Forgot password?" diklik
    navigate("/forgot-password-user");
  };
  const [nrp, setnrp] = useState('');
  const [password, setPassword] = useState('');

  const [formDataAdmin, setFormDataAdmin] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    if(refreshToken){
      navigate('/');
    }
  })

  const [isUserHovered, setIsUserHovered] = useState(false);
  const [isAdminHovered, setIsAdminHovered] = useState(false);
  const [isAdminForm, setIsAdminForm] = useState(false); // State untuk menentukan apakah form untuk admin sedang ditampilkan

  // const handleChangeUser = (e) => {
  //   setFormDataUser({ ...formDataUser, [e.target.name]: e.target.value });
  // };

  const handleChangeAdmin = (e) => {
    setFormDataAdmin({ ...formDataAdmin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credential = {
      nrp: nrp,
      password: password
    }
    try {
      const response = await axios.post('https://goship-apii.vercel.app/auth/login', credential);
      Cookies.set('refresh_token', response.data.token, {expires : 10 / (24 * 60)})
            
      if (response.data.user.is_first_auth === 1) {
        Swal.fire({
          title: 'Behasil!',
          text: response.data.message,
          icon: "success",

        })
        storage.set({key : response.data.user})
        navigate('/reset-password-user', { state: response.data.user  })
      }else{
        Swal.fire({
          title: 'Berhasil!',
          text: response.data.message,
          icon: "success",
        })
        localStorage.setItem('id', response.data.user.id_siswa)
        localStorage.setItem('nama', response.data.user.nama_siswa)
        localStorage.setItem('nrp', response.data.user.nrp)
        const authorizationKey = {
          user: response.data.user,
          token : response.data.token
        }
        navigate('/', {state: authorizationKey})
      }
    } catch (error) {
      console.log(error)
    }
    // if (isAdminForm) {
    //   console.log(formDataAdmin);
    // } else {
    //   console.log(formDataUser);
    // }
  };

  const handleAdminClick = () => {
    setIsAdminForm(true); // Menampilkan form untuk admin
  };

  const handleUserButtonClick = () => {
    setIsAdminForm(false);
    // handleUserClick();
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
      <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl z-10">
        <div className="mt-2 flex justify-center items-center">
          <img
            src={login}
            alt="Gambar Login"
            className="mr-5"
            style={{ width: "300px", height: "300px" }}
          />
          <div>
            <div className="flex justify-end mb-8">
              <div className="flex">
                {/* <button
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded mr-2 border border-orange-500"
                  style={{
                    backgroundColor:
                      isUserHovered || !isAdminForm ? "#F77D00" : "white",
                    color: isUserHovered || !isAdminForm ? "white" : "#F77D00",
                    borderColor: "#F77D00", // warna border orange
                  }}
                  onMouseEnter={() => setIsUserHovered(true)}
                  onMouseLeave={() => setIsUserHovered(false)}
                  onClick={handleUserButtonClick} // Tambahkan event handler untuk klik pada tombol "User"
                >
                  User
                </button> */}
                {/* <button
                  className="bg-orange-500 text-white font-bold py-2 px-4 rounded border border-orange-500"
                  style={{
                    backgroundColor:
                      isAdminHovered || isAdminForm ? "#F77D00" : "white",
                    color: isAdminHovered || isAdminForm ? "white" : "#F77D00",
                    borderColor: "#F77D00", // warna border orange
                  }}
                  onMouseEnter={() => setIsAdminHovered(true)}
                  onMouseLeave={() => setIsAdminHovered(false)}
                  onClick={handleAdminClick} // Tambahkan event handler untuk klik pada tombol "Admin"
                >
                  Admin
                </button> */}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Hei, dari mana saja kamu?
              </h2>
              <h6 className="text-xs mb-1 text-gray-500">
                Login untuk mengakses kembali fitur GoShip
              </h6>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="border-b border-gray-900/10 pb-12">
                {!isAdminForm && (
                  <>
                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
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
                    <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
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
                            placeholder="halo@moveit.com"
                            value={formDataAdmin.email}
                            onChange={handleChangeAdmin}
                            className="flex-grow py-1.5 px-3 text-gray-700 placeholder-gray-400 placeholder-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-6 mt-6">
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
              <div className="flex flex-col" style={{ marginTop: "-25px" }}>
                <button
                  type="submit"
                  className="text-white font-bold py-2 px-2 rounded mb-1"
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
