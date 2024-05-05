import 'dart:convert';
import 'package:http/http.dart' as http;

class PosisiPerusahaan {
  int id_posisi;
  String nama_posisi;
  int jumlah_siswa;
  List<Siswa> siswa;

  PosisiPerusahaan({required this.id_posisi, required this.nama_posisi, required this.jumlah_siswa, required this.siswa});

  factory PosisiPerusahaan.fromJson(Map<String, dynamic> json) {
    var list = json['siswa'] as List;
    List<Siswa> siswaList = list.map((i) => Siswa.fromJson(i)).toList();

    return PosisiPerusahaan(
      id_posisi: json['id_posisi'],
      nama_posisi: json['nama_posisi'],
      jumlah_siswa: json['jumlah_siswa'],
      siswa: siswaList,
    );
  }

  static Future<List<PosisiPerusahaan>> getPosisi(int id_posisi) async {
    Uri url = Uri.parse('http://103.127.135.153:5000/api/posisi/$id_posisi');
    var apiResult = await http.get(url);
    var jsonData = json.decode(apiResult.body) as List<dynamic>;
    List<PosisiPerusahaan> posisiPerusahaan = [];
    for (var data in jsonData) {
      posisiPerusahaan.add(PosisiPerusahaan.fromJson(data));
    }

    return posisiPerusahaan;
  }
}

class Siswa {
  int id_siswa;
  String nama_siswa;
  String email;

  Siswa({required this.id_siswa, required this.nama_siswa, required this.email});

  factory Siswa.fromJson(Map<String, dynamic> json) {
    return Siswa(
      id_siswa: json['id_siswa'],
      nama_siswa: json['nama_siswa'],
      email: json['email'],
    );
  }
}