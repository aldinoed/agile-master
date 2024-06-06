import React, { useState, useEffect } from "react"; // Menambahkan impor React
import styles from "../style";
import "../DetailMahasiswa.css";
import male from '../assets/male.png';
import female from '../assets/female.png';
import { Navbar, Footer } from "../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DetailMahasiswa = () => {
      const param = useParams();
      const id = param.id;
      const [profileData, setProfileData] = useState({});
      const [error, setError] = useState("");
      const navigate = useNavigate();
      let refreshToken = Cookies.get("refresh_token");
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
            if (!refreshToken) {
                  localStorage.clear();
                  navigate("/login");
            } else if (refreshToken) {
                  let isAdmin = localStorage.getItem('isAdmin');
                  if (isAdmin == 1) {
                        navigate('/admin')
                  }
            }
      }, [])

      useEffect(() => {
            axios
                  .get("https://goship-apii.vercel.app/api/user/" + id)
                  .then((response) => {
                        if (response.data && response.data.length > 0) {
                              setProfileData(response.data[0]); // Menyimpan data pertama dari array ke state
                        } else {
                              setError("No data found");
                        }
                  })
                  .catch((error) => {
                        setError("Failed to fetch data");
                        console.error("Error fetching data: ", error);
                  });
      }, []);

      if (error) {
            return <p>{error}</p>;
      }
      const image = profileData.jenis_kelamin === 'Laki-laki' ? male : female;
      return (
            <div className="m-0 p-0 w-full h-full">
                  {/* <div className="w-full bg-orange-gradient-navbar"> */}
                  <div className={`top-0`}>
                        <Navbar />
                  </div>
                  {/* </div> */}

                  {/* Profile Header */}
                  <div className="profile-header flex flex-col md:flex-row items-center">
                        <div className="profile-bg flex-1">
                              <h1 className="profile-name text-2xl md:text-4xl">{profileData.nama_siswa}</h1>
                        </div>
                        <img src={image} alt="Profile" className="profile-image w-32 h-32 md:w-48 md:h-48 rounded-full" />
                        <div className="profile-info flex-1 mt-4 md:mt-0 md:ml-4">
                              <p className="text-base md:text-lg flex items-center">
                                    <i className="fas fa-phone mr-2"></i> Nomer Telepon:{" "}
                                    <span style={{ color: "#605B57" }} className="ml-1">{profileData.no_telp}</span>
                              </p>
                              <p className="text-base md:text-lg flex items-center mt-2">
                                    <i className="fas fa-envelope mr-2"></i> Email:{" "}
                                    <span style={{ color: "#605B57" }} className="ml-1">{profileData.email}</span>
                              </p>
                              <p className="text-base md:text-lg flex items-center mt-2">
                                    <i className="fas fa-graduation-cap mr-2"></i> Prodi:{" "}
                                    <span style={{ color: "#605B57" }} className="ml-1">{profileData.prodi}</span>
                              </p>
                        </div>
                  </div>

                  {/* Internship Information */}
                  <div className="internship-info">
                        <div className="internship-info-detail">
                              <h2>
                                    Informasi Saya{" "}
                                    <span style={{ color: "#F77D00" }}>Kegiatan Selama Magang</span>
                              </h2>
                              <div className="info-row">
                                    <div className="info">
                                          <i className="fas fa-building"></i>
                                          <div className="details">
                                                <h3>Tempat Magang</h3>
                                                <p>{profileData.nama_perusahaan}</p>
                                          </div>
                                    </div>
                                    <div className="info">
                                          <i className="fas fa-calendar-alt"></i>
                                          <div className="details">
                                                <h3>Durasi Magang</h3>
                                                <p>{profileData.durasi_magang} bulan</p>
                                          </div>
                                    </div>
                              </div>
                              <div className="info-row">
                                    <div className="info">
                                          <i className="fas fa-map-marker-alt"></i>
                                          <div className="details">
                                                <h3>Lokasi Magang</h3>
                                                <p>{profileData.alamat}</p>
                                          </div>
                                    </div>
                                    <div className="info">
                                          <i className="fas fa-star"></i>
                                          <div className="details">
                                                <h3>Privilage</h3>
                                                <p>
                                                      {profileData.is_uang_saku === 1
                                                            ? "Mendapatkan uang saku"
                                                            : "Tidak dapat uang saku"}
                                                </p>
                                          </div>
                                    </div>
                              </div>
                              <div className="info-row">
                                    <div className="info">
                                          <i className="fas fa-book"></i>
                                          <div className="details">
                                                <h3>Devisi Magang</h3>
                                                <p>{profileData.nama_posisi}</p>
                                          </div>
                                    </div>
                                    <div className="info">
                                          <i className="fas fa-trophy"></i>
                                          <div className="details">
                                                <h3>Title of internship report</h3>
                                                <p>{profileData.judul_laporan}</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* Internship Requirements */}
                  <div className="internship-requirements">
                        <div className="internship-requirements-detail details pb-6">
                              <h2>
                                    Persyaratan <span style={{ color: "#F77D00" }}>Magang</span>
                              </h2>
                              <p className="ms-2">{profileData.syarat_magang}</p>
                        </div>
                  </div>

                  {/* Profile Footer */}
                  <div className="profile-footer">
                        <div className="profile-footer-detail details pb-6">
                              <h2>Cerita Saya</h2>
                              <div className="history-date">
                                    <span>
                                          {profileData.created_at
                                                ? profileData.created_at.split("T")[0]
                                                : "Loading..."}
                                    </span>
                              </div>
                              <p>{profileData.deskripsi_magang}</p>
                        </div>
                  </div>

                  <div className={`bg-white ${styles.flexCenter} pt-80 `}>
                        <div className={`${styles.boxWidth}`}>
                              <Footer />
                        </div>
                  </div>
            </div>
      );
};

export default DetailMahasiswa;
