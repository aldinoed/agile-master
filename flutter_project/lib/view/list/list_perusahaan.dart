import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';
import 'package:flutter_project/view/list/list_intern.dart';
import 'package:flutter_project/view/main_screen/main_screen.dart';

class Listperusahaan extends StatefulWidget {
  const Listperusahaan({Key? key}) : super(key: key);

  @override
  State<Listperusahaan> createState() => _ListPerusahaanState();
}

class _ListPerusahaanState extends State<Listperusahaan> {
  List<Perusahaan> perusahaan = [];
  List<Perusahaan> filteredPerusahaan = [];
  bool isSearching = false;
  var value = "";

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      perusahaan = await Perusahaan.getPerusahaan();
      setState(() {
        filteredPerusahaan = perusahaan;
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
        filteredPerusahaan = perusahaan.where((perusahaan) {
          return perusahaan.nama_perusahaan
              .toLowerCase()
              .contains(query.toLowerCase());
        }).toList();
      } else {
        isSearching = false;
        filteredPerusahaan = perusahaan;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(250, 250, 254, 1),
      appBar: AppBar(
        title: const Text('Goship'),
        titleTextStyle: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          fontFamily: 'LibreBaskerville',
          color: Colors.black,
        ),
        centerTitle: true,
        actions: <Widget>[
          IconButton(
            onPressed: () {
              MainScreen();
            },
            icon: const Image(
              image: AssetImage('assets/logo/logo-1.png'),
              height: 40,
              width: 40,
            ),
          ),
        ),
        centerTitle: true,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 45, vertical: 10),
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
                          padding: EdgeInsets.all(10.0),
                          child: Icon(
                            Icons.search,
                            color: Color.fromARGB(255, 0, 0, 0),
                          ),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.only(right: 10),
                            child: TextField(
                              onChanged: _search,
                              decoration: const InputDecoration.collapsed(
                                hintText: 'cari perusahaan',
                                hintStyle: TextStyle(
                                  fontSize: 13,
                                  height: 1.0,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () {
                    // Aksi untuk tombol IconButton
                  },
                  icon: Image.asset(
                    'assets/logo/filter-button.png',
                    width: 50,
                    height: 50,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      body: filteredPerusahaan.isEmpty && perusahaan.isEmpty
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : filteredPerusahaan.isEmpty && perusahaan.isNotEmpty
              ? const Center(
                  child: Text('Tidak ada data yang ditemukan'),
                )
              : ListView.builder(
              padding: const EdgeInsets.all(8),
              itemCount: filteredPerusahaan.length,
              itemBuilder: (BuildContext context, int index) {
                return InkWell(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => Listintern(
                          idPerusahaan: filteredPerusahaan[index].id_perusahaan,
                          namaPerusahaan:
                              filteredPerusahaan[index].nama_perusahaan,
                        ),
                      ),
                    );
                  },
                  child: Card(
                    color: const Color.fromARGB(255, 255, 255, 255),
                    child: Row(
                      children: <Widget>[
                        Card(
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(10),
                            child: Image.network(
                              filteredPerusahaan[index].logo_perusahaan,
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
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Container(
                              padding: const EdgeInsets.only(left: 5),
                              child: Text(
                                filteredPerusahaan[index].nama_perusahaan,
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 13,
                                  fontFamily: 'DM Sans',
                                ),
                              ),
                            ),
                            ...List.generate(
                              filteredPerusahaan[index]
                                          .posisiPerusahaan
                                          .length >
                                      4
                                  ? 4
                                  : filteredPerusahaan[index]
                                      .posisiPerusahaan
                                      .length,
                              (posisiIndex) => Padding(
                                padding:
                                    const EdgeInsets.only(left: 5.0,),
                                child: Row(
                                  children: [
                                    Text(
                                      '· '+
                                      filteredPerusahaan[index]
                                          .posisiPerusahaan[posisiIndex]
                                          .nama_posisi,
                                      style: const TextStyle(
                                        fontFamily: 'DM Sans',
                                        fontSize: 12,
                                      ),
                                    ),
                                    
                                  ],
                                ),
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
    );
  }
}