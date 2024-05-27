import React, { useState, useEffect } from "react";
import axios from "axios";
import "../AdminDashboard.css";
import { logo1 } from "../assets"; // Hanya impor yang digunakan
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function AdminDashboard() {
  const [companies, setCompanies] = useState([]);
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
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState(""); // "add", "edit", "view"
  const [sortOrder, setSortOrder] = useState("asc");
  const [existingLogo, setExistingLogo] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

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

  const fetchSomeDetailData = async (idPerusahaan) => {
    try {
      const response = await axios.get(
        "https://goship-apii.vercel.app/api/perusahaan/" + idPerusahaan
      );
      setFormData({
        id_perusahaan: response.data[0].id_perusahaan,
        nama_perusahaan: response.data[0].nama_perusahaan,
        logo_perusahaan: response.data[0].logo_perusahaan,
        profil_perusahaan: response.data[0].profil_perusahaan,
        alamat: response.data[0].alamat,
        kota: response.data[0].kota,
        provinsi: response.data[0].provinsi,
      });
      setExistingLogo(response.data[0].logo_perusahaan);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `Error: ${error}`,
        icon: "error",
      });
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
        await axios.post(
          "https://goship-apii.vercel.app/api/perusahaan",
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      fetchCompanies();
      closeForm();
    } catch (error) {
      console.error("Error adding/updating company:", error);
    }
  };

  const handleEdit = (company) => {
    fetchSomeDetailData(company.id_perusahaan);
    setEditMode(true);
    setViewMode(false);
    setFormMode("edit");
    setFormVisible(true);
  };

  const handleView = (company) => {
    fetchSomeDetailData(company.id_perusahaan);
    setEditMode(false);
    setViewMode(true);
    setFormMode("view");
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://goship-apii.vercel.app/api/perusahaan/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const closeForm = () => {
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
    setFormVisible(false);
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
    localStorage.removeItem("userToken");
    window.location.href = "/login";
  };

  const handleAdd = () => {
    setFormMode("add");
    setFormVisible(true);
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
          <button className="btn btn-primary" onClick={handleAdd}>
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
                <div className="company-actions">
                  <button
                    onClick={() => handleView(company)}
                    className="view-button"
                    data-testid="view-button"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    onClick={() => handleEdit(company)}
                    className="edit-button"
                    data-testid="edit-button"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    onClick={() => handleDelete(company.id_perusahaan)}
                    className="delete-button"
                    data-testid="delete-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {formVisible && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 overflow-auto py-3">
            <div className="bg-white py-6 px-10 rounded-lg shadow-md max-w-full max-h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img src={logo1} alt="Goship Logo" className="h-10 w-auto mr-4" />
                  <div className="border-l-2 border-black pl-4">
                    <h2 className="text-lg font-semibold">
                      {formMode === "view" ? "View Data" : formMode === "edit" ? "Edit Data" : "Tambah Data"}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none border-2 border-black rounded-md p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleAddOrUpdate}>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="grid gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700">
                        Company profile photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {existingLogo && (
                            <img
                              src={existingLogo}
                              alt="Existing Logo"
                              className="mx-auto h-12 w-12"
                            />
                          )}
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8h-8v12H8v8h12v12h8V28h12v-8H28V8z"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="logo_perusahaan"
                              className={`relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none ${viewMode ? "hidden" : ""}`}
                            >
                              <span>Upload a file</span>
                              <input
                                id="logo_perusahaan"
                                name="logo_perusahaan"
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                                accept="image/*"
                              />
                            </label>
                            <p className={`pl-1 ${viewMode ? "hidden" : ""}`}>or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nama_perusahaan" className="block text-sm font-medium text-gray-700">
                        Nama Perusahaan
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="nama_perusahaan"
                          id="nama_perusahaan"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Nama Perusahaan"
                          value={formData.nama_perusahaan}
                          onChange={handleInputChange}
                          readOnly={viewMode}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="profil_perusahaan" className="block text-sm font-medium text-gray-700">
                        Profil Perusahaan
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="profil_perusahaan"
                          id="profil_perusahaan"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Profil Perusahaan"
                          value={formData.profil_perusahaan}
                          onChange={handleInputChange}
                          readOnly={viewMode}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="provinsi" className="block text-sm font-medium text-gray-700">
                        Provinsi
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="provinsi"
                          id="provinsi"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Provinsi"
                          value={formData.provinsi}
                          onChange={handleInputChange}
                          readOnly={viewMode}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="kota" className="block text-sm font-medium text-gray-700">
                        Kota
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="kota"
                          id="kota"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Kota"
                          value={formData.kota}
                          onChange={handleInputChange}
                          readOnly={viewMode}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                        Alamat Perusahaan
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="alamat"
                          id="alamat"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Alamat Perusahaan"
                          value={formData.alamat}
                          onChange={handleInputChange}
                          readOnly={viewMode}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className={`w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-md ${viewMode ? "hidden" : ""}`}
                        disabled={viewMode}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
