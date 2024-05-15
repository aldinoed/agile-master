import React, { useState, useEffect } from "react"; // Menambahkan impor React
import styles from "../style";
import "../DetailMahasiswa.css";
import { profile } from "../assets";
import { Navbar, Footer } from "../components";
import axios from "axios";

const DetailMahasiswa = () => {
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://103.127.135.153:5000/api/user/:id")
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
  return (
    <>
      <div className="w-full bg-orange-gradient-navbar">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-bg">
          <h1 className="profile-name">{profileData.nama_siswa}</h1>
        </div>
        <img src={profile} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <p>
            <i className="fas fa-phone"></i> Number Phone :{" "}
            <span style={{ color: "#605B57" }}>{profileData.no_telp}</span>
          </p>
          <p>
            <i className="fas fa-envelope"></i> Email : {""}
            <span style={{ color: "#605B57" }}>{profileData.email}</span>
          </p>
          <p>
            <i className="fas fa-graduation-cap"></i> Prodi :{" "}
            <span style={{ color: "#605B57" }}>{profileData.prodi}</span>
          </p>
        </div>
      </div>

      {/* Internship Information */}
      <div className="internship-info">
        <div className="internship-info-detail">
          <h2>
            Information about my{" "}
            <span style={{ color: "#F77D00" }}>internship activities</span>
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
        <div className="internship-requirements-detail">
          <h2>
            Internship <span style={{ color: "#F77D00" }}>requirements</span>
          </h2>
          <ul>
            <li>Menguasai skill Javascript, CSS.</li>
            <li>Lebih disukai: vuejs, nuxtjs, reactjs, nextjs.</li>
            <li>Mengikuti standar coding yang baik;</li>
            <li>Menambahkan komentar pada kode untuk memudahkan pemahaman;</li>
            <li>Menulis kode yang mudah diuji.</li>
          </ul>
        </div>
      </div>

      {/* Profile Footer */}
      <div className="profile-footer">
        <div className="profile-footer-detail">
          <h2>My History</h2>
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
    </>
  );
};

export default DetailMahasiswa;
