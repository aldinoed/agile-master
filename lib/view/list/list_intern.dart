import 'package:flutter/material.dart';
import 'package:flutter_project/model/intern.dart';
import 'package:flutter_project/view/list/page_detail_mahasiswa.dart';

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
    try {
      intern = await Intern.getIntern(id);
      setState(() {});
    } catch (error) {
      print(error);
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text("Error"),
            content:
                const Text("Failed to fetch data. Please try again later."),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text("OK"),
              ),
            ],
          );
        },
      );
    }
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
          color: Colors.black,
        ),
        backgroundColor: const Color(0xfafafe),
        toolbarHeight: 66,
        centerTitle: true,
        leading: Padding(
          padding: const EdgeInsets.only(left: 20, top: 5, bottom: 5),
          
            child: ButtonBar(
              children: [
                GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  child: const Padding(
                    padding: EdgeInsets.only(right: 1, left: 2),
                    child: Icon(Icons.arrow_back),
                  ),
                ),
              ],
            ),
        
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(15.0),
        child: FutureBuilder<List<Intern>>(
          future: Intern.getIntern(widget.idPerusahaan),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(
                child: CircularProgressIndicator(
                  strokeWidth: 2.0,
                ),
              );
            } else if (snapshot.hasError) {
              return Text('Error: ${snapshot.error}');
            } else {
              if (snapshot.hasData && snapshot.data!.isNotEmpty) {
                final intern = snapshot.data![0];
                return Column(
                  children: [
                    Row(
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Container(
                            child: Card(
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: Image.network(
                                  intern.logo_perusahaan,
                                  fit: BoxFit.cover,
                                  width: 55,
                                  height: 55,
                                  errorBuilder: (context, error, stackTrace) {
                                    return Image.asset(
                                      'assets/home/logo1.png',
                                      fit: BoxFit.cover,
                                      width: 55,
                                      height: 55,
                                    );
                                  },
                                ),
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
                                  intern.nama_perusahaan,
                                  style: const TextStyle(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    fontStyle: FontStyle.italic,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                  maxLines: 3,
                                ),
                              ),
                              Column(
                                children: [
                                  Container(
                                    child: Row(
                                      children: [
                                        const Icon(Icons.gps_fixed, size: 15),
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(left: 5),
                                          child: Text(
                                            intern.kota,
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
                                        const Icon(Icons.list_alt_outlined,
                                            size: 15),
                                        Padding(
                                          padding:
                                              const EdgeInsets.only(left: 5),
                                          child: Text(
                                            '${intern.jumlah_siswa_total} intern',
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
                                Text(
                                    'Get an internship based on your interest!'),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: intern.posisiPerusahaan.length,
                      itemBuilder: (context, index) {
                        final posisi = intern.posisiPerusahaan[index];
                        return Container(
                          margin: const EdgeInsets.symmetric(vertical: 10),
                          child: ExpansionTile(
                            collapsedBackgroundColor: Colors.white,
                            shape: const OutlineInputBorder(
                                borderSide: BorderSide.none),
                            tilePadding:
                                const EdgeInsets.only(left: 12, right: 12),
                            backgroundColor: const Color(0xf7f7f7f7),
                            title: Container(
                              // color: Colors.white,
                              child: Row(
                                children: <Widget>[
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Container(
                                          padding:
                                              const EdgeInsets.only(right: 1),
                                          child: Text(
                                            posisi.nama_posisi,
                                            style: const TextStyle(
                                                fontWeight: FontWeight.bold,
                                                fontSize: 14),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Column(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.only(left: 10),
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
                                        padding: const EdgeInsets.only(left: 5),
                                        child: Text(
                                          '${posisi.jumlah_siswa} people',
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(top: 12),
                                child: Container(
                                  margin: const EdgeInsets.only(
                                      left: 24, right: 24, bottom: 24),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(12),
                                    color: Colors.white,
                                    boxShadow: [
                                      BoxShadow(
                                        color:
                                            const Color.fromARGB(43, 47, 47, 47)
                                                .withOpacity(0.2),
                                        spreadRadius: 1,
                                        blurRadius: 5,
                                        offset: const Offset(0, 1),
                                      ),
                                    ],
                                  ),
                                  child: ListView.builder(
                                    shrinkWrap: true,
                                    physics: const NeverScrollableScrollPhysics(),
                                    itemCount: posisi.siswa.length,
                                    itemBuilder: (context, posisiIndex) {
                                      return InkWell(
                                        onTap: () {
                                          Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) =>
                                                  PageDetailMahasiswa(
                                                      id_siswa: posisi
                                                          .siswa[posisiIndex]
                                                          .id_siswa),
                                            ),
                                          );
                                        },
                                        child: Container(
                                          decoration: BoxDecoration(
                                            color: Colors.white,
                                            borderRadius:
                                                BorderRadius.circular(12),
                                          ),
                                          child: Row(
                                            children: <Widget>[
                                              Column(
                                                children: [
                                                  Container(
                                                    width: 75,
                                                    height: 75,
                                                    child: Padding(
                                                      padding:
                                                          const EdgeInsets.all(
                                                              10.0),
                                                      child: ClipRRect(
                                                        borderRadius:
                                                            BorderRadius.circular(
                                                                10),
                                                        child: const Image(
                                                          image: AssetImage(
                                                              'assets/home/Profile_Photo1.png'),
                                                          fit: BoxFit.fill,
                                                        ),
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  Container(
                                                    child: Text(
                                                      posisi.siswa[posisiIndex]
                                                          .nama_siswa,
                                                      style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontSize: 13,
                                                      ),
                                                    ),
                                                  ),
                                                  const SizedBox(height: 6),
                                                  Container(
                                                    child: Row(
                                                      children: [
                                                        Column(
                                                          children: [
                                                            Icon(
                                                              Icons
                                                                  .mark_email_read_rounded,
                                                              size: 16,
                                                              color: Colors
                                                                  .grey.shade600,
                                                            )
                                                          ],
                                                        ),
                                                        Column(
                                                          children: [
                                                            Text(
                                                              " " +
                                                                  posisi
                                                                      .siswa[
                                                                          posisiIndex]
                                                                      .email,
                                                              style: TextStyle(
                                                                  color: Colors
                                                                      .grey
                                                                      .shade600,
                                                                  fontSize: 12),
                                                            ),
                                                          ],
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ],
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ],
                );
              } else {
                return const Text('No data available');
              }
            }
          },
        ),
      ),
    );
  }
}
