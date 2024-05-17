const express = require("express");
const app = express();
const executeQuery = require("./connection");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./auth");
const formRouter = require("./routes/form");
// const morgan = require("morgan");
const port = 5000;

// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
      cors({
            origin: ["https://goship-five.vercel.app", "http://localhost:3000"], // Atur domain React Anda
            credentials: true, // Izinkan kredensial seperti cookies

      })
);
// React Route Here

app.use('/auth', authRouter);
app.use('/form', formRouter);
app.get('/', (req, res) => {
      console.log("sukses");
      res.send('Hello from Express backend!');
})
app.get('/home', (req, res) => {
      console.log("sukses");
      res.send('Hello from Express backend!');
})

app.get('/tes', async (req, res) => {
      try {
            const sql = "SELECT p.id_perusahaan, p.nama_perusahaan, p.logo_perusahaan, COUNT(m.siswa_id) AS jumlah_siswa, po.id_posisi, po.nama_posisi, GROUP_CONCAT(DISTINCT s.prodi) AS prodi, s.semester FROM perusahaan p LEFT JOIN magang m ON p.id_perusahaan = m.posisi_id LEFT JOIN posisi po ON p.id_perusahaan = po.perusahaan_id LEFT JOIN siswa s ON m.siswa_id = s.id_siswa GROUP BY p.id_perusahaan, po.id_posisi;";
            const data = await executeQuery(sql);
            res.json(data);
      } catch (err) {
            console.error(err);
            res.status(500).send(err);
      }
})

app.get('/api/data', async (req, res) => {
      try {
            const sql = "SELECT p.id_perusahaan, p.nama_perusahaan, p.logo_perusahaan, COUNT(m.siswa_id) AS jumlah_siswa, po.id_posisi, po.nama_posisi, GROUP_CONCAT(DISTINCT s.prodi) AS prodi, s.semester FROM perusahaan p LEFT JOIN posisi po ON p.id_perusahaan = po.perusahaan_id INNER JOIN magang m ON po.id_posisi = m.posisi_id LEFT JOIN siswa s ON m.siswa_id = s.id_siswa GROUP BY p.id_perusahaan, po.id_posisi;"
            const hasilQuery = await executeQuery(sql);

            const companiesData = {};

            hasilQuery.forEach(item => {
                  const { id_perusahaan, nama_perusahaan, logo_perusahaan, jumlah_siswa, id_posisi, nama_posisi, prodi, semester } = item;

                  if (!companiesData[id_perusahaan]) {
                        companiesData[id_perusahaan] = {
                              id_perusahaan,
                              nama_perusahaan,
                              logo_perusahaan,
                              jumlah_siswa,
                              posisi: [],
                              prodi: [],
                              semester: [],
                        };
                  }

                  if (id_posisi != null && nama_posisi != null) {
                        companiesData[id_perusahaan].posisi.push({ id_posisi, nama_posisi });
                  }
                  if (prodi != null) {
                        companiesData[id_perusahaan].prodi = [...new Set([...companiesData[id_perusahaan].prodi, ...prodi.split(',')])];
                  }
                  if (semester != null) {
                        companiesData[id_perusahaan].semester = Array.from(new Set([...companiesData[id_perusahaan].semester, semester]));
                  }
            });

            // console.log(hasilQuery);
            const data = Object.values(companiesData).filter(company => company.posisi.length > 0);

            // Output jumlah siswa tiap perusahaan
            res.json(data);

      } catch (err) {
            console.error(err);
            res.status(500).send(err);
      }
});

// API Here
app.get("/api/major-data", async (req, res) => {
      try {
            const sql =
                  "SELECT * FROM magang JOIN posisi ON magang.posisi_id = posisi.id_posisi JOIN perusahaan ON posisi.perusahaan_id = perusahaan.id_perusahaan JOIN siswa ON magang.siswa_id = siswa.id_siswa;";
            const hasilQuery = await executeQuery(sql);

            const posts = {};
            for (let j = 0; j < hasilQuery.length; j++) {
                  const element = hasilQuery[j];
                  if (element.deskripsi_magang) {
                        posts[j] = {
                              id_siswa: element.siswa_id,
                              nama: element.nama_siswa,
                              posisi: element.nama_posisi,
                              logo: element.logo_perusahaan,
                              perusahaan: element.nama_perusahaan,
                              deskripsi_magang: element.deskripsi_magang,
                              jenis_kelamin: element.jenis_kelamin,
                              created_at: element.created_at
                        }
                  }
            }

            const data = {
                  posts,
            };

            // Output jumlah siswa tiap perusahaan
            res.json(data);
      } catch (err) {
            console.error(err);
            res.status(500).send(err);
      }
});

app.get("/api/perusahaan", async (req, res) => {
      try {
            const sql =
                  "SELECT pr.nama_perusahaan, pr.id_perusahaan, pr.logo_perusahaan, p.id_posisi, p.nama_posisi, COUNT(m.id_magang) AS jumlah_siswa FROM posisi p JOIN magang m ON p.id_posisi = m.posisi_id JOIN perusahaan pr ON p.perusahaan_id = pr.id_perusahaan GROUP BY p.id_posisi;";
            const hasilQuery = await executeQuery(sql);
            console.log(hasilQuery);
            const formatData = (datas) => {
                  const hasil = {};

                  datas.forEach((item) => {
                        if (!hasil[item.id_perusahaan]) {
                              hasil[item.id_perusahaan] = {
                                    id_perusahaan: item.id_perusahaan,
                                    nama_perusahaan: item.nama_perusahaan,
                                    logo_perusahaan: item.logo_perusahaan,
                                    jumlah_siswa: item.jumlah_siswa,
                                    posisi: {}
                              };
                        } else {
                              hasil[item.id_perusahaan].jumlah_siswa++;
                        }
                        hasil[item.id_perusahaan].posisi[item.id_posisi] = {
                              id_posisi: item.id_posisi,
                              nama_posisi: item.nama_posisi,
                        };
                  });

                  // Mengubah hasil menjadi array sesuai format yang diminta
                  return Object.values(hasil).map(item => ({
                        id_perusahaan: item.id_perusahaan,
                        nama_perusahaan: item.nama_perusahaan,
                        logo_perusahaan: item.logo_perusahaan,
                        jumlah_siswa: item.jumlah_siswa,
                        posisi: Object.values(item.posisi)
                  }));
            };

            const data = formatData(hasilQuery);
            res.json(data);
      } catch (err) {
            console.error(err);
            res.status(500).send(err);
      }
});

app.get('/api/perusahaan/:id', async (req, res) => {
      try {
            const id_perusahaan = req.params.id;
            const sql = `SELECT pr.*, p.id_posisi, p.nama_posisi, s.id_siswa, s.nama_siswa, s.email, COUNT(m.id_magang) AS jumlah_siswa 
                     FROM posisi p 
                     JOIN magang m ON p.id_posisi = m.posisi_id 
                     JOIN perusahaan pr ON p.perusahaan_id = pr.id_perusahaan 
                     JOIN siswa s ON m.siswa_id = s.id_siswa 
                     WHERE pr.id_perusahaan = ${id_perusahaan} 
                     GROUP BY p.id_posisi, s.id_siswa;`;
            const hasilQuery = await executeQuery(sql);

            // Mengubah format data
            const formatData = (datas) => {
                  const hasil = {};

                  datas.forEach((item) => {
                        if (!hasil[item.id_perusahaan]) {
                              hasil[item.id_perusahaan] = {
                                    nama_perusahaan: item.nama_perusahaan,
                                    alamat: item.alamat,
                                    kota: item.kota,
                                    provinsi: item.provinsi,
                                    logo_perusahaan: item.logo_perusahaan,
                                    jumlah_siswa_total: 0,
                                    posisi: {},
                              };
                        }

                        if (!hasil[item.id_perusahaan].posisi[item.id_posisi]) {
                              hasil[item.id_perusahaan].posisi[item.id_posisi] = {
                                    id_posisi: item.id_posisi,
                                    nama_posisi: item.nama_posisi,
                                    jumlah_siswa: 0,
                                    siswa: []
                              };
                        }

                        hasil[item.id_perusahaan].posisi[item.id_posisi].siswa.push({
                              id_siswa: item.id_siswa,
                              nama_siswa: item.nama_siswa,
                              email: item.email
                        });

                        hasil[item.id_perusahaan].posisi[item.id_posisi].jumlah_siswa += 1;
                        hasil[item.id_perusahaan].jumlah_siswa_total += 1;
                  });

                  // Mengubah hasil menjadi array
                  return Object.values(hasil).map(item => ({
                        nama_perusahaan: item.nama_perusahaan,
                        alamat: item.alamat,
                        kota: item.kota,
                        provinsi: item.provinsi,
                        logo_perusahaan: item.logo_perusahaan,
                        jumlah_siswa_total: item.jumlah_siswa_total,
                        posisi: Object.values(item.posisi)
                  }));
            };

            const data = formatData(hasilQuery);
            res.json(data);
      } catch (err) {
            console.error(err);
            res.status(500).send(err);
      }
});

app.get("/api/posisi/:id", async (req, res) => {
      try {
            const id_posisi = req.params.id;
            const sql = `SELECT siswa.id_siswa, siswa.nama_siswa, siswa.email, siswa.jenis_kelamin FROM siswa JOIN magang ON siswa.id_siswa = magang.siswa_id JOIN posisi ON magang.posisi_id = posisi.id_posisi WHERE posisi.id_posisi = ${id_posisi};`;
            const data = await executeQuery(sql);

            res.json(data);
      } catch (err) {
            console.error(err);
            res.status(500).send(err);
      }
});

app.get("/api/user/:id", async (req, res) => {
      try {
            const id_siswa = req.params.id;
            const sql = `SELECT * FROM magang JOIN posisi ON magang.posisi_id = posisi.id_posisi JOIN perusahaan ON posisi.perusahaan_id = perusahaan.id_perusahaan JOIN siswa ON magang.siswa_id = siswa.id_siswa WHERE siswa.id_siswa = ${id_siswa};`;
            const data = await executeQuery(sql);

            res.json(data);
      } catch (err) {
            console.error(err);
            res.status(500).send(err);
      }
});

// API for user CRUD
app.get("/api/users", async (req, res) => {
      let usersData;
      const sql = `SELECT * FROM siswa;`;
      try {
            usersData = await executeQuery(sql);
            if (usersData.length <= 0) {
                  throw new Error("Data Not Found");
            } else {
                  res.json(usersData);
            }
      } catch (error) {
            res.status(500).send(error.message);
      }
});

app.post("/api/users/insert-user", async (req, res) => {
      let body = "";
      req.on("data", function (data) {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) throw error;
      });

      try {
            const bodyReq = {
                  nama: req.body.nama_siswa,
                  gender: req.body.jenis_kelamin,
                  email: req.body.email,
                  institusi: req.body.institusi,
                  jenjang: req.body.jenjang,
                  prodi: req.body.prodi,
                  semester: req.body.semester,
                  telp: req.body.no_telp,
                  nrp: req.body.nrp,
            };
            const sql = `INSERT INTO siswa (nama_siswa, jenis_kelamin, email, institusi, jenjang, prodi, semester, no_telp, nrp) VALUES (?,?,?,?,?,?,?,?,?);`;
            const response = await executeQuery(sql, [
                  bodyReq.nama,
                  bodyReq.gender,
                  bodyReq.email,
                  bodyReq.institusi,
                  bodyReq.jenjang,
                  bodyReq.prodi,
                  bodyReq.semester,
                  bodyReq.telp,
                  bodyReq.nrp,
            ]);

            res.status(200).json({
                  status: true,
                  message: "Insert Data Successfully",
            });
      } catch (error) {
            res.status(500).send(error.message);
      }
});

app.post("/api/users/delete/:id", async (req, res) => {
      const { id } = req.params;

      const sql = `DELETE FROM siswa WHERE id_siswa=${id};`;
      try {
            const response = await executeQuery(sql);
            if (response.affectedRows > 0) {
                  res.status(200).json({ status: true, message: "Delete data successful" });
            } else {
                  throw error;
            }
      } catch (error) {
            res.status(500).send(error.message);
      }
});

app.put("/api/users/:id/update", async (req, res) => {
      const { id } = req.params;
      const bodyReq = {
            nama: req.body.nama_siswa,
            gender: req.body.jenis_kelamin,
            email: req.body.email,
            institusi: req.body.institusi,
            jenjang: req.body.jenjang,
            prodi: req.body.prodi,
            semester: req.body.semester,
            telp: req.body.no_telp,
            nrp: req.body.nrp,
      };
      const sql = `UPDATE siswa SET nama_siswa=?, jenis_kelamin=?, email=?, institusi=?, jenjang=?, prodi=?, semester=?, no_telp=?, nrp=? WHERE id_siswa=?`;
      const values = [
            bodyReq.nama,
            bodyReq.gender,
            bodyReq.email,
            bodyReq.institusi,
            bodyReq.jenjang,
            bodyReq.prodi,
            bodyReq.semester,
            bodyReq.telp,
            bodyReq.nrp,
            id,
      ];
      try {
            const response = await executeQuery(sql, values);
            if (response.affectedRows > 0) {
                  res.status(200).json({ status: true, message: "Berhasil update data user " + bodyReq.nama });
            } else {
                  res.status(403).json({ status: false, message: "Gagal update data user " + bodyReq.nama });
            }
      } catch (error) {
            res.status(500).send(error.message);
      }
});
app.post("/api/user-profile/update", async (req, res) => {
      const bodyReq = {
            nama: req.body.nama,
            email: req.body.email,
            phone: req.body.phone,
            idSiswa: req.body.id
      };
      const sql = `UPDATE siswa SET nama_siswa='${bodyReq.nama}', email='${bodyReq.email}', phone='${bodyReq.phone}' WHERE id_siswa='${bodyReq.idSiswa}'`;
      try {
            console.log('halo')
            const response = await executeQuery(sql);
            console.log("🚀 ~ app.post ~ response:", response)

            if (response.affectedRows > 0) {
                  res.status(200).json({ status: true, message: "Berhasil update data user " + bodyReq.nama });
            } else {
                  res.status(403).json({ status: false, message: "Gagal update data user " + bodyReq.nama });
            }
      } catch (error) {
            res.status(500).send(error.message);
      }
});

// app.post('/login', (req,res)=>{
//     const nrp = req.params.nrp;
//     const password = req.params.password;
//     try{

//     }catch(error){

//     }
// })

app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});

module.exports = app
//server.timeout = 60000;
