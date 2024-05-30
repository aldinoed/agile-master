import {
  logo1,
  profile,
  location,
  card,
  calendar,
  star,
  dokumen,
} from "../assets";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { createRoot } from 'react-dom/client';
import CardSuccessForm from "../components/handle_notif/notif_succes_form"
import CardFailedForm from "../components/handle_notif/notif_failed_form"
import Swal from "sweetalert2"

const CardForm = ({ onClose }) => {
  const [perusahaanData, setPerusahaanData] = useState([]);
  useEffect(() => {
    fetch('https://goship-apii.vercel.app/api/perusahaan/')
      .then(response => response.json())
      .then(data => setPerusahaanData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  let refreshToken = Cookies.get('refresh_token')
  const [id, setId] = useState('');

  useEffect(() => {
    // setUser(data);
    if (!refreshToken) {
      localStorage.clear()
    } else if (refreshToken) {
      let _id = localStorage.getItem('id')
      setId(_id);
    }
  }, [id]);

  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);

  const cityData = ["City A", "City B", "City C"];
  const provinceData = ["Province A", "Province B", "Province C"];

  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [lokasiMagang, setLokasiMagang] = useState("");
  const [divisiMagang, setDivisiMagang] = useState("");
  const [durasiMagang, setDurasiMagang] = useState("");
  const [jenisMagang, setJenisMagang] = useState("");
  const [judulLaporan, setJudulLaporan] = useState("");
  const [ceritaMagang, setCeritaMagang] = useState("");
  const [uangSaku, setUangSaku] = useState("");

  const renderComponent = (component) => {
    const container = document.createElement('div');
    document.body.appendChild(container);  // Make sure container is added to the body
    const root = createRoot(container);
    root.render(component);
    return container;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      perusahaan_id: selectedCompanyId,
      // kota: selectedCity,
      // provinsi: selectedProvince,
      // alamat: lokasiMagang,
      posisi: divisiMagang,
      durasi_magang: durasiMagang,
      jenis_program: jenisMagang,
      uang_saku: uangSaku,
      judul_laporan: judulLaporan,
      deskripsi_magang: ceritaMagang,
      siswa_id: id,
    }

    console.log(data);

    try {
      const response = await fetch('https://goship-apii.vercel.app/form/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
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
                          html: renderComponent(<CardSuccessForm onClose={() => Swal.close()} />),
                          showConfirmButton: false
                      });
                  }, 1000); // Atur timeout 1 detik sebelum menampilkan komponen CardFailedLogin
              }
  })
      // onClose();
    } catch (error) {
      console.error('Error:', error);
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
                          html: renderComponent(<CardFailedForm onClose={() => Swal.close()} />),
                          showConfirmButton: false
                      });
                  }, 1000); // Atur timeout 1 detik sebelum menampilkan komponen CardFailedLogin
              }
  })
    }
  };

  const handleCompanyDropdownClick = (selectedCompany) => {
    setSelectedCompanyId(selectedCompany.id_perusahaan);
    setSelectedCompanyName(selectedCompany.nama_perusahaan);
    setShowCompanyDropdown(false);
    console.log(selectedCompanyId);
  };

  const handleCityDropdownClick = (name, type) => {
    setSelectedCity(name);
    setShowCityDropdown(false);
  };

  const handleProvinceDropdownClick = (name, type) => {
    setSelectedProvince(name);
    setShowProvinceDropdown(false);
  };

  const toggleCompanyDropdown = (event) => {
    setShowCompanyDropdown(!showCompanyDropdown);
  };

  const toggleCityDropdown = (event) => {
    setShowCityDropdown(!showCityDropdown);
  };

  const toggleProvinceDropdown = (event) => {
    setShowProvinceDropdown(!showProvinceDropdown);
  };
  
  const handleYesClick = (event) => {
    event.preventDefault();
    setUangSaku(prev => prev === '1' ? null : '1');
  };

  const handleNoClick = (event) => {
    event.preventDefault();
    setUangSaku(prev => prev === '0' ? null : '0');
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 overflow-auto py-3 ">
      <div className="bg-white py-6 px-10 rounded-lg shadow-md max-w-full max-h-full overflow-y-auto overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={logo1} alt="Goship Logo" className="h-10 w-auto mr-4" />
            <div className="border-l-2 border-black pl-4">
              <h2 className="text-lg font-semibold">Insert Data</h2>
            </div>
          </div>
          <button
            onClick={onClose}
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
        <form>
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3 relative">
                <div
                  className="input-group flex inline-block border border-1 rounded-md cursor-pointer "
                  onClick={toggleCompanyDropdown}
                >
                  <img src={profile} alt="profile" className="input-icon my-3.5 mx-4" />
                  <input
                    type="text"
                    name="Nama Tempat Magang"
                    id="Nama Tempat Magang"
                    placeholder="Nama Tempat Magang"
                    value={selectedCompanyName}
                    readOnly
                    className="block w-full py-1.5 ps-0 text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 mr-20"
                    style={{ fontWeight: "normal" }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 00-.707.293l-6 6a1 1 0 001.414 1.414L10 5.414l5.293 5.293a1 1 0 001.414-1.414l-6-6A1 1 0 0010 3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {showCompanyDropdown && (
                  <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul
                      tabIndex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-item-3"
                      className="max-h-40 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      {perusahaanData.map((perusahaan, index) => (
                        // console.log(perusahaan),
                        <li
                          key={index}
                          className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9"
                          onClick={() => handleCompanyDropdownClick(perusahaan)}
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {perusahaan.nama_perusahaan}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="sm:col-span-3">
                <div className="input-group flex inline-block border border-1 rounded-md">
                  <img src={card} alt="card" className="input-icon m-3" />
                  <input
                    type="text"
                    name="Divisi Magang"
                    id="Divisi Magang"
                    value={divisiMagang}
                    onChange={(e) => setDivisiMagang(e.target.value)}
                    placeholder="Divisi Magang"
                    className="block w-full py-1.5 ps-0 text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 mr-20"
                    style={{ fontWeight: "normal" }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="input-group flex inline-block border items-center border-1 rounded-md relative">
                  <img
                    src={calendar}
                    alt="calendar"
                    className="input-icon m-3"
                  />
                  <input
                    type="number"
                    name="Durasi magang"
                    id="Durasi magang"
                    value={durasiMagang}
                    onChange={(e) => setDurasiMagang(e.target.value)}
                    placeholder="Durasi magang"
                    className="block w-full py-1.5 ps-0 text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 mr-20"
                    style={{ fontWeight: "normal" }}
                  />
                  <span
                    class="absolute inset-y-0 right-0 flex items-center pr-2 text-xs"
                    style={{ color: "#F77D00" }}
                  >
                    bulan
                  </span>
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="input-group flex inline-block border items-center justify-center border-1 rounded-md">
                  <img src={location} alt="bag" className="input-icon m-3" />
                  <input
                    type="text"
                    name="Jenis Magang"
                    id="Jenis Magang"
                    value={jenisMagang}
                    onChange={(e) => setJenisMagang(e.target.value)}
                    placeholder="Jenis Magang"
                    className="block w-full py-1.5 ps-0 text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 mr-20"
                    style={{ fontWeight: "normal" }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="input-group flex inline-block border items-center border-1 rounded-md relative">
                  <img src={star} alt="star" className="input-icon m-3" />
                  <input
                    type="checkbox"
                    id="mendapat Uang Saku??"
                    className="hidden"
                  />
                  <label
                    htmlFor="mendapat Uang Saku??"
                    className="block w-full py-1.5 ps-0 text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 mr-20"
                    style={{ fontWeight: "normal" }}
                  >
                    mendapat Uang Saku??
                  </label>
                  <input
                    type="text"
                    name="mendapat Uang Saku??"
                    id="mendapat Uang Saku??"
                    placeholder="mendapat Uang Saku??"
                    value={uangSaku === 'iya' ? '1' : uangSaku === 'tidak' ? '0' : ''}
                    readOnly
                    className="block w-full py-1.5 ps-0 text-gray-900 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 px-30 hidden mr-20"
                  />
                  <div className="flex right-0 flex items-center px-22">
                    <button
                      type="button"
                      className={`border py-1 px-2 rounded-md text-xs mr-2 ${uangSaku === '1' ? 'bg-orange text-white border-orange' : 'text-orange bg-white border-orange-500'}`}
                      onClick={handleYesClick}
                    >
                      Iya
                    </button>
                    <button
                      type="button"
                      className={`border py-1 px-2 rounded-md text-xs ${uangSaku === '0' ? 'bg-orange text-white border-orange' : 'text-orange bg-white border-orange-500'}`}
                      onClick={handleNoClick}
                    >
                      Tidak
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <div className="input-group flex inline-block border border-1 rounded-md">
                  <img
                    src={dokumen}
                    alt="document"
                    className="input-icon m-3"
                  />
                  <input
                    type="text"
                    name="Judul laporan magang "
                    id="Judul laporan magang"
                    value={judulLaporan}
                    onChange={(e) => setJudulLaporan(e.target.value)}
                    placeholder="Judul laporan magang"
                    className="block w-full py-1.5 ps-0 text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 mr-20"
                    style={{ fontWeight: "normal" }}
                  />
                </div>
              </div>

              <div className="col-span-full ">
                <div className="input-group text-xs ">
                  <input
                    type="text"
                    name="Ceritakan kepada kami tentang pengalaman magang Anda di sini"
                    id="Ceritakan kepada kami tentang pengalaman magang Anda di sini"
                    value={ceritaMagang}
                    onChange={(e) => setCeritaMagang(e.target.value)}
                    placeholder="Ceritakan kepada kami tentang pengalaman magang Anda di sini"
                    className="block w-full py-1.5 ps-0 text-gray-700 placeholder:text-gray-400 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 mr-20"
                    style={{ height: "100px", fontWeight: "normal" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded"
              style={{ backgroundColor: "#F77D00" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardForm;
