import {
  profile,
  bag,
  location,
  card,
  calendar,
  star,
  dokumen,
} from "../../../assets";
import React, { useState } from "react";

const CardForm = () => {
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const companyNames = ["Company A", "Company B", "Company C"];
  const districtData = ["District A", "District B", "District C"];
  const cityData = ["City A", "City B", "City C"];
  const provinceData = ["Province A", "Province B", "Province C"];

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan sesuatu saat tombol submit ditekan
  };

  const handleDropdownClick = (name) => {
    setSelectedCompanyName(name);
    setShowCompanyDropdown(false);
  };

  const handleDistrictDropdownClick = (name, type) => {
    setSelectedDistrict(name);
    setShowDistrictDropdown(false);
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

  const toggleDistrictDropdown = (event) => {
    setShowDistrictDropdown(!showDistrictDropdown);
  };

  const toggleCityDropdown = (event) => {
    setShowCityDropdown(!showCityDropdown);
  };

  const toggleProvinceDropdown = (event) => {
    setShowProvinceDropdown(!showProvinceDropdown);
  };

  return (
    <div className="top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white px-10 rounded-lg shadow-md max-w-full max-h-full overflow-y-auto overflow-y-scroll no-scrollbar shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="flex flex-row justify-between items-center w-full pt-6">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[40px] text-black">
                    <span className="text-black">Internship</span>{" "}
                    <span className="text-orange">ke 1</span>{" "}
                </h1>
        </div>
        <hr class="h-px w-2/5 bg-gray-400 border-0 "></hr>
        <form onSubmit={handleSubmit}>
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
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
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
                      {companyNames.map((name, index) => (
                        <li
                          key={index}
                          className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9"
                          onClick={() => handleDropdownClick(name, "company")}
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="sm:col-span-3">
                <div className="input-group flex inline-block border items-center justify-center border-1 rounded-md">
                  <img src={bag} alt="bag" className="input-icon m-3" />
                  <input
                    type="text"
                    name="Bidang Magang"
                    id="Bidang Magang"
                    placeholder="Bidang Magang"
                    className="block w-full py-1.5 text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
                    style={{ fontWeight: "normal" }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3 relative">
                <div
                  className="input-group flex inline-block border border-1 rounded-md cursor-pointer dropdown"
                  onClick={toggleDistrictDropdown}
                >
                  <img
                    src={location}
                    alt="location"
                    className="input-icon-sm m-3"
                  />
                  <input
                    type="text"
                    name="Kecamatan"
                    id="Kecamatan"
                    placeholder="Kecamatan"
                    value={selectedDistrict}
                    readOnly
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
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
                {showDistrictDropdown && (
                  <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul
                      tabIndex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-item-3"
                      className="max-h-40 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      {districtData.map((district, index) => (
                        <li
                          key={index}
                          className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9"
                          onClick={() =>
                            handleDistrictDropdownClick(district, "district")
                          }
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {district}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="sm:col-span-3 relative">
                <div
                  className="input-group flex inline-block border border-1 rounded-md cursor-pointer dropdown"
                  onClick={toggleCityDropdown}
                >
                  <img
                    src={location}
                    alt="location"
                    className="input-icon-sm m-3"
                  />
                  <input
                    type="text"
                    name="Kota/Kabupaten"
                    id="Kota/Kabupaten"
                    placeholder="Kota/Kabupaten"
                    value={selectedCity}
                    readOnly
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
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
                {showCityDropdown && (
                  <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul
                      tabIndex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-item-3"
                      className="max-h-40 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      {cityData.map((city, index) => (
                        <li
                          key={index}
                          className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9"
                          onClick={() =>
                            handleCityDropdownClick(city, "city")
                          }
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {city}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="sm:col-span-3 relative">
                <div
                  className="input-group flex inline-block border border-1 rounded-md cursor-pointer dropdown"
                  onClick={toggleProvinceDropdown}
                >
                  <img
                    src={location}
                    alt="location"
                    className="input-icon-sm m-3"
                  />
                  <input
                    type="text"
                    name="Provinsi"
                    id="Provinsi"
                    placeholder="Provinsi"
                    value={selectedProvince}
                    readOnly
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
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
                {showProvinceDropdown && (
                  <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul
                      tabIndex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-item-3"
                      className="max-h-40 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      {provinceData.map((province, index) => (
                        <li
                          key={index}
                          className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9"
                          onClick={() =>
                            handleProvinceDropdownClick(province, "province")
                          }
                        >
                          <div className="flex items-center">
                            <span className="font-normal block truncate">
                              {province}
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
                  <img
                    src={location}
                    alt="location"
                    className="input-icon m-3"
                  />
                  <input
                    type="text"
                    name="Lokasi Magang"
                    id="Lokasi Magang"
                    placeholder="Lokasi Magang"
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
                    style={{ fontWeight: "normal" }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="input-group flex inline-block border border-1 rounded-md">
                  <img src={card} alt="card" className="input-icon m-3" />
                  <input
                    type="text"
                    name="Divisi Magang"
                    id="Divisi Magang"
                    placeholder="Divisi Magang"
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
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
                    placeholder="Durasi magang"
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
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
                    placeholder="Jenis Magang"
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
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
                    className="block w-full py-1.5  text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 "
                    style={{ fontWeight: "normal" }}
                  >
                    mendapat Uang Saku??
                  </label>
                  <input
                    type="text text-xss"
                    name="mendapat Uang Saku??"
                    id="mendapat Uang Saku??"
                    placeholder="mendapat Uang Saku??"
                    className="block w-full py-1.5  text-gray-900 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 px-30 hidden "
                  />
                  <div className="flex right-0 flex items-center px-22">
                    <button
                      className="border py-1 px-2 rounded-md text-xs mr-2"
                      style={{ color: "#F77D00", borderColor: "#F77D00" }}
                    >
                      Iya
                    </button>
                    <button
                      className="border py-1 px-2 rounded-md text-xs"
                      style={{ color: "#F77D00", borderColor: "#F77D00" }}
                    >
                      Tidak
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <div className="input-group flex inline-block border items-center justify-center border-1 rounded-md">
                  <img
                    src={dokumen}
                    alt="document"
                    className="input-icon m-3"
                  />
                  <textarea
                    type="text"
                    name="Judul laporan magang "
                    id="Judul laporan magang"
                    placeholder="Judul laporan magang"
                    className="block w-full y-2 text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-600 sm:text-sm border-0 resize-none"
                    style={{ fontWeight: "normal" }}
                  />
                </div>
              </div>

              <div className="col-span-full ">
                <div className="input-group resize flex inline-block border border-1 rounded-md">
                  <textarea
                    type="text"
                    name="Ceritakan kepada kami tentang pengalaman magang Anda di sini"
                    id="Ceritakan kepada kami tentang pengalaman magang Anda di sini"
                    placeholder="Ceritakan kepada kami tentang pengalaman magang Anda di sini"
                    className="w-1100px h-1100px py-1.5 text-gray-700 placeholder:text-gray-500 placeholder:text-xs focus:ring-inset focus:ring-indigo-800 sm:text-sm border-0"
                    style={{ width: "1100px",height: "200px", fontWeight: "normal"}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex py-10">
            <button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded"
              style={{ backgroundColor: "#F77D00" }}
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
