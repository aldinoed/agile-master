import 'package:flutter/material.dart';
import 'package:flutter_project/model/detail_mahasiswa.dart';

class PageDetailMahasiswa extends StatefulWidget {
  final int id_siswa;

  const PageDetailMahasiswa({Key? key, required this.id_siswa})
      : super(key: key);

  @override
  _PageDetailMahasiswaState createState() => _PageDetailMahasiswaState();
}

class _PageDetailMahasiswaState extends State<PageDetailMahasiswa> {
  List<DetailMahasiswa> mahasiswa = [];
  bool showStory = false;

  @override
  void initState() {
    super.initState();
    _fetchData(widget.id_siswa);
  }

  Future<void> _fetchData(var id) async {
    mahasiswa = await DetailMahasiswa.getDetailMahasiswa(id);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('GOSHIP'),
        titleTextStyle: const TextStyle(
            fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black),
        centerTitle: true,
        actions: <Widget>[
          IconButton(
            onPressed: () {},
            icon: Image.asset(
              'assets/logo/logo-1.png',
              height: 40,
              width: 40,
            ),
          ),
        ],
        backgroundColor: const Color(0xFFFAFAFE),
        toolbarHeight: 70,
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: const Padding(
            padding: EdgeInsets.only(left: 1, top: 5, bottom: 5),
            child: Card(
              child: Icon(Icons.arrow_back),
            ),
          ),
        ),
      ),
      body: mahasiswa.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              padding: const EdgeInsets.all(8),
              itemCount: mahasiswa.length,
              itemBuilder: (BuildContext context, int index) {
                const index = 0;
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Container(
                      width: MediaQuery.of(context).size.width,
                      child: InkWell(
                        child: Card(
                          color: Colors.white,
                          child: Row(
                            children: <Widget>[
                              Padding(
                                padding: const EdgeInsets.all(5),
                                child: Container(
                                  child: Card(
                                    child: ClipRRect(
                                      borderRadius: BorderRadius.circular(10),
                                      child: Image.asset(
                                        mahasiswa[index].sex != 'Perempuan'
                                            ? 'assets/home/male.png'
                                            : 'assets/home/female.png',
                                        fit: BoxFit.cover,
                                        width: 80,
                                        height: 80,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 10),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Container(
                                    child: Text(
                                      mahasiswa[index].nama,
                                      style: const TextStyle(
                                        color: Color(0xFFF77F00),
                                        fontSize: 18,
                                        fontWeight: FontWeight.bold,
                                        fontStyle: FontStyle.italic,
                                        overflow: TextOverflow.ellipsis
                                      ),
                                    ),
                                    width: MediaQuery.of(context).size.width - 150,
                                  ),
                                  const SizedBox(height: 5),
                                  Row(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              const Icon(Icons.call, size: 15),
                                              const SizedBox(width: 5),
                                              Text(
                                                mahasiswa[index].no_telp,
                                                style:
                                                    const TextStyle(fontSize: 13),
                                                textAlign: TextAlign.left,
                                              ),
                                            ],
                                          ),
                                          const SizedBox(height: 5),
                                          Row(
                                            children: [
                                              const Icon(Icons.mail, size: 15),
                                              const SizedBox(width: 5),
                                              Text(
                                                mahasiswa[index].email,
                                                style:
                                                    const TextStyle(fontSize: 13),
                                                textAlign: TextAlign.left,
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Card(
                      color: Colors.white,
                      child: Padding(
                        padding: const EdgeInsets.all(12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'About',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.credit_card_outlined,
                                    size: 18),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Prodi',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        mahasiswa[index].prodi,
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Divider(color: Colors.grey),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Padding(
                                  padding: EdgeInsets.only(
                                      top: 5), // Padding dari atas
                                  child: Icon(Icons.build, size: 18),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Tempat Magang',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        mahasiswa[index].nama_perusahaan,
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),
                                      const SizedBox(height: 5),
                                      GestureDetector(
                                        onTap: () {
                                          setState(() {
                                            showStory = !showStory;
                                          });
                                        },
                                        child: const Text(
                                          'Lihat Story',
                                          style: TextStyle(
                                            fontSize: 14,
                                            color: Color(0xFF605B57),
                                            fontWeight: FontWeight.bold,
                                            fontStyle: FontStyle.italic,
                                          ),
                                        ),
                                      ),
                                      if (showStory)
                                        Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: [
                                            const SizedBox(height: 5),
                                            Text(
                                              mahasiswa[index].deskripsi_magang,
                                              style: const TextStyle(
                                                fontSize: 16,
                                              ),
                                            ),
                                          ],
                                        ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Divider(color: Colors.grey),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.location_city_outlined,
                                    size: 18),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Lokasi Magang',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        mahasiswa[index].alamat,
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Divider(color: Colors.grey),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.notes_outlined, size: 18),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Devisi Magang',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        mahasiswa[index].nama_posisi,
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Divider(color: Colors.grey),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.calendar_month_outlined,
                                    size: 18),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Durasi Magang',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        mahasiswa[index].durasi_magang,
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Divider(color: Colors.grey),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.star_border_outlined,
                                    size: 18),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Privilage',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        mahasiswa[index].is_uang_saku == 1
                                            ? 'Mendapat uang saku'
                                            : 'Tidak dapat uang saku',
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                            const Divider(color: Colors.grey),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Icon(Icons.book_online_outlined,
                                    size: 18),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      const Text(
                                        'Title of internship report',
                                        style: TextStyle(
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      Text(
                                        mahasiswa[index].judul_laporan,
                                        style: const TextStyle(
                                          fontSize: 16,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
    );
  }
}
