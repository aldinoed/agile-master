import 'package:flutter/material.dart';
import 'package:flutter_project/view/main_screen/main_screen.dart';

class Guide extends StatelessWidget {
  const Guide({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromRGBO(250, 250, 254, 1),
      appBar: AppBar(
        scrolledUnderElevation: 0,
        backgroundColor: Color.fromRGBO(250, 250, 254, 1),
        title: InkWell(
          // onTap: () {
          //   Navigator.of(context).pushReplacement(
          //     MaterialPageRoute(builder: (context) => MainScreen()),
          //   );
          // },
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
      body: Container(
        child: Column(
          children: [
            SizedBox(height: 10),
            Center(
              child: Container(
                width: MediaQuery.of(context).size.width * 0.85,
                margin: EdgeInsets.symmetric(vertical: 20),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: Color.fromARGB(255, 255, 255, 255),
                  boxShadow: [
                    BoxShadow(
                      color: Color(0xFFF77D00).withOpacity(0.1),
                      spreadRadius: 3,
                      blurRadius: 4,
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(12),
                          topRight: Radius.circular(12),
                        ),
                        image: DecorationImage(
                          image: AssetImage('assets/guide/image21.png'),
                          fit: BoxFit.cover,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Color.fromARGB(255, 37, 36, 36)
                                .withOpacity(0.9),
                            blurRadius: 8,
                            offset: Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(right: 0.0),
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: Padding(
                                padding: const EdgeInsets.only(
                                    top: 16, bottom: 16, left: 16),
                                child: Image.asset(
                                  'assets/guide/Headline.png',
                                  width: 20,
                                  height: 45,
                                  fit: BoxFit.contain,
                                ),
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(right: 5.0),
                            child: Align(
                              alignment: Alignment.bottomCenter,
                              child: Padding(
                                padding:
                                    const EdgeInsets.only(top: 16, bottom: 16),
                                child: Text(
                                  'Petunjuk untuk \nmelakukan magang (KP)',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      height: MediaQuery.of(context).size.height / 1.7,
                      child: ListView(
                        padding: EdgeInsets.all(20),
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              SizedBox(height: 10),
                              Text(
                                '1. Memilih jenis KP :',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 5),
                              Text(
                                '   a. Reguler\n'
                                '   b. IISMA via UP2AI Bu Lely dan KUI Pak\n'
                                '       Iwan Syarif\n'
                                '   c. IGIP via UP2AI Bu Lely dan KUI Pak Iwan\n'
                                '       Syarif',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                '2. Jika Anda memilih KP Reguler, tentukan apakah Anda merupakan kelompok atau individu saat melaksanakan KP.',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                '   Jika Anda berada dalam kelompok yang\n'
                                '   terdiri dari maksimal 3 orang, isi Formulir\n'
                                '   Pengajuan KP di MIS Online (Jika dalam\n'
                                '   kelompok, maka hanya perwakilan yang\n'
                                '   akan mengisinya)',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                '3. Membuat Proposal KP',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                '   a. Membuat Surat Pengantar (nomor surat,\n'
                                '      dan peruntukan KDAEP yang akan diurus\n'
                                '      melalui Bu Pipid)\n'
                                '   b. Membuat surat ucapan terima kasih\n'
                                '      setelah diterima (nomor surat dan\n'
                                '      peruntukan KDAEP untuk dikelola melalui\n'
                                '      Bu Pipid)\n'
                                '   c. Perpisahan dengan Supervisor sebelum\n'
                                '      berangkat ke KP',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                '4. Melaksanakan KP 6 Bulan',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                '5. Membuat Buku Catatan KP',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                '   File yang diisi adalah progres buku KP, foto\n'
                                '   yang diupload bisa berupa kegiatan sehari-\n'
                                '   hari di perusahaan (foto bebas)',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                '6. Mempersiapkan untuk Sesi KP',
                                style: TextStyle(
                                  fontSize: 16,
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                '   a. Persetujuan Supervisor\n'
                                '   b. Buku KP\n'
                                '   c. Presentasi KP (Indonesia)\n'
                                '   d. Maju dalam Bentuk Kelompok\n'
                                '   e. Mengumpulkan Nilai dari Perusahaan\n'
                                '   f. Mengumpulkan Rekening Bank Mandiri\n'
                                '      (dana KP)',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Colors.black,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
