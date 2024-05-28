import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_project/model/perusahaan.dart';
import 'package:flutter_project/provider/perusahaan.dart';
import 'package:flutter_project/view/list/list_intern.dart';
import 'package:flutter_project/view/main_screen/main_screen.dart';
import 'package:provider/provider.dart';

class ListPerusahaan extends StatefulWidget {
  const ListPerusahaan({Key? key}) : super(key: key);

  @override
  _ListPerusahaanState createState() => _ListPerusahaanState();
}

class _ListPerusahaanState extends State<ListPerusahaan> {
  @override
  void initState() {
    try {
      super.initState();
      _loadData().timeout(const Duration(seconds: 5));
    } catch (e) {
      if (e is TimeoutException) {
        // Terjadi timeout saat mengambil data
        print(e);
        showDialog(
          context: context,
          builder: (BuildContext context) {
            print(context);
            return AlertDialog(
                  backgroundColor:
                      Colors.transparent, 
                  contentPadding: EdgeInsets.zero,
                  content: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24.0),
                      boxShadow: [
                        BoxShadow(
                          color: Color(0xFFF77D00).withOpacity(
                              0.2), 
                          spreadRadius: 2,
                          blurRadius: 6,
                          offset: Offset(0, 0), 
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(top: 24),
                          child: Image.asset(
                            'assets/home/timeout.png',
                            width: 120,
                            height: 120,
                          ),
                        ),
                        SizedBox(height: 16),
                        Text(
                          'Waktu habis',
                          style: TextStyle(
                            color: Color(0xFFF77D00),
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        SizedBox(height: 8),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          child: Text(
                            'Waktu habis saat mengambil data, silakan coba lagi nanti',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.black, // Content color
                            ),
                          ),
                        ),
                        SizedBox(height: 8),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.only(
                              bottomLeft: Radius.circular(24),
                              bottomRight: Radius.circular(24),
                            ),
                            color: Colors.white,
                          ),
                          child: TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text(
                              'OK',
                              style: TextStyle(
                                color:
                                    Color(0xFFF77D00), 
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: 16),
                      ],
                    ),
                  ),
                );
            // return AlertDialog(
            //   title: const Text("Timeout"),
            //   content: const Text(
            //       "Terjadi timeout saat mengambil data. Silakan coba lagi nanti."),
            //   actions: [
            //     TextButton(
            //       onPressed: () {
            //         Navigator.of(context).pop();
            //       },
            //       child: const Text("OK"),
            //     ),
            //   ],
            // );
          },
        );
      } else {
        // Terjadi error lainnya
        print(e);
        showDialog(
          context: context,
          builder: (BuildContext context) {
            print(context);
            return AlertDialog(
                  backgroundColor:
                      Colors.transparent, 
                  contentPadding: EdgeInsets.zero,
                  content: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(24.0),
                      boxShadow: [
                        BoxShadow(
                          color: Color(0xFFF77D00).withOpacity(
                              0.2), 
                          spreadRadius: 2,
                          blurRadius: 6,
                          offset: Offset(0, 0), 
                        ),
                      ],
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(top: 24),
                          child: Image.asset(
                            'assets/home/error.png',
                            width: 120,
                            height: 120,
                          ),
                        ),
                        SizedBox(height: 16),
                        Text(
                          'Error',
                          style: TextStyle(
                            color: Color(0xFFF77D00),
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        SizedBox(height: 8),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          child: Text(
                            'Kesalahan saat mengambil data, silakan coba lagi nanti',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.black, // Content color
                            ),
                          ),
                        ),
                        SizedBox(height: 8),
                        Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.only(
                              bottomLeft: Radius.circular(24),
                              bottomRight: Radius.circular(24),
                            ),
                            color: Colors.white,
                          ),
                          child: TextButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: const Text(
                              'OK',
                              style: TextStyle(
                                color:
                                    Color(0xFFF77D00), 
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: 16),
                      ],
                    ),
                  ),
                );
            // return AlertDialog(
            //   title: const Text("Error"),
            //   content: const Text(
            //       "Terjadi error saat mengambil data. Silakan coba lagi nanti."),
            //   actions: [
            //     TextButton(
            //       onPressed: () {
            //         Navigator.of(context).pop();
            //       },
            //       child: const Text("OK"),
            //     ),
            //   ],
            // );
          },
        );
      }
    }
  }

  Future<void> _loadData() async {
    List<Perusahaan> listPerusahaan = await Perusahaan.getPerusahaan();
    Provider.of<PerusahaanProvider>(context, listen: false)
        .setPerusahaan(listPerusahaan);
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<PerusahaanProvider>(builder: (context, provider, child) {
      return Scaffold(
        backgroundColor: Color.fromRGBO(250, 250, 254, 1),
        appBar: AppBar(
          scrolledUnderElevation: 0,
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
        
        body: SafeArea(
          bottom: false,
          child: Padding(
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
                                child:
                                    Icon(Icons.search, color: Color(0xFFF77D00)),
                              ),
                              Expanded(
                                child: Padding(
                                  padding:
                                      const EdgeInsets.only(right: 10, bottom: 5),
                                  child: TextField(
                                    onChanged: (value) {
                                      provider.searchPerusahaan(value);
                                    },
                                    decoration: const InputDecoration.collapsed(
                                      hintText: 'Cari Perusahaan',
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
                          _showFilterModal(context, provider);
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
                  child: provider.filteredPerusahaan.isEmpty &&
                          provider.perusahaan.isEmpty
                      ? const Center(
                          child: CircularProgressIndicator(),
                        )
                      : provider.filteredPerusahaan.isEmpty &&
                              provider.perusahaan.isNotEmpty
                          ? Center(
                              child: SingleChildScrollView(
                                physics: const NeverScrollableScrollPhysics(),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Image.asset(
                                      'assets/home/not_found.png',
                                      width: 200,
                                      height: 200,
                                    ),
                                    SizedBox(height: 16),
                                    RichText(
                                      textAlign: TextAlign.center,
                                      text: TextSpan(
                                        children: [
                                          TextSpan(
                                            text: 'Maaf, ',
                                            style: TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold,
                                              color: Colors.black,
                                            ),
                                          ),
                                          TextSpan(
                                            text: 'data tidak ditemukan',
                                            style: TextStyle(
                                              fontSize: 16,
                                              fontWeight: FontWeight.bold,
                                              color: Color(0xFFF77D00),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    SizedBox(height: 8),
                                    Text(
                                      'Temukan lebih banyak data!',
                                      style: TextStyle(
                                        color: Colors.black,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            )
                          : ListView.builder(
                            shrinkWrap: true,
                              padding: const EdgeInsets.all(0),
                              itemCount: provider.filteredPerusahaan.length,
                              itemBuilder: (BuildContext context, int index) {
                                return InkWell(
                                  onTap: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) => Listintern(
                                          idPerusahaan: provider
                                              .filteredPerusahaan[index]
                                              .id_perusahaan,
                                          namaPerusahaan: provider
                                              .filteredPerusahaan[index]
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
                                                    provider
                                                        .filteredPerusahaan[index]
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
                                                    padding:
                                                        const EdgeInsets.only(
                                                            left: 5),
                                                    child: Text(
                                                      provider
                                                          .filteredPerusahaan[
                                                              index]
                                                          .nama_perusahaan,
                                                      style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontSize: 13,
                                                        fontFamily: 'DM Sans',
                                                      ),
                                                    ),
                                                  ),
                                                  ...List.generate(
                                                    provider
                                                                .filteredPerusahaan[
                                                                    index]
                                                                .posisiPerusahaan
                                                                .length >
                                                            4
                                                        ? 4
                                                        : provider
                                                            .filteredPerusahaan[
                                                                index]
                                                            .posisiPerusahaan
                                                            .length,
                                                    (posisiIndex) => Padding(
                                                      padding:
                                                          const EdgeInsets.only(
                                                              left: 5, top: 4),
                                                      child: Text(
                                                        '=> ' +
                                                            provider
                                                                .filteredPerusahaan[
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
        ),
      );
    });
  }

  void _showFilterModal(BuildContext context, PerusahaanProvider provider) {
    bool isDropdownOpen = false;
    bool isDropdownOpen2 = false;
    String? _selectedYear;
    Map<String, String> yearToSemester = {
      '2021': '6',
      '2020': '8',
      // Tambahkan pasangan tahun-semester lainnya di sini
    };

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
                  physics:
                      const NeverScrollableScrollPhysics(),
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
                              "Angkatan",
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: Color(
                                    0xFF333333), // Dark grey color for the text
                              ),
                            ),
                            // IconButton(
                            //   onPressed: () {
                            //     setState(() {
                            //       isDropdownOpen = !isDropdownOpen;
                            //     });
                            //   },
                            //   icon: Icon(
                            //     isDropdownOpen
                            //         ? Icons.keyboard_arrow_up
                            //         : Icons.keyboard_arrow_down,
                            //     color: Color(0xFF333333),
                            //   ),
                            // ),
                          ],
                        ),
                        Wrap(
                          spacing: 8.0, // Gap between chips
                          children: yearToSemester.entries.map<Widget>((entry) {
                            String year = entry.key;
                            String semester = entry.value;
                            return ChoiceChip(
                              label: Text(
                                year,
                                style: TextStyle(
                                  fontSize: 11,
                                  color: Color(0xFF605B57),
                                ),
                              ),
                              selected: provider.selectedYear == semester,
                              backgroundColor: Colors.grey[200],
                              selectedColor: Color(0xFFF77D00),
                              onSelected: (bool selected) {
                                setState(() {
                                  provider
                                      .selectYear(selected ? semester : null);
                                });
                              },
                            );
                          }).toList(),
                        ),
                        if (isDropdownOpen) // Tampilkan semua data warp jika dropdown terbuka
                          // Wrap(
                          //   spacing: 8.0, // Gap between chips
                          //   children: <String>[
                          //     '2022/2023',
                          //     '2023/2024',
                          //   ].map<Widget>((String year) {
                          //     return Chip(
                          //       label: Text(
                          //         year,
                          //         style: TextStyle(
                          //           fontSize: 11,
                          //           color: Color(0xFF605B57),
                          //         ),
                          //       ),
                          //       backgroundColor: Colors.grey[200],
                          //     );
                          //   }).toList(),
                          // ),
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
                                onPressed: () {
                                  Provider.of<PerusahaanProvider>(context,
                                          listen: false)
                                      .selectYear(null);
                                },
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: Colors.black,
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
                                  provider.filterByYear(provider
                                      .selectedYear); // Kirim nilai _selectedYear ke PerusahaanProvider
                                  Navigator.of(context).pop();
                                },
                                style: ElevatedButton.styleFrom(
                                  foregroundColor: Colors.white,
                                  backgroundColor: Color(0xFFF77D00),
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
}