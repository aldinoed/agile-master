import React from "react";
import StudentCard from "./StudentCard";


const StudentList = () => {
  const students = [
    {
      user_fullname: "Anastasya Khosashi",
      perusahaan: "Gojek",
      divisi: "Front End Development",
      cerita_magang:
        "Selama magang, saya terlibat dalam proyek-proyek menarik yang menggabungkan kecerdasan buatan dengan kebutuhan pelanggan. Satu pengalaman yang tak terlupakan adalah ketika saya terlibat dalam pengembangan fitur baru untuk memudahkan pengguna dalam memesan layanan...",
    },
    {
      user_fullname: "Alice Johnson",
      perusahaan: "Bukalapak",
      divisi: "Mobile App Development",
      cerita_magang:
        "xSaya sangat senang bisa magang di Bukalapak. Di sana, saya bergabung dengan tim pengembangan aplikasi mobile dan berkontribusi dalam pengembangan fitur-fitur baru untuk aplikasi. Saya juga mendapatkan kesempatan untuk belajar banyak tentang praktik pengembangan perangkat lunak modern.",
    },
    {
      user_fullname: "saipudin",
      perusahaan: "Bukalapak",
      divisi: "Mobile App Development",
      cerita_magang:
        "zSaya sangat senang bisa magang di Bukalapak. Di sana, saya bergabung dengan tim pengembangan aplikasi mobile dan berkontribusi dalam pengembangan fitur-fitur baru untuk aplikasi. Saya juga mendapatkan kesempatan untuk belajar banyak tentang praktik pengembangan perangkat lunak modern.",
    },
    {
      user_fullname: "Asep kopling",
      perusahaan: "Bukalapak",
      divisi: "Mobile App Development",
      cerita_magang:
        "aSaya sangat senang bisa magang di Bukalapak. Di sana, saya bergabung dengan tim pengembangan aplikasi mobile dan berkontribusi dalam pengembangan fitur-fitur baru untuk aplikasi. Saya juga mendapatkan kesempatan untuk belajar banyak tentang praktik pengembangan perangkat lunak modern.",
    },
    {
      user_fullname: "Asep kopling",
      perusahaan: "Bukalapak",
      divisi: "Mobile App Development",
      cerita_magang:
        "aSaya sangat senang bisa magang di Bukalapak. Di sana, saya bergabung dengan tim pengembangan aplikasi mobile dan berkontribusi dalam pengembangan fitur-fitur baru untuk aplikasi. Saya juga mendapatkan kesempatan untuk belajar banyak tentang praktik pengembangan perangkat lunak modern.",
    },
    {
      user_fullname: "Asep kopling",
      perusahaan: "Bukalapak",
      divisi: "Mobile App Development",
      cerita_magang:
        "aSaya sangat senang bisa magang di Bukalapak. Di sana, saya bergabung dengan tim pengembangan aplikasi mobile dan berkontribusi dalam pengembangan fitur-fitur baru untuk aplikasi. Saya juga mendapatkan kesempatan untuk belajar banyak tentang praktik pengembangan perangkat lunak modern.",
    },
    {
      user_fullname: "Asep kopling",
      perusahaan: "Bukalapak",
      divisi: "Mobile App Development",
      cerita_magang:
        "aSaya sangat senang bisa magang di Bukalapak. Di sana, saya bergabung dengan tim pengembangan aplikasi mobile dan berkontribusi dalam pengembangan fitur-fitur baru untuk aplikasi. Saya juga mendapatkan kesempatan untuk belajar banyak tentang praktik pengembangan perangkat lunak modern.",
    },
    {
      user_fullname: "Asep kopling",
      perusahaan: "Bukalapak",
      divisi: "Mobile App Development",
      cerita_magang:
        "aSaya sangat senang bisa magang di Bukalapak. Di sana, saya bergabung dengan tim pengembangan aplikasi mobile dan berkontribusi dalam pengembangan fitur-fitur baru untuk aplikasi. Saya juga mendapatkan kesempatan untuk belajar banyak tentang praktik pengembangan perangkat lunak modern.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row" , overflow: "hidden"}}>
      {Array.isArray(students) &&
        students.map((studentData, index) => (
          <StudentCard student={studentData} key={index} />
        ))}
    </div>
  )
}

export default StudentList