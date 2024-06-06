import React from "react";
import male from '../assets/male.png';
import female from '../assets/female.png';

const StudentCard = ({ post }) => {
      let image = post.jenis_kelamin === 'Laki-laki' ? male : female;
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

      // Fungsi untuk membatasi teks dengan substring
      const limitText = (text, maxLength) => {
            if (text.length > maxLength) {
                  return text.substring(0, maxLength) + "..."; // Menambahkan tanda elipsis
            } else {
                  return text;
            }
      };

      // Fungsi untuk membatasi teks divisi
      const limitDivisi = (text, maxLength) => {
            if (text.length > maxLength) {
                  const truncatedText = text.substring(0, maxLength);
                  const lastSpace = truncatedText.lastIndexOf(' ');
                  return truncatedText.substring(0, lastSpace) + "...";
            } else {
                  return text;
            }
      };

      return (
            <div className="student-card" style={{ boxShadow: '0 3px 8px rgba(247, 125, 0, 0.24)', borderRadius: '8px', margin: '16px', padding: '20px', background: '#fff', minHeight: '400px' }}>
                  <div className="max-w-max" style={{ display: 'flex' }}>
                        <div className="photo-card" style={{ flex: '0 0 100px', width: '100px', height: '100px' }}>
                              <img src={image} alt="angga" />
                        </div>
                        <div className="nama-siswa-card">
                              <h2 className="nama-siswa-lengkap" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '16px' }}>{post.nama}</h2>
                              <h3 className="perusahaan-divisi-card" style={{ color: '#605B57', fontSize: '20px', marginTop: '10px', maxWidth: '200px' }}>
                                    {limitDivisi(post.perusahaan + " - " + post.posisi, 40)} {/* Memanggil fungsi limitDivisi */}
                              </h3>
                        </div>
                  </div>
                  <div className="card-text" style={{ lineHeight: '28px', overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word' }}>
                        {limitText(post.deskripsi_magang, 320)}
                  </div>
            </div>
      );
};

export default StudentCard;
