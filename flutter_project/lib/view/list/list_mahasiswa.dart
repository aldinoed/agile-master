// ignore_for_file: non_constant_identifier_names

import 'package:flutter/material.dart';
import 'package:flutter_project/model/mahasiswa.dart';
import 'package:flutter_project/view/list/page_detail_mahasiswa.dart';

class Listmahasiswa extends StatefulWidget {
  final int id_posisi;
  final String nama_posisi;

  const Listmahasiswa(
      {Key? key, required this.id_posisi, required this.nama_posisi})
      : super(key: key);

  @override
  State<Listmahasiswa> createState() => _ListmahasiswaState();
}

class _ListmahasiswaState extends State<Listmahasiswa> {
  List<Mahasiswa> mahasiswa = [];
  List<Mahasiswa> filteredMahasiswa = [];
  bool isSearching = false;
  var value = "";

  @override
  void initState() {
    super.initState();
    _fetchData(widget.id_posisi);
  }

  Future<void> _fetchData(var id) async {
    try {
      mahasiswa = await Mahasiswa.getMahasiswa(id);
      setState(() {
        filteredMahasiswa = mahasiswa;
      });
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

  void _search(String query) {
    setState(() {
      if (query.isNotEmpty) {
        isSearching = true;
        filteredMahasiswa = mahasiswa.where((mahasiswa) {
          return mahasiswa.nama_siswa
              .toLowerCase()
              .contains(query.toLowerCase());
        }).toList();
      } else {
        isSearching = false;
        filteredMahasiswa = mahasiswa;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.nama_posisi),
        titleTextStyle: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            fontFamily: 'LibreBaskerville',
            color: Colors.black),
        centerTitle: true,
        actions: <Widget>[
          Padding(
            padding: const EdgeInsets.only(right: 15),
            child: InkWell(
              onTap: () {},
              child: ClipRRect(
                borderRadius: BorderRadius.circular(5),
                child: Image.asset(
                  'assets/home/Profile_Photo1.png',
                  fit: BoxFit.cover,
                  width: 45,
                  height: 45,
                ),
              ),
            ),
          ),
        ],
        backgroundColor: Colors.grey.shade100,
        toolbarHeight: 90,
        leading: Padding(
          padding: const EdgeInsets.only(left: 1, top: 5, bottom: 5),
          child: Card(
            child: ButtonBar(
              children: [
                GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
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
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(50),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Expanded(
                  child: Material(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    color: Colors.white,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        const Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Icon(
                            Icons.search,
                            color: Color.fromARGB(255, 0, 0, 0),
                          ),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.only(right: 10),
                            child: TextField(
                              onChanged: (value) {
                                _search(value);
                              },
                              decoration: const InputDecoration.collapsed(
                                hintText: 'search for the students',
                                hintStyle: TextStyle(
                                  fontSize: 13,
                                  height: 4,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // IconButton(
                //   onPressed: () {},
                //   icon: Image.asset(
                //     'assets/logo/filter-button.png',
                //     width: 50,
                //     height: 50,
                //   ),
                // ),
              ],
            ),
          ),
        ),
      ),
      body: filteredMahasiswa.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              padding: const EdgeInsets.all(8),
              itemCount: filteredMahasiswa.length,
              itemBuilder: (BuildContext context, int index) {
                return InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => PageDetailMahasiswa(
                            id_siswa: filteredMahasiswa[index].id_siswa),
                      ),
                    );
                  },
                  child: Card(
                    elevation: 3,
                    shadowColor: Colors.grey.withOpacity(0.2),
                    color: const Color.fromARGB(255, 255, 255, 255),
                    child: Row(
                      children: <Widget>[
                        Column(
                          children: [
                            Container(
                              width: 60,
                              height: 60,
                              child: Card(
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(10),
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
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              child: Text(
                                filteredMahasiswa[index].nama_siswa,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                ),
                              ),
                            ),
                            Container(
                              child: Row(
                                children: [
                                  Column(
                                    children: [
                                      Icon(
                                        Icons.mark_email_read_rounded,
                                        size: 20,
                                        color: Colors.grey.shade600,
                                      )
                                    ],
                                  ),
                                  Column(
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.only(left: 5),
                                        child: Text(
                                          filteredMahasiswa[index].email,
                                          style: TextStyle(
                                              color: Colors.grey.shade600,
                                              overflow: TextOverflow.ellipsis),
                                        ),
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
              }),
    );
  }
}