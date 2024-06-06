import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_project/model/detail_mahasiswa.dart';
import 'package:flutter_project/tracker_service.dart';
import 'package:flutter_project/widget/dialog_error.dart';

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
    _trackPageOpen(widget.id_siswa);
    _fetchData(widget.id_siswa)
        .timeout(const Duration(seconds: 5))
        .catchError((e) {
      if (e is TimeoutException) {
        // Terjadi timeout saat mengambil data
        showCustomDialog(
            context,
            'Timeout',
            'Terjadi timeout saat mengambil data. Silakan coba lagi nanti.',
            'assets/home/timeout.png');
      } else {
        // Terjadi error lainnya
        showCustomDialog(
            context,
            'Error',
            'Terjadi error saat mengambil data. Silakan coba lagi nanti.',
            'assets/home/error.png');
      }
      return [];
    });
  }

  Future<void> _trackPageOpen(int id) async {
    await (TrackerService()).track("page-detail-mahasiswa-open", {}, content: {"id_siswa": id.toString()}, withDeviceInfo: false);
  }

  String truncateEmail(String email) {
    const maxLength = 17;
    if (email.length > maxLength) {
      return email.substring(0, maxLength) + '...';
    } else {
      return email;
    }
  }

  Future<void> _fetchData(var id) async {
    try {
      mahasiswa = await DetailMahasiswa.getDetailMahasiswa(id);
      setState(() {});
    } catch (e) {
      throw e; // Lempar ulang error agar bisa ditangkap di initState
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        scrolledUnderElevation: 0,
        title: const Text('Detail Mahasiswa'),
        titleTextStyle: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.black,
          fontFamily: 'LibreBaskerville',
        ),
        centerTitle: true,
        backgroundColor: Colors.white,
        toolbarHeight: 70,
        leading: Padding(
          padding: const EdgeInsets.only(left: 20),
          child: IconButton(
            icon: Icon(
              Icons.arrow_back,
              color: Colors.black,
            ),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
        ),
      ),
      body: mahasiswa.isEmpty
          ? const Center(child: CircularProgressIndicator())
          : ListView.builder(
              padding: const EdgeInsets.all(24),
              itemCount: mahasiswa.length,
              itemBuilder: (BuildContext context, int index) {
                return Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    if (index == 0)
                      Container(
                        width: MediaQuery.of(context).size.width,
                        child: InkWell(
                          child: Card(
                            elevation: 6,
                            shadowColor: Color(0xFFF77D00).withOpacity(0.2),
                            // Set background color to white
                            child: Container(
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Row(
                                children: <Widget>[
                                  Padding(
                                    padding: const EdgeInsets.all(8),
                                    child: Container(
                                      child: Card(
                                        child: ClipRRect(
                                          borderRadius:
                                              BorderRadius.circular(10),
                                          child: Image.asset(
                                            mahasiswa[index].sex != 'Perempuan'
                                                ? 'assets/home/male.png'
                                                : 'assets/home/female.png',
                                            fit: BoxFit.cover,
                                            width: 70,
                                            height: 70,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        child: Text(
                                          mahasiswa[index].nama,
                                          style: const TextStyle(
                                              color: Color(0xFFF77F00),
                                              fontSize: 18,
                                              fontWeight: FontWeight.bold,
                                              fontStyle: FontStyle.italic,
                                              overflow: TextOverflow.ellipsis),
                                        ),
                                        width:
                                            MediaQuery.of(context).size.width -
                                                150,
                                      ),
                                      const SizedBox(height: 5),
                                      Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              Row(
                                                children: [
                                                  const Icon(Icons.call,
                                                      size: 15),
                                                  const SizedBox(width: 5),
                                                  Text(
                                                    mahasiswa[index].no_telp,
                                                    style: const TextStyle(
                                                        fontSize: 13),
                                                    textAlign: TextAlign.left,
                                                  ),
                                                  SizedBox(
                                                      width:
                                                          10), // Jarak antara nomor telepon dan ikon salin
                                                  InkWell(
                                                    onTap: () {
                                                      Clipboard.setData(
                                                          ClipboardData(
                                                              text: mahasiswa[
                                                                      index]
                                                                  .no_telp));
                                                      showDialog(
                                                        context: context,
                                                        builder: (BuildContext
                                                            context) {
                                                          return AlertDialog(
                                                            backgroundColor:
                                                                Colors
                                                                    .transparent,
                                                            contentPadding:
                                                                EdgeInsets.zero,
                                                            content: Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Colors
                                                                    .white,
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            24.0),
                                                                boxShadow: [
                                                                  BoxShadow(
                                                                    color: Color(
                                                                            0xFFF77D00)
                                                                        .withOpacity(
                                                                            0.2),
                                                                    spreadRadius:
                                                                        2,
                                                                    blurRadius:
                                                                        6,
                                                                    offset:
                                                                        Offset(
                                                                            0,
                                                                            0),
                                                                  ),
                                                                ],
                                                              ),
                                                              child: Column(
                                                                mainAxisSize:
                                                                    MainAxisSize
                                                                        .min,
                                                                children: [
                                                                  SizedBox(
                                                                      height:
                                                                          16),
                                                                  Text(
                                                                    'Sukses',
                                                                    style:
                                                                        TextStyle(
                                                                      color: Color(
                                                                          0xFFF77D00),
                                                                      fontWeight:
                                                                          FontWeight
                                                                              .bold,
                                                                      fontSize:
                                                                          16,
                                                                    ),
                                                                  ),
                                                                  SizedBox(
                                                                      height:
                                                                          8),
                                                                  Padding(
                                                                    padding: const EdgeInsets
                                                                        .symmetric(
                                                                        horizontal:
                                                                            24),
                                                                    child: Text(
                                                                      'Nomor telepon berhasil disalin',
                                                                      textAlign:
                                                                          TextAlign
                                                                              .center,
                                                                      style:
                                                                          TextStyle(
                                                                        color: Colors
                                                                            .black, // Content color
                                                                      ),
                                                                    ),
                                                                  ),
                                                                  SizedBox(
                                                                      height:
                                                                          8),
                                                                  Container(
                                                                    decoration:
                                                                        BoxDecoration(
                                                                      borderRadius:
                                                                          BorderRadius
                                                                              .only(
                                                                        bottomLeft:
                                                                            Radius.circular(24),
                                                                        bottomRight:
                                                                            Radius.circular(24),
                                                                      ),
                                                                      color: Colors
                                                                          .white,
                                                                    ),
                                                                    child:
                                                                        TextButton(
                                                                      onPressed:
                                                                          () {
                                                                        Navigator.of(context)
                                                                            .pop();
                                                                      },
                                                                      child:
                                                                          const Text(
                                                                        'OK',
                                                                        style:
                                                                            TextStyle(
                                                                          color:
                                                                              Color(0xFFF77D00),
                                                                        ),
                                                                      ),
                                                                    ),
                                                                  ),
                                                                  SizedBox(
                                                                      height:
                                                                          16),
                                                                ],
                                                              ),
                                                            ),
                                                          );
                                                        },
                                                      );
                                                    },
                                                    child: Icon(
                                                        Icons.content_copy,
                                                        size: 13),
                                                  ),
                                                ],
                                              ),
                                              const SizedBox(height: 5),
                                              Row(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: [
                                                  const Icon(Icons.mail,
                                                      size: 15),
                                                  const SizedBox(width: 5),
                                                  Container(
                                                    constraints: BoxConstraints(
                                                        maxWidth:
                                                            200), // Atur lebar sesuai kebutuhan Anda
                                                    child: Text(
                                                      truncateEmail(
                                                          mahasiswa[index]
                                                              .email),
                                                      style: const TextStyle(
                                                          fontSize: 13),
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                      textAlign: TextAlign.left,
                                                    ),
                                                  ),
                                                  SizedBox(
                                                      width:
                                                          5), // Jarak antara email dan ikon salin
                                                  InkWell(
                                                    onTap: () {
                                                      Clipboard.setData(
                                                          ClipboardData(
                                                              text: mahasiswa[
                                                                      index]
                                                                  .email));
                                                      showDialog(
                                                        context: context,
                                                        builder: (BuildContext
                                                            context) {
                                                          return AlertDialog(
                                                            backgroundColor:
                                                                Colors
                                                                    .transparent,
                                                            contentPadding:
                                                                EdgeInsets.zero,
                                                            content: Container(
                                                              decoration:
                                                                  BoxDecoration(
                                                                color: Colors
                                                                    .white,
                                                                borderRadius:
                                                                    BorderRadius
                                                                        .circular(
                                                                            24.0),
                                                                boxShadow: [
                                                                  BoxShadow(
                                                                    color: Color(
                                                                            0xFFF77D00)
                                                                        .withOpacity(
                                                                            0.2),
                                                                    spreadRadius:
                                                                        2,
                                                                    blurRadius:
                                                                        6,
                                                                    offset:
                                                                        Offset(
                                                                            0,
                                                                            0),
                                                                  ),
                                                                ],
                                                              ),
                                                              child: Column(
                                                                mainAxisSize:
                                                                    MainAxisSize
                                                                        .min,
                                                                children: [
                                                                  SizedBox(
                                                                      height:
                                                                          16),
                                                                  Text(
                                                                    'Sukses',
                                                                    style:
                                                                        TextStyle(
                                                                      color: Color(
                                                                          0xFFF77D00),
                                                                      fontWeight:
                                                                          FontWeight
                                                                              .bold,
                                                                      fontSize:
                                                                          16,
                                                                    ),
                                                                  ),
                                                                  SizedBox(
                                                                      height:
                                                                          8),
                                                                  Padding(
                                                                    padding: const EdgeInsets
                                                                        .symmetric(
                                                                        horizontal:
                                                                            24),
                                                                    child: Text(
                                                                      'Alamat email berhasil disalin',
                                                                      textAlign:
                                                                          TextAlign
                                                                              .center,
                                                                      style:
                                                                          TextStyle(
                                                                        color: Colors
                                                                            .black, // Content color
                                                                      ),
                                                                    ),
                                                                  ),
                                                                  SizedBox(
                                                                      height:
                                                                          8),
                                                                  Container(
                                                                    decoration:
                                                                        BoxDecoration(
                                                                      borderRadius:
                                                                          BorderRadius
                                                                              .only(
                                                                        bottomLeft:
                                                                            Radius.circular(24),
                                                                        bottomRight:
                                                                            Radius.circular(24),
                                                                      ),
                                                                      color: Colors
                                                                          .white,
                                                                    ),
                                                                    child:
                                                                        TextButton(
                                                                      onPressed:
                                                                          () {
                                                                        Navigator.of(context)
                                                                            .pop();
                                                                      },
                                                                      child:
                                                                          const Text(
                                                                        'OK',
                                                                        style:
                                                                            TextStyle(
                                                                          color:
                                                                              Color(0xFFF77D00),
                                                                        ),
                                                                      ),
                                                                    ),
                                                                  ),
                                                                  SizedBox(
                                                                      height:
                                                                          16),
                                                                ],
                                                              ),
                                                            ),
                                                          );
                                                        },
                                                      );
                                                    },
                                                    child: Icon(
                                                        Icons.content_copy,
                                                        size: 13),
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
                      ),
                    const SizedBox(height: 16),
                    Card(
                      elevation: 6,
                      shadowColor: Color(0xFFF77D00).withOpacity(0.2),
                      // Set background color to white
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Tentang Saya',
                                style: TextStyle(
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 12),
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
                                          'Program Studi',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          mahasiswa[index].prodi,
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              const Divider(color: Color(0xFFFFCE9D)),
                              const SizedBox(height: 8),
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Padding(
                                    padding: EdgeInsets.only(
                                        top: 5), // Padding dari atas
                                    child: Icon(
                                      Icons.build,
                                      size: 18,
                                    ),
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
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          mahasiswa[index].nama_perusahaan,
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                        const SizedBox(height: 5),
                                        GestureDetector(
                                          onTap: () {
                                            setState(() {
                                              showStory = !showStory;
                                            });
                                          },
                                          child: Row(
                                            // Baris baru untuk menempatkan ikon dan teks 'Lihat Story' secara horizontal
                                            children: [
                                              Icon(
                                                showStory
                                                    ? Icons.visibility
                                                    : Icons.visibility_off,
                                                size: 18,
                                                color: Color(0xFFFF7F00),
                                              ), // Icon mata disini
                                              const SizedBox(
                                                  width:
                                                      5), // Jarak antara icon dan teks 'Lihat Story'
                                              Text(
                                                'Lihat Story',
                                                style: TextStyle(
                                                  fontSize: 14,
                                                  color: Color(0xFFFF7F00),
                                                  fontWeight: FontWeight.bold,
                                                  fontStyle: FontStyle.italic,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                        if (showStory)
                                          Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            children: [
                                              const SizedBox(height: 5),
                                              Text(
                                                // INI ERRORRRRRR
                                                // 'andjagasj',
                                                mahasiswa[index]
                                                    .deskripsi_magang,
                                                style: const TextStyle(
                                                  fontSize: 14,
                                                ),
                                              ),
                                            ],
                                          ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              const Divider(color: Color(0xFFFFCE9D)),
                              const SizedBox(height: 8),
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Icon(Icons.work_outlined, size: 18),
                                  const SizedBox(width: 10),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Jenis Magang',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          mahasiswa[index].jenis_program,
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              const Divider(color: Color(0xFFFFCE9D)),
                              const SizedBox(height: 8),
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
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          mahasiswa[index].alamat,
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              const Divider(color: Color(0xFFFFCE9D)),
                              const SizedBox(height: 8),
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
                                          'Divisi Magang',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          mahasiswa[index].nama_posisi,
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              const Divider(color: Color(0xFFFFCE9D)),
                              const SizedBox(height: 8),
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
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          '${mahasiswa[index].durasi_magang} bulan',
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              const Divider(color: Color(0xFFFFCE9D)),
                              const SizedBox(height: 8),
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
                                          'Privilege',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          mahasiswa[index].is_uang_saku == 1
                                              ? 'Mendapat uang saku'
                                              : 'Tidak dapat uang saku',
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 2),
                              const Divider(color: Color(0xFFFFCE9D)),
                              const SizedBox(height: 8),
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
                                          'Judul Laporan Magang',
                                          style: TextStyle(
                                            fontSize: 14,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        Text(
                                          mahasiswa[index].judul_laporan,
                                          style: const TextStyle(
                                            fontSize: 14,
                                          ),
                                        ),
                                        const SizedBox(height: 24),
                                      ],
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
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
