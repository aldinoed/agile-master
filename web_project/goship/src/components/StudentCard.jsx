import React from "react";
import { logo1 } from "../assets";
const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <div className="max-w-max">
        <div className="photo-card">
          <img src={logo1} alt="angga" />
        </div>
        <div className="nama-siswa-card">
          <h2 className="nama-siswa-lengkap">{student.user_fullname}</h2>
          <h3 className="perusahaan-divisi-card">
            {student.perusahaan} - {student.divisi}
          </h3>
        </div>
      </div>
      <div className="card-text  ">{student.cerita_magang}</div>
    </div>
  )
}

export default StudentCard