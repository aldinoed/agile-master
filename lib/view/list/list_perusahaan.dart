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
          // Cek apakah query cocok dengan nama perusahaan
          bool perusahaanMatches = perusahaan.nama_perusahaan
              .toLowerCase()
              .contains(query.toLowerCase());

          // Cek apakah query cocok dengan nama posisi
          bool posisiMatches = perusahaan.posisiPerusahaan.any((posisi) =>
              posisi.nama_posisi.toLowerCase().contains(query.toLowerCase()));

          // Return true jika query cocok dengan nama perusahaan atau nama posisi
          return perusahaanMatches || posisiMatches;
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
        backgroundColor: Color.fromRGBO(250, 250, 254, 1),
        title: InkWell(
          onTap: () {
            Navigator.of(context).pushReplacement(
              MaterialPageRoute(builder: (context) => MainScreen()),
            );
          },
          child: Align(
            alignment: Alignment.center,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Image.asset(
                  'assets/logo/logo-1.png',
                  height: 40,
                  width: 40,
                ),
                const SizedBox(width: 10),
                const Text(
                  'Goship',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'LibreBaskerville',
                    color: Colors.black,
                  ),
                ),
              ],
            ),
          ),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 12, bottom: 12),
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
                            padding: EdgeInsets.all(12.0),
                            child: Icon(Icons.search, color: Color(0xFFF77D00)),
                          ),
                          Expanded(
                            child: Padding(
                              padding:
                                  const EdgeInsets.only(right: 10, bottom: 5),
                              child: TextField(
                                onChanged: _search,
                                decoration: const InputDecoration.collapsed(
                                  hintText: 'Cari perusahaan',
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
                      _showFilterModal(context);
                    },
                    icon: ClipRRect(
                      borderRadius: BorderRadius.circular(10),
                      child: Image.asset(
                        'assets/logo/filter-button.png',
                        width: 50,
                        height: 50,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: filteredPerusahaan.isEmpty && perusahaan.isEmpty
                  ? const Center(
                      child: CircularProgressIndicator(),
                    )
                  : filteredPerusahaan.isEmpty && perusahaan.isNotEmpty
                      ? const Center(
                          child: Text('Tidak ada data yang ditemukan'),
                        )
                      : ListView.builder(
                          padding: const EdgeInsets.all(0),
                          itemCount: filteredPerusahaan.length,
                          itemBuilder: (BuildContext context, int index) {
                            return InkWell(
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => Listintern(
                                      idPerusahaan: filteredPerusahaan[index]
                                          .id_perusahaan,
                                      namaPerusahaan: filteredPerusahaan[index]
                                          .nama_perusahaan,
                                    ),
                                  ),
                                );
                              },
                              highlightColor: Colors.white,
                              child: Padding(
                                padding: const EdgeInsets.only(bottom: 16),
                                child: Card(
                                  elevation: 6,
                                  shadowColor:
                                      Color(0xFFF77D00).withOpacity(0.2),
                                  // Set background color to white
                                  child: Container(
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Row(
                                      children: <Widget>[
                                        Padding(
                                          padding: const EdgeInsets.all(
                                              8.0), // Memberikan padding sebesar 16 unit
                                          child: Card(
                                            color: Colors
                                                .white, // Menetapkan warna card
                                            child: ClipRRect(
                                              borderRadius:
                                                  BorderRadius.circular(10),
                                              child: Image.network(
                                                filteredPerusahaan[index]
                                                    .logo_perusahaan,
                                                fit: BoxFit.cover,
                                                width: 55,
                                                height: 55,
                                                errorBuilder: (context, error,
                                                    stackTrace) {
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
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Container(
                                                padding: const EdgeInsets.only(
                                                    left: 5),
                                                child: Text(
                                                  filteredPerusahaan[index]
                                                      .nama_perusahaan,
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
                                                      const EdgeInsets.only(
                                                          left: 5, top: 4),
                                                  child: Text(
                                                    '=> ' +
                                                        filteredPerusahaan[
                                                                index]
                                                            .posisiPerusahaan[
                                                                posisiIndex]
                                                            .nama_posisi,
                                                    style: const TextStyle(
                                                      fontFamily: 'DM Sans',
                                                      fontSize: 12,
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
            ),
          ],
        ),
      ),
    );
  }
}

void _showFilterModal(BuildContext context) {
  bool isDropdownOpen = false; // Variable untuk melacak status dropdown
  bool isDropdownOpen2 = false;

  showModalBottomSheet(
    context: context,
    builder: (BuildContext bc) {
      return StatefulBuilder(
        builder: (BuildContext context, StateSetter setState) {
          return Container(
            height: MediaQuery.of(context).size.height * 1.1,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(12),
                topRight: Radius.circular(12),
              ),
              color: Colors.white,
            ),
            child: Padding(
              padding: const EdgeInsets.only(top: 16, bottom: 16),
              child: SingleChildScrollView(
                child: Padding(
                  padding:
                      const EdgeInsets.only(bottom: 16, right: 16, left: 16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text(
                            "Tahun Angkatan",
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: Color(
                                  0xFF333333), // Dark grey color for the text
                            ),
                          ),
                          IconButton(
                            onPressed: () {
                              setState(() {
                                isDropdownOpen = !isDropdownOpen;
                              });
                            },
                            icon: Icon(
                              isDropdownOpen
                                  ? Icons.keyboard_arrow_up
                                  : Icons.keyboard_arrow_down,
                              color: Color(0xFF333333),
                            ),
                          ),
                        ],
                      ),
                      Wrap(
                        spacing: 8.0, // Gap between chips
                        children: <String>[
                          '2019/2020',
                          '2020/2021',
                          '2021/2022',
                        ].map<Widget>((String year) {
                          return Chip(
                            label: Text(
                              year,
                              style: TextStyle(
                                fontSize: 11,
                                color: Color(0xFF605B57),
                              ),
                            ),
                            backgroundColor: Colors.grey[200],
                          );
                        }).toList(),
                      ),
                      if (isDropdownOpen) // Tampilkan semua data warp jika dropdown terbuka
                        Wrap(
                          spacing: 8.0, // Gap between chips
                          children: <String>[
                            '2022/2023',
                            '2023/2024',
                          ].map<Widget>((String year) {
                            return Chip(
                              label: Text(
                                year,
                                style: TextStyle(
                                  fontSize: 11,
                                  color: Color(0xFF605B57),
                                ),
                              ),
                              backgroundColor: Colors.grey[200],
                            );
                          }).toList(),
                        ),
                      SizedBox(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Text(
                            "Program Studi",
                            style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                              color: Color(
                                  0xFF333333), // Dark grey color for the text
                            ),
                          ),
                          IconButton(
                            onPressed: () {
                              setState(() {
                                isDropdownOpen2 = !isDropdownOpen2;
                              });
                            },
                            icon: Icon(
                              isDropdownOpen2
                                  ? Icons.keyboard_arrow_up
                                  : Icons.keyboard_arrow_down,
                              color: Color(0xFF333333),
                            ),
                          ),
                        ],
                      ),
                      Wrap(
                        spacing: 8.0, // Gap between chips
                        children: <String>[
                          'Teknik Elektronika',
                          'Teknik Telekomunikasi',
                        ].map<Widget>((String year) {
                          return Chip(
                            label: Text(
                              year,
                              style: TextStyle(
                                fontSize: 11,
                                color: Color(0xFF605B57),
                              ),
                            ),
                            backgroundColor: Colors.grey[200],
                          );
                        }).toList(),
                      ),
                      if (isDropdownOpen2) // Tampilkan semua data warp jika dropdown terbuka
                        Wrap(
                          spacing: 8.0, // Gap between chips
                          children: <String>[
                            'Teknik Elektronika',
                            'Teknik Telekomunikasi',
                            'Teknik Elektro Industri',
                            'Teknik Informatika',
                            'Teknik Komputer',
                            'Teknik Mekatronika',
                            'Sistem Pembangkit Energi',
                            'Teknologi Game',
                            'Teknologi Multimedia Broadcasting',
                            'Teknik Elektro Industri - PLN',
                            'Teknik Elektronika - GMF',
                            'Teknik Informatika dan Komputer',
                            'PJJ Teknik Informatika',
                            'PJJ Teknik Telekomunikasi',
                          ].map<Widget>((String year) {
                            return Chip(
                              label: Text(
                                year,
                                style: TextStyle(
                                  fontSize: 11,
                                  color: Color(0xFF605B57),
                                ),
                              ),
                              backgroundColor: Colors.grey[200],
                            );
                          }).toList(),
                        ),
                      SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton(
                              onPressed: () {},
                              style: OutlinedButton.styleFrom(
                                primary: Colors.black,
                                backgroundColor: Colors.white,
                                side: BorderSide(color: Color(0xFFF77D00)),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      12.0), // Set border radius
                                ),
                              ),
                              child: Text(
                                'Atur Ulang',
                                style: TextStyle(
                                  color: Color(0xFFF77D00),
                                ),
                              ),
                            ),
                          ),
                          SizedBox(width: 8),
                          Expanded(
                            child: ElevatedButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              style: ElevatedButton.styleFrom(
                                primary: Color(0xFFF77D00),
                                onPrimary: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(
                                      12.0), // Set border radius
                                ),
                              ),
                              child: Text('Pakai'),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 16),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      );
    },
  );
}
