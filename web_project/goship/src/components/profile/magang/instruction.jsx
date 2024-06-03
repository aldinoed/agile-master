import React from 'react';
import { bgprofile } from "../../../assets";

const Instruction = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="max-w-s bg-white border border-gray-200 rounded overflow-visible shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <div className="relative max-w-full mx-auto">
            <img className="rounded-t-lg w-full md:h-24 xs:h-20 object-cover" src={bgprofile} alt="" />
            <div className="absolute inset-0 bg-gray-500 opacity-60 rounded-md"></div>
            <div className="absolute inset-0 flex py-4 px-10">
              <div className="border-l-2 border-orange pl-4">
                <h2 className="text-lg font-semibold text-white">Petunjuk untuk melakukan magang (KP)</h2>
              </div>
            </div>
          </div>
          <div className="px-5 pt-5">
            <p className="mb-3 font-bold text-l text-black">
              1. Memilih jenis KP :
            </p>
            <ul style={{ textIndent: '1em' }}>
              <li className="mb-1">a. Regular</li>
              <li className="mb-1">b. IISMA via UP2AI Ms Lely dan KUI Mr Iwan Syarif</li>
              <li className="mb-1">c. IGIP via UP2AI Ms Lely dan KUI Mr Iwan Syarif</li>
            </ul>

            <p className="mb-3 font-bold text-l text-black">
              2. Jika Anda memilih KP Reguler, tentukan apakah Anda merupakan kelompok atau individu saat melaksanakan KP.
            </p>
            <ul className="list-disc ml-6" style={{ paddingLeft: '1em' }}>
              <li className="mb-1">Jika Anda berada dalam kelompok yang terdiri dari maksimal 3 orang, isi Formulir Pengajuan KP di MIS Online (Jika dalam kelompok, maka hanya perwakilan yang akan mengisinya)</li>
            </ul>

            <p className="mb-3 font-normal text-black text-overflow-ellipsis">
              <strong>3. Membuat Proposal KP,</strong> Membuat Surat Pengantar (nomor surat, dan peruntukan KDAEP yang akan diurus melalui Bu Pipid), membuat surat ucapan terima kasih setelah diterima (nomor surat dan peruntukan KDAEP untuk dikelola melalui Bu Pipid), Perpisahan dengan Supervisor sebelum berangkat ke KP
            </p>

            <p className="mb-3 font-bold text-l text-black">4. Melaksanakan KP 6 Bulan</p>

            <p className="mb-3 font-normal text-black text-overflow-ellipsis">
              <strong>5. Membuat Buku Catatan KP, </strong> File yang diisi adalah progres buku KP, foto yang diupload bisa berupa kegiatan sehari-hari di perusahaan (foto bebas)
            </p>

            <p className="mb-3 font-bold text-l text-black">
              6. Mempersiapkan untuk Sesi KP
            </p>
            <ul className='mb-4' style={{ textIndent: '1em' }}>
              <li className="mb-1">a. Persetujuan Supervisor </li>
              <li className="mb-1">b. Buku KP </li>
              <li className="mb-1">c. Presentasi KP (Indonesia) </li>
              <li className="mb-1">d. Maju dalam Bentuk Kelompok </li>
              <li className="mb-1">e. Mengumpulkan Nilai dari Perusahaan </li>
              <li className="mb-1">f. Mengumpulkan Rekening Bank Mandiri (dana KP) </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Instruction;
