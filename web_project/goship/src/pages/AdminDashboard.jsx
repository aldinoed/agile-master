import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/AdminDashboard.css";
import { logo1, menu, close, comp } from "../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import Loading from "../components/loading";

function AdminDashboard() {
      const [companies, setCompanies] = useState([]);
      const [detailCompanyName, setDetailCompanyName] = useState('')
      const [detailCompanyProfile, setDetailCompanyProfile] = useState('')
      const [detailCompanyAddress, setDetailCompanyAddress] = useState('')
      const [detailCompanyCity, setDetailCompanyCity] = useState('')
      const [detailCompanyProvince, setDetailCompanyprovince] = useState('')
      const [detailDataReady, setDetailDataReady] = useState(false)
      const [formData, setFormData] = useState({
            id_perusahaan: "",
            nama_perusahaan: "",
            logo_perusahaan: "",
            profil_perusahaan: "",
            alamat: "",
            kota: "",
            provinsi: "",
      });
      const [editMode, setEditMode] = useState(false);
      const [viewMode, setViewMode] = useState(false);
      const [popupVisible, setPopupVisible] = useState(false);
      const [sortOrder, setSortOrder] = useState("asc");
      const [existingLogo, setExistingLogo] = useState("");

      useEffect(() => {
            fetchCompanies();
      }, []);

      const fetchSomeDetailData = async (idPerusahaan) => {

            try {
                  const response = await axios.get('https://goship-apii.vercel.app/api/perusahaan/' + idPerusahaan)
                  console.log("🚀 ~ fetchSomeDetailData ~ response:", response)
                  setDetailCompanyAddress(response.data[0].alamat)
                  setDetailCompanyCity(response.data[0].kota)
                  setDetailCompanyName(response.data[0].nama_perusahaan)
                  setDetailCompanyprovince(response.data[0].provinsi)
                  setExistingLogo(response.data[0].logo_perusahaan)
                  setDetailCompanyProfile('Tidak ada datanya emang woy')
                  setDetailDataReady(true);
            } catch (error) {
                  Swal.fire({
                        title: "Error!",
                        text: `Error: ${error}`,
                        icon: "error"

                  })
            }

      }

      const fetchCompanies = async () => {
            try {
                  const response = await axios.get(
                        "https://goship-apii.vercel.app/api/perusahaan"
                  );
                  setCompanies(response.data);


            } catch (error) {
                  console.error("Error fetching companies:", error);
            }
      };

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
      };

      const handleFileChange = (e) => {
            const { name, files } = e.target;
            setFormData({ ...formData, [name]: files[0] });
      };

      const handleAddOrUpdate = async (e) => {
            e.preventDefault();
            const data = new FormData();
            for (const key in formData) {
                  data.append(key, formData[key]);
            }

            try {
                  if (editMode) {
                        await axios.put(
                              `https://goship-apii.vercel.app/api/perusahaan/${formData.id_perusahaan}`,
                              data,
                              {
                                    headers: { "Content-Type": "multipart/form-data" },
                              }
                        );
                  } else {
                        await axios.post("https://goship-apii.vercel.app/api/perusahaan", data, {
                              headers: { "Content-Type": "multipart/form-data" },
                        });
                  }
                  fetchCompanies();
                  closePopup();
            } catch (error) {
                  console.error("Error adding/updating company:", error);
            }
      };

      const handleEdit = (company) => {
            fetchSomeDetailData(company.id_perusahaan)
            setFormData({
                  ...company,
                  logo_perusahaan: "", // Reset logo field for file input
            });
            setExistingLogo(company.logo_perusahaan);
            setEditMode(true);
            setPopupVisible(true);
      };

      const handleView = (company) => {
            setFormData(company);
            setExistingLogo(company.logo_perusahaan);
            setViewMode(true);
            setPopupVisible(true);
            fetchSomeDetailData(company.id_perusahaan);
      };

      const handleDelete = async (id) => {
            try {
                  await axios.delete(`https://goship-apii.vercel.app/api/perusahaan/${id}`);
                  fetchCompanies();
            } catch (error) {
                  console.error("Error deleting company:", error);
            }
      };

      const closePopup = () => {
            setFormData({
                  id_perusahaan: "",
                  nama_perusahaan: "",
                  logo_perusahaan: "",
                  profil_perusahaan: "",
                  alamat: "",
                  kota: "",
                  provinsi: "",
            });
            setEditMode(false);
            setViewMode(false);
            setPopupVisible(false);
            setDetailDataReady(false)
            setExistingLogo("");
      };

      const handleSort = () => {
            const sortedCompanies = [...companies].sort((a, b) => {
                  if (sortOrder === "asc") {
                        return a.id_perusahaan > b.id_perusahaan ? 1 : -1;
                  } else {
                        return a.id_perusahaan < b.id_perusahaan ? 1 : -1;
                  }
            });
            setCompanies(sortedCompanies);
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      };

      const handleLogout = () => {
            localStorage.removeItem("userToken"); // Remove user token or any authentication data
            window.location.href = "/login"; // Redirect to login page
      };

      return (
            <div className="App">
                  <header>
                        <img src={logo1} alt="Goship" className="w-[150px] h-[40px]" />

                        <button onClick={handleLogout} className="logout-button">
                              Logout
                        </button>
                  </header>
                  <main>
                        <div className="header-container">
                              <h1>Kelola Akun Perusahaan</h1>
                              <button
                                    className="btn btn-primary"
                                    onClick={() => setPopupVisible(true)}
                              >
                                    Tambah Data
                              </button>
                        </div>
                        <div className="title-container">
                              <div
                                    className="title-item-id"
                                    onClick={handleSort}
                                    style={{ cursor: "pointer" }}
                              >
                                    ID {sortOrder === "asc" ? "↑" : "↓"}
                              </div>
                              <div className="title-item">Nama Perusahaan</div>
                              {/* <div className="title-item">Profil Perusahaan</div>
                              <div className="title-item">Kota</div>
                              <div className="title-item">Provinsi</div>
                              <div className="title-item">Alamat</div> */}
                              <div className="title-item">Aksi</div>
                        </div>
                        <div className="company-list">
                              {companies.map((company) => (
                                    <div key={company.id_perusahaan} className="company-card-container">
                                          <div className="company-card">
                                                <div className="company-id">{company.id_perusahaan}</div>
                                                <div className="flex detail">
                                                      <div className="company-logo-container">
                                                            <img
                                                                  src={company.logo_perusahaan}
                                                                  alt={company.nama_perusahaan}
                                                                  className="company-logo"
                                                            />
                                                      </div>
                                                      <div className="company-name">{company.nama_perusahaan}</div>
                                                </div>

                                                {/* <div className="company-profile">
                                                      profilllllllllllllllllllllllllllll
                                                </div>
                                                <div className="company-location">
                                                      <span>{company.alamat}</span>
                                                </div>
                                                <div className="company-location">
                                                      <span>sggsafgagreg</span>
                                                </div>
                                                <div className="company-address ">
                                                      aegeragergezregergzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzgz
                                                </div> */}
                                                <div className="company-actions">
                                                      <button onClick={() => handleView(company)} className="view-button">
                                                            <FontAwesomeIcon icon={faEye} />
                                                      </button>
                                                      <button onClick={() => handleEdit(company)} className="edit-button">
                                                            <FontAwesomeIcon icon={faPen} />
                                                      </button>
                                                      <button onClick={() => handleDelete(company.id_perusahaan)} className="delete-button">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {popupVisible && (
                              <div className="popup">
                                    <div className="popup-inner">

                                          <h2>
                                                {viewMode
                                                      ? "View Data"
                                                      : editMode
                                                            ? "Edit Data"
                                                            : "Tambah Data"}
                                          </h2>
                                          {detailDataReady == true ? (
                                                <form onSubmit={handleAddOrUpdate}>
                                                      <input
                                                            type="text"
                                                            name="nama_perusahaan"
                                                            placeholder="Nama Perusahaan"
                                                            value={detailCompanyName}
                                                            onChange={e => setDetailCompanyName(e.target.value)}
                                                            readOnly={viewMode}
                                                            required
                                                      />
                                                      <input
                                                            type="text"
                                                            name="profil_perusahaan"
                                                            placeholder="Profil Perusahaan"
                                                            value={detailCompanyProfile}
                                                            onChange={e => setDetailCompanyProfile(e.target.value)}
                                                            readOnly={viewMode}
                                                            required
                                                      />
                                                      <input
                                                            type="text"
                                                            name="alamat"
                                                            placeholder="Alamat"
                                                            value={detailCompanyAddress}
                                                            onChange={e => setDetailCompanyAddress(e.target.value)}
                                                            readOnly={viewMode}
                                                            required
                                                      />
                                                      <input
                                                            type="text"
                                                            name="kota"
                                                            placeholder="Kota"
                                                            value={detailCompanyCity}
                                                            onChange={e => setDetailCompanyCity(e.target.value)}
                                                            readOnly={viewMode}
                                                            required
                                                      />
                                                      <input
                                                            type="text"
                                                            name="provinsi"
                                                            placeholder="Provinsi"
                                                            value={detailCompanyProvince}
                                                            onChange={e => setDetailCompanyprovince(e.target.value)}
                                                            readOnly={viewMode}
                                                            required
                                                      />
                                                      {!viewMode && (
                                                            <>
                                                                  {existingLogo && (
                                                                        <img
                                                                              src={existingLogo}
                                                                              alt="Existing Logo"
                                                                              className="existing-logo"
                                                                        />
                                                                  )}
                                                                  <input
                                                                        type="file"
                                                                        name="logo_perusahaan"
                                                                        onChange={handleFileChange}
                                                                        accept="image/*"
                                                                  />
                                                            </>
                                                      )}
                                                      {!viewMode && (
                                                            <button type="submit">{editMode ? "Update" : "Add"}</button>
                                                      )}
                                                </form>) : (<div className='flex justify-center items-center'><Loading type={'spin'} color={"#aaaaaa"} /></div>)}
                                          <button className="btn btn-secondary" onClick={closePopup}>
                                                Close
                                          </button>
                                    </div>

                              </div>
                        )}
                  </main>
            </div>
      );
}

export default AdminDashboard;
