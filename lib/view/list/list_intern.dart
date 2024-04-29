import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_project/view/list/list_mahasiswa.dart';
import 'package:flutter_project/view/list/list_perusahaan.dart';
import 'package:flutter_project/model/intern.dart';

class Listintern extends StatefulWidget {
  final int idPerusahaan;
  final String namaPerusahaan;

  const Listintern(
      {Key? key, required this.namaPerusahaan, required this.idPerusahaan})
      : super(key: key);

  @override
  State<Listintern> createState() => _ListInternState();
}

class _ListInternState extends State<Listintern> {
  List<Intern> intern = [];

  @override
  void initState() {
    super.initState();
    _fetchData(widget.idPerusahaan);
  }

  Future<void> _fetchData(var id) async {
    intern = await Intern.getIntern(id);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.namaPerusahaan),
        titleTextStyle: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            fontFamily: 'LibreBaskerville',
            color: Colors.black),
        centerTitle: true,
        actions: <Widget>[
          IconButton(
            onPressed: () {},
            icon: Image.asset(
              'assets/logo/logo-1.png',
              width: 40,
              height: 40,
            ),
          ),
        ],
        backgroundColor: const Color(0xFFFAFAFE),
        toolbarHeight: 66,
        leading: Padding(
          padding: const EdgeInsets.only(left: 1, top: 5, bottom: 5),
          child: Card(
            child: ButtonBar(
              children: [
                GestureDetector(
                  onTap: () {
                    Navigator.pop(
                        context);
                  },
                  child: const Padding(
                    padding: EdgeInsets.only(right: 8, left: 2),
                    child: Icon(Icons.arrow_back),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: FutureBuilder<List<Intern>>(
              future: Intern.getIntern(widget.idPerusahaan),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator(); // Menampilkan indikator loading jika data masih dimuat
                } else if (snapshot.hasError) {
                  return Text('Error: ${snapshot.error}');
                } else {
                  if (snapshot.hasData && snapshot.data!.isNotEmpty) {
                    final intern = snapshot.data!;
                    const index =
                        0; // Misalnya kita mengambil data pertama dari list intern

                    return Row(
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Container(
                            child: Card(
                              child: Image.network(
                                intern[index].logo_perusahaan,
                                fit: BoxFit.cover,
                                width: 55,
                                height: 55,
                                errorBuilder: (context, error, stackTrace) {
                                  return Image.asset(
                                    'assets/home/LOGO1.png',
                                    fit: BoxFit.cover,
                                    width: 55,
                                    height: 55,
                                  );
                                },
                              ),
                            ),
                          ),
                        ),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                child: Text(
                                  intern[index].nama_perusahaan,
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    fontStyle: FontStyle.italic,
                                  ),
                                  overflow: TextOverflow
                                      .ellipsis, // Menambahkan overflow behavior
                                  maxLines:
                                      3, // Maksimal dua baris untuk nama_perusahaan
                                ),
                              ),
                              Column(
                                children: [
                                  Container(
                                    child: Row(
                                      children: [
                                        Icon(Icons.gps_fixed, size: 15),
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(left: 5),
                                          child: Text(
                                            intern[index].kota,
                                            style:
                                                const TextStyle(fontSize: 12),
                                            textAlign: TextAlign.left,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Container(
                                    child: Row(
                                      children: [
                                        Icon(Icons.list_alt_outlined, size: 15),
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(left: 5),
                                          child: Text(
                                            '${intern[index].jumlah_siswa_total} intern',
                                            style:
                                                const TextStyle(fontSize: 12),
                                            textAlign: TextAlign.left,
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
                      ],
                    );
                  } else {
                    return const Text(
                        'No data available'); // Menampilkan pesan jika tidak ada data yang diterima dari API
                  }
                }
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(15.0),
            child: Container(
              child: const Row(
                children: <Widget>[
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Where the place you want?',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                      Text('Get an internship based on your interest!'),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: ListView.builder(
              shrinkWrap: true,
              itemCount:
                  intern.isNotEmpty ? intern[0].posisiPerusahaan.length : 0,
              itemBuilder: (context, index) {
                var posisi = intern[0].posisiPerusahaan[index];
                return InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => Listmahasiswa(
                            id_posisi: posisi.id_posisi,
                            nama_posisi: posisi.nama_posisi),
                      ),
                    );
                  },
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(15),
                      child: Row(
                        children: <Widget>[
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  padding:
                                      const EdgeInsets.only(top: 5, bottom: 5),
                                  child: Text(
                                    posisi.nama_posisi,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(
                                    top: 5, bottom: 5, right: 5),
                                child: Image.asset(
                                  'assets/logo/users-account.png',
                                  height: 20,
                                  width: 20,
                                ),
                              ),
                            ],
                          ),
                          Column(
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(
                                    top: 5, bottom: 5, right: 30),
                                child: Text('${posisi.jumlah_siswa} people'),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
