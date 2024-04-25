const express = require('express');
const app = express();
const executeQuery = require('./connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // Atur domain React Anda
    credentials: true // Izinkan kredensial seperti cookies
}));
// React Route Here
app.get('/', (req, res) => {
    console.log("sukses");
    res.send('Hello from Express backend!');
})
app.get('/home', (req, res) => {
    console.log("sukses");
    res.send('Hello from Express backend!');
})

app.get('/tes', async (req, res) => {
    try{
        const sql = "SELECT * FROM siswa;";
        const data = await executeQuery(sql);
        res.json(data);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
})

app.get('/api/data', async (req, res) => {
    try {
        const sql = "SELECT p.id_perusahaan, p.nama_perusahaan, p.logo_perusahaan, COUNT(m.siswa_id) AS jumlah_siswa, po.id_posisi, po.nama_posisi, GROUP_CONCAT(DISTINCT s.prodi) AS prodi FROM perusahaan p LEFT JOIN magang m ON p.id_perusahaan = m.posisi_id LEFT JOIN posisi po ON p.id_perusahaan = po.perusahaan_id LEFT JOIN siswa s ON m.siswa_id = s.id_siswa GROUP BY p.id_perusahaan, po.id_posisi;"
        const hasilQuery = await executeQuery(sql);

        const companiesData = {};

        hasilQuery.forEach(item => {
            const { id_perusahaan, nama_perusahaan, logo_perusahaan, jumlah_siswa, id_posisi, nama_posisi, prodi } = item;

            if (!companiesData[id_perusahaan]) {
                companiesData[id_perusahaan] = {
                    id_perusahaan,
                    nama_perusahaan,
                    logo_perusahaan,
                    jumlah_siswa,
                    posisi: [],
                    prodi: []
                };
            }

            companiesData[id_perusahaan].posisi.push({ id_posisi, nama_posisi });
            companiesData[id_perusahaan].prodi = [...new Set([...companiesData[id_perusahaan].prodi, ...prodi.split(',')])];
        });

        console.log(hasilQuery);
        data = Object.values(companiesData);

        // Output jumlah siswa tiap perusahaan
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// API Here
app.get('/api/major-data', async (req, res) => {
    try {
        const sql = "SELECT * FROM magang JOIN posisi ON magang.posisi_id = posisi.id_posisi JOIN perusahaan ON posisi.perusahaan_id = perusahaan.id_perusahaan JOIN siswa ON magang.siswa_id = siswa.id_siswa;"
        const hasilQuery = await executeQuery(sql);

        const posts = {};
        for (let j = 0; j < hasilQuery.length; j++) {
            const element = hasilQuery[j];
            if (element.deskripsi_magang) {
                posts[j] = {
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
            posts
        }

        // Output jumlah siswa tiap perusahaan
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/perusahaan', async (req, res) => {
    try {
        const sql = "SELECT pr.nama_perusahaan, pr.id_perusahaan, pr.logo_perusahaan, p.id_posisi, p.nama_posisi, COUNT(m.id_magang) AS jumlah_siswa FROM posisi p JOIN magang m ON p.id_posisi = m.posisi_id JOIN perusahaan pr ON p.perusahaan_id = pr.id_perusahaan GROUP BY p.id_posisi;"
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
        const sql = `SELECT pr.*, p.id_posisi, p.nama_posisi, COUNT(m.id_magang) AS jumlah_siswa FROM posisi p JOIN magang m ON p.id_posisi = m.posisi_id JOIN perusahaan pr ON p.perusahaan_id = pr.id_perusahaan WHERE pr.id_perusahaan = ${id_perusahaan} GROUP BY p.id_posisi;`
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
                        posisi: {}
                    };
                }

                hasil[item.id_perusahaan].posisi[item.id_posisi] = {
                    id_posisi: item.id_posisi,
                    nama_posisi: item.nama_posisi,
                    jumlah_siswa: item.jumlah_siswa
                };
                hasil[item.id_perusahaan].jumlah_siswa_total += item.jumlah_siswa;
            });

            // Mengubah hasil menjadi array sesuai format yang diminta
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

app.get('/api/posisi/:id', async (req, res) => {
    try {
        const id_posisi = req.params.id;
        const sql = `SELECT siswa.id_siswa, siswa.nama_siswa, siswa.email, siswa.jenis_kelamin FROM siswa JOIN magang ON siswa.id_siswa = magang.siswa_id JOIN posisi ON magang.posisi_id = posisi.id_posisi WHERE posisi.id_posisi = ${id_posisi};`
        const data = await executeQuery(sql);

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const id_siswa = req.params.id;
        const sql = `SELECT * FROM magang JOIN posisi ON magang.posisi_id = posisi.id_posisi JOIN perusahaan ON posisi.perusahaan_id = perusahaan.id_perusahaan JOIN siswa ON magang.siswa_id = siswa.id_siswa WHERE siswa.id_siswa = ${id_siswa};`
        const data = await executeQuery(sql);

        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//server.timeout = 60000;
